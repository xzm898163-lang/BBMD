import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  Plus, 
  Bell, 
  Search, 
  ArrowLeft, 
  History, 
  Lock, 
  ShieldCheck, 
  Droplets,
  Menu,
  LogOut,
  ChevronRight,
  UserPlus,
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Printer,
  Edit3,
  Camera,
  Filter,
  MoreVertical,
  FlaskConical,
  Truck,
  FileText,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, BloodUnit, ActivityLog, BloodGroup, ComponentType, UnitStatus, Donor } from './types';

// --- Mock Data ---

const MOCK_UNITS: BloodUnit[] = [
  { id: 'RBC-90821', group: 'A+', type: 'RBC', status: 'Available', location: 'Fridge FB-04 (Shelf 2)', expiryDate: '24 Oct 2023', volume: 250 },
  { id: 'RBC-90815', group: 'A+', type: 'RBC', status: 'Urgent', location: 'Fridge FA-01 (Shelf 1)', expiryDate: '18 Oct 2023 (Today)', volume: 250 },
  { id: 'RBC-90855', group: 'A+', type: 'RBC', status: 'Quarantined', location: 'Fridge FQ-99 (Isolation)', expiryDate: '28 Oct 2023', volume: 250 },
  { id: 'RBC-90712', group: 'A+', type: 'RBC', status: 'Reserved', location: 'Fridge FB-04 (Shelf 3)', expiryDate: '25 Oct 2023', volume: 250, patientId: 'RA-2234 (Surgery)' },
];

const MOCK_ACTIVITIES: ActivityLog[] = [
  { id: '1', type: 'donation', title: 'New Donation Received', description: '2 Units of O+ donated by Rahul Mehta at West Wing.', timestamp: '12 Minutes ago' },
  { id: '2', type: 'requisition', title: 'Urgent Requisition', description: 'Emergency request from Fortis Hospital for 5 units of AB-.', timestamp: '45 Minutes ago' },
  { id: '3', type: 'dispatch', title: 'Unit Dispatched', description: '10 Units of B+ dispatched to City Blood Bank, Noida.', timestamp: '2 Hours ago' },
  { id: '4', type: 'registration', title: 'New Donor Registered', description: 'Priya Singh registered via Mobile App (O+ Type).', timestamp: '4 Hours ago' },
];

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6 text-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 6000);
      }}
    >
      <div className="relative mb-12">
        {/* Blood Drop Animation */}
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 0.8
          }}
        >
          <Droplets className="w-24 h-24 text-primary fill-current" />
        </motion.div>
        
        {/* Ripple effect */}
        <motion.div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-primary/20 rounded-full blur-sm"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0, 0.5, 0] }}
          transition={{ 
            delay: 0.6,
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-widest">
          BBMS <span className="text-primary">India</span>
        </h1>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-700">
            Application is developed and maintained by Shubham App, Chhatarpur.
          </p>
          <p className="text-base font-medium text-primary">
            Designed & Produced by Shubham App – Chhatarpur Production.
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Header = ({ title, showBack, onBack, rightElement }: { title: string, showBack?: boolean, onBack?: () => void, rightElement?: React.ReactNode }) => (
  <header className="sticky top-0 z-50 bg-white border-b border-primary/10 px-4 py-3 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-3">
      {showBack && (
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
      )}
      <h1 className="text-lg font-bold tracking-tight text-slate-900">{title}</h1>
    </div>
    {rightElement}
  </header>
);

const BottomNav = ({ activeTab, onTabChange }: { activeTab: Screen, onTabChange: (s: Screen) => void }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'donor-reg', label: 'New Donor', icon: UserPlus },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 pb-3 pt-2 flex flex-col gap-2 z-50">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as Screen)}
            className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`}
          >
            <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="text-[10px] text-slate-500 text-center leading-tight border-t border-slate-50 pt-2 font-semibold">
        <p>Application is developed and maintained by Shubham App, Chhatarpur.</p>
        <p className="text-primary">Designed & Produced by Shubham App – Chhatarpur Production.</p>
      </div>
    </nav>
  );
};

// --- Screens ---

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen flex flex-col bg-background-light">
    <header className="w-full bg-white border-b border-primary/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <Droplets className="w-8 h-8 text-primary fill-current" />
        <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">BBMS <span className="text-primary">India</span></h1>
      </div>
    </header>
    <main className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
        <div className="h-32 bg-primary/10 flex items-center justify-center">
          <Lock className="w-12 h-12 text-primary" />
        </div>
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Secure Login</h2>
            <p className="text-slate-500 mt-2">Access the Blood Bank Management System</p>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4" /> Username or Email
              </label>
              <input className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="Enter your registered email" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Password
                </label>
                <button className="text-xs font-bold text-primary hover:underline">Forgot Password?</button>
              </div>
              <input className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none" type="password" placeholder="••••••••" />
            </div>
            <button onClick={onLogin} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg shadow-lg flex items-center justify-center gap-2 mt-4">
              Login to System
            </button>
          </div>
        </div>
      </div>
    </main>
    <footer className="w-full py-8 border-t border-slate-200 bg-white px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 text-sm text-slate-500">
        <div className="text-center space-y-2 mb-2">
          <p className="text-sm font-bold text-slate-800">Application is developed and maintained by Shubham App, Chhatarpur.</p>
          <p className="text-sm font-bold text-primary">Designed & Produced by Shubham App – Chhatarpur Production.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full items-center gap-4 border-t border-slate-100 pt-6">
          <p>Here is the place to copyrights</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

const DashboardScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="pb-24">
    <Header 
      title="Dashboard Overview" 
      rightElement={
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-slate-600" />
          <Settings className="w-5 h-5 text-slate-600" />
        </div>
      } 
    />
    <main className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome, Dr. Aditi</h2>
          <p className="text-slate-500">Real-time status of blood inventory and operations.</p>
        </div>
        <button onClick={() => onNavigate('donor-reg')} className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-lg">
          <Plus className="w-5 h-5" /> New Donation
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Droplets className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-green-500 flex items-center">+4.2%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Units Collected</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">1,240</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><ShieldCheck className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-green-500">Normal</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Inventory Health</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">92.4%</h3>
        </div>
        <div className="bg-primary/5 p-5 rounded-xl border border-primary/30 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary text-white rounded-lg"><Calendar className="w-5 h-5" /></div>
            <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full uppercase">Urgent</span>
          </div>
          <p className="text-primary text-sm font-bold">Expiry Alerts</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">14 <span className="text-sm font-normal text-slate-500 italic">units</span></h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Activity className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-orange-500">Action Required</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Pending Requisitions</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">28</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-primary/10 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Live Inventory by Blood Group</h3>
          <div className="flex items-end justify-between h-48 gap-2 sm:gap-4 px-4">
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((group, i) => (
              <div key={group} className="flex flex-col items-center flex-1 group">
                <div 
                  className={`w-full rounded-t-lg relative transition-all ${i % 2 === 0 ? 'bg-primary/20' : 'bg-slate-100'}`} 
                  style={{ height: `${Math.random() * 80 + 10}%` }}
                ></div>
                <span className="mt-2 text-xs font-bold text-slate-600">{group}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-primary/10 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity Log</h3>
          <div className="space-y-6">
            {MOCK_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.description}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);

const InventoryScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="pb-24">
    <Header title="Inventory Management" />
    <main className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Units</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-bold">1,240</p>
            <p className="text-green-600 text-sm font-bold">+2.4%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-l-4 border-l-orange-500 border border-primary/10 shadow-sm">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Low Stock Alerts</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-bold">12</p>
            <p className="text-orange-500 text-sm font-medium">Critical</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-l-4 border-l-primary border border-primary/10 shadow-sm">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Near Expiry</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-3xl font-bold">08</p>
            <p className="text-primary text-sm font-medium">Expiring &lt;48h</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-slate-900 text-base font-bold flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" /> Filters
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['RBC', 'Platelets', 'Plasma', 'Cryo'].map((type) => (
            <button 
              key={type} 
              onClick={() => type === 'Platelets' && onNavigate('pooling')}
              className={`px-6 py-2 rounded-lg font-semibold ${type === 'RBC' ? 'bg-primary text-white' : 'bg-white border border-primary/10 text-slate-600'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
            <button key={group} className={`px-4 py-1.5 rounded-lg font-bold border ${group === 'A+' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white border-primary/10 text-slate-600'}`}>
              {group}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-slate-900 text-base font-bold">Current Stock: RBC A+</h3>
          <button className="text-primary text-sm font-semibold flex items-center">View All <ChevronRight className="w-4 h-4" /></button>
        </div>
        {MOCK_UNITS.map((unit) => (
          <div key={unit.id} className={`bg-white p-4 rounded-xl border shadow-sm ${unit.status === 'Urgent' ? 'border-primary/30 ring-1 ring-primary/20' : 'border-primary/10'}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold ${unit.status === 'Urgent' ? 'bg-primary text-white' : 'bg-primary/5 text-primary border border-primary/20'}`}>
                  {unit.group}
                </div>
                <div>
                  <p className="text-slate-900 font-bold">Unit ID: #{unit.id}</p>
                  <p className="text-slate-500 text-xs font-medium">{unit.location}</p>
                </div>
              </div>
              <span 
                onClick={() => unit.status === 'Quarantined' && onNavigate('lab-testing')}
                className={`px-2 py-1 rounded-full text-xs font-bold cursor-pointer ${
                unit.status === 'Available' ? 'bg-green-50 text-green-700' :
                unit.status === 'Urgent' ? 'bg-primary/10 text-primary' :
                unit.status === 'Quarantined' ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' :
                'bg-blue-50 text-blue-700'
              }`}>
                {unit.status}
              </span>
            </div>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-50">
              <div className={`flex items-center gap-1 ${unit.status === 'Urgent' ? 'text-primary' : 'text-slate-500'}`}>
                {unit.status === 'Urgent' ? <AlertTriangle className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                <p className={`text-xs ${unit.status === 'Urgent' ? 'font-bold' : 'font-medium'}`}>Expiry: {unit.expiryDate}</p>
              </div>
              <div className={`text-xs font-bold ${unit.status === 'Urgent' ? 'text-primary' : 'text-slate-400'}`}>
                {unit.status === 'Urgent' ? 'URGENT' : unit.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
    <button onClick={() => onNavigate('separation')} className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg border-4 border-white flex items-center justify-center">
      <Plus className="w-6 h-6" />
    </button>
  </div>
);

const MOCK_DONORS: Donor[] = [
  { id: 'D-7712', name: 'Rahul Mehta', bloodGroup: 'O+', registrationDate: '2023-01-15', lastDonationDate: '2023-10-20', contact: '9876543210', email: 'rahul@example.com' },
  { id: 'D-7715', name: 'Priya Singh', bloodGroup: 'O+', registrationDate: '2023-05-22', lastDonationDate: '2023-10-24', contact: '9876543211', email: 'priya@example.com' },
  { id: 'D-7801', name: 'Amit Verma', bloodGroup: 'A+', registrationDate: '2022-11-10', lastDonationDate: '2023-10-15', contact: '9876543212', email: 'amit@example.com' },
  { id: 'D-7805', name: 'Sneha Reddy', bloodGroup: 'B-', registrationDate: '2023-08-05', lastDonationDate: '2023-10-12', contact: '9876543213', email: 'sneha@example.com' },
];

const DonorRegScreen = ({ onBack }: { onBack: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | 'All'>('All');
  const [dateFilter, setDateFilter] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const filteredDonors = MOCK_DONORS.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         donor.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === 'All' || donor.bloodGroup === selectedGroup;
    const matchesDate = !dateFilter || donor.registrationDate >= dateFilter;
    return matchesSearch && matchesGroup && matchesDate;
  });

  if (isRegistering) {
    return (
      <div className="pb-32">
        <Header title="New Donor Registration" showBack onBack={() => setIsRegistering(false)} />
        <main className="max-w-2xl mx-auto p-4 space-y-8">
          <div className="bg-white border border-primary/20 p-5 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Unique Donor ID</p>
              <p className="text-primary text-xl font-bold">BBMS-2024-8829-IND</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
              <Lock className="w-3 h-3" /> Auto-generated
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-300 bg-white/50 px-6 py-10 rounded-xl flex flex-col items-center gap-4">
            <div className="bg-primary/5 p-4 rounded-full"><Camera className="w-8 h-8 text-primary" /></div>
            <div className="text-center">
              <p className="text-slate-900 text-base font-bold">Donor Photo / Biometric</p>
              <p className="text-slate-500 text-sm">Required for secure identification and records</p>
            </div>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold">Capture Photo</button>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold">Personal Information</h3></div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                <input className="w-full p-3 rounded-lg border border-slate-200 focus:ring-primary focus:border-primary" placeholder="Enter donor's full name" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Contact Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">+91</span>
                    <input className="w-full p-3 pl-12 rounded-lg border border-slate-200 focus:ring-primary focus:border-primary" placeholder="9876543210" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Email Address (Optional)</label>
                  <input className="w-full p-3 rounded-lg border border-slate-200 focus:ring-primary focus:border-primary" placeholder="donor@example.com" />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2"><Droplets className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold">Blood Group</h3></div>
            <div className="grid grid-cols-4 gap-3">
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
                <button key={group} className={`p-3 rounded-lg border-2 font-bold transition-all ${group === 'O+' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-white'}`}>
                  {group}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /><h3 className="text-lg font-bold">Eligibility Check</h3></div>
            <div className="space-y-3">
              {['Weight is above 50kg', 'Feeling healthy today', 'No recent tattoos / surgery'].map((check) => (
                <label key={check} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white cursor-pointer">
                  <span className="text-sm font-medium text-slate-700">{check}</span>
                  <div className="w-11 h-6 bg-primary rounded-full relative"><div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div></div>
                </label>
              ))}
            </div>
          </section>
        </main>
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 p-4">
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setIsRegistering(false)} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg">Register Donor</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <Header title="Donor Search & Registration" showBack onBack={onBack} />
      <main className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary shadow-sm"
                placeholder="Search by name or Donor ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-40">
              <input 
                type="date"
                className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:ring-primary focus:border-primary shadow-sm text-sm"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                title="Registered After"
              />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button 
              onClick={() => setSelectedGroup('All')}
              className={`px-4 py-1.5 rounded-lg font-bold border whitespace-nowrap ${selectedGroup === 'All' ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-slate-600'}`}
            >
              All Groups
            </button>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
              <button 
                key={group} 
                onClick={() => setSelectedGroup(group as BloodGroup)}
                className={`px-4 py-1.5 rounded-lg font-bold border whitespace-nowrap ${selectedGroup === group ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-slate-900 text-base font-bold">Donors Found ({filteredDonors.length})</h3>
          <button onClick={() => setIsRegistering(true)} className="text-primary text-sm font-bold flex items-center gap-1">
            <Plus className="w-4 h-4" /> Register New
          </button>
        </div>

        <div className="space-y-3">
          {filteredDonors.map((donor) => (
            <div key={donor.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold">
                    {donor.bloodGroup}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">{donor.name}</p>
                    <p className="text-slate-500 text-xs font-medium">ID: {donor.id} • {donor.contact}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Registered: {donor.registrationDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Donation</p>
                  <p className="text-xs font-bold text-slate-700">{donor.lastDonationDate}</p>
                </div>
              </div>
            </div>
          ))}
          {filteredDonors.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No donors match your search.</p>
              <button onClick={() => setIsRegistering(true)} className="text-primary font-bold mt-2">Register them now</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const LabTestingScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="pb-32">
    <Header title="Lab Testing & Screening" showBack onBack={onBack} />
    <main className="p-4 max-w-2xl mx-auto space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input className="w-full pl-10 pr-3 py-3 bg-white border border-slate-200 rounded-lg focus:ring-primary focus:border-primary text-sm" placeholder="Scan or enter Blood Bag ID (e.g. BB-10293)" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between shadow-sm">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Blood Bag</p>
          <h2 className="text-xl font-bold text-primary">BB-10293</h2>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> DN-4829</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 24 Oct 2023</span>
          </div>
        </div>
        <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-amber-200 flex items-center gap-1">
          <Lock className="w-3 h-3" /> Quarantine
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-widest">1. Blood Grouping (ABO/Rh)</h3>
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">ABO Group</p>
            <div className="grid grid-cols-4 gap-2">
              {['A', 'B', 'AB', 'O'].map(g => (
                <button key={g} className={`h-12 rounded-lg border-2 font-bold ${g === 'A' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-100 bg-slate-50'}`}>{g}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Rh Factor</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="h-12 rounded-lg border-2 border-primary bg-primary/10 text-primary font-bold">Rh Positive (+)</button>
              <button className="h-12 rounded-lg border-2 border-slate-100 bg-slate-50 font-bold">Rh Negative (-)</button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-widest">2. TTI Screening</h3>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
          {[
            { name: 'HIV I/II', desc: 'Human Immunodeficiency Virus' },
            { name: 'HBV', desc: 'Hepatitis B Virus (HBsAg)' },
            { name: 'HCV', desc: 'Hepatitis C Virus' },
            { name: 'Syphilis', desc: 'Treponema Pallidum (VDRL)', reactive: true },
            { name: 'Malaria', desc: 'Plasmodium Parasites' },
          ].map((tti) => (
            <div key={tti.name} className={`p-4 flex items-center justify-between ${tti.reactive ? 'bg-primary/5' : ''}`}>
              <div>
                <p className={`font-bold ${tti.reactive ? 'text-primary flex items-center gap-1' : ''}`}>
                  {tti.name} {tti.reactive && <AlertTriangle className="w-4 h-4" />}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{tti.desc}</p>
              </div>
              <div className={`flex items-center rounded-lg p-1 ${tti.reactive ? 'bg-primary/10' : 'bg-slate-100'}`}>
                <button className={`px-3 py-1.5 text-xs font-bold rounded-md ${!tti.reactive ? 'bg-white shadow-sm text-slate-900' : 'text-primary/40'}`}>Non-Reactive</button>
                <button className={`px-3 py-1.5 text-xs font-bold rounded-md ${tti.reactive ? 'bg-primary text-white shadow-lg' : 'text-slate-400'}`}>Reactive</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-widest">3. Medical Officer Validation</h3>
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-slate-400" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1">MO Digital PIN / Signature</label>
              <input className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary text-sm tracking-widest" placeholder="••••••" type="password" />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
            <p className="text-[11px] text-primary leading-snug">Reactive status detected for Syphilis. Upon validation, this unit will be automatically flagged for disposal as biohazardous waste.</p>
          </div>
        </div>
      </section>
    </main>
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200">
      <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2">
        <CheckCircle2 className="w-5 h-5" /> Validate & Submit Results
      </button>
    </div>
  </div>
);

const VerificationScreen = ({ onVerify }: { onVerify: () => void }) => (
  <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-background-light">
    <div className="mb-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <Droplets className="w-8 h-8 text-primary fill-current" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">BBMS India</h1>
      <p className="text-slate-500 text-sm">Blood Bank Management System</p>
    </div>
    <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-primary/5 mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Two-Step Verification</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          We've sent a 6-digit verification code to your registered mobile number ending in <span className="font-medium text-slate-900">******789</span>.
        </p>
      </div>
      <div className="flex justify-between gap-2 mb-8">
        {[4, 8, '', '', '', ''].map((v, i) => (
          <input 
            key={i}
            className="w-12 h-14 text-center text-2xl font-bold border-slate-200 bg-slate-50 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
            maxLength={1} 
            defaultValue={v}
            placeholder={v === '' ? '·' : ''}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
              <p className="text-xl font-bold text-primary">00</p>
            </div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-1">Min</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
              <p className="text-xl font-bold text-primary">52</p>
            </div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-1">Sec</p>
          </div>
        </div>
        <p className="text-sm text-slate-500">
          Didn't receive the code? <button className="text-primary font-semibold hover:underline">Resend Code</button>
        </p>
      </div>
      <button onClick={onVerify} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 group">
        Verify & Proceed <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

const PoolingScreen = ({ onBack, onFinalize }: { onBack: () => void, onFinalize: () => void }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="pb-32 bg-background-light min-h-screen">
      <Header 
        title="Platelet Pooling" 
        showBack 
        onBack={onBack} 
        rightElement={
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">System Online</span>
          </div>
        }
      />
      <main className="max-w-3xl mx-auto p-4 space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">Active Pool</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg"><FileText className="text-primary w-8 h-8" /></div>
              <div>
                <p className="text-xs font-medium text-slate-500">Unique Pool Identifier</p>
                <p className="text-2xl font-bold font-mono tracking-tight text-slate-900">PL-99823-A</p>
              </div>
            </div>
            <div className="flex flex-col md:items-end">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">In Progress</span>
              <p className="text-xs text-slate-400 mt-1">Started: Oct 24, 09:42 AM</p>
            </div>
          </div>
        </section>

        <section>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg" placeholder="Scan barcode or enter Unit ID manually" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">Add Unit</button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Units to Pool (5)</h2>
            <span className="text-xs text-slate-400 italic">Oldest unit determines expiry</span>
          </div>
          <div className="space-y-3">
            {[
              { id: 'W0382 23 123456', vol: '52ml', warn: false },
              { id: 'W0382 23 123457', vol: '48ml', warn: true },
              { id: 'W0382 23 123458', vol: '55ml', warn: false },
              { id: 'W0382 23 123459', vol: '50ml', warn: false },
            ].map((unit, i) => (
              <div key={unit.id} className={`flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm ${unit.warn ? 'border-l-4 border-l-primary' : 'border-slate-200'}`}>
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-full font-bold text-sm ${unit.warn ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-mono font-bold text-slate-900">{unit.id}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">O RHD POS</span>
                      <span className={`text-xs flex items-center gap-1 ${unit.warn ? 'text-primary font-medium' : 'text-slate-500'}`}>
                        {unit.warn && <Clock className="w-3 h-3" />} {unit.warn ? 'Expiring Soon: ' : 'Volume: '}{unit.vol}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-primary transition-colors"><MoreVertical className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              <div className="pb-4 md:pb-0 md:pr-6">
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest mb-1">Total Pool Volume</p>
                <p className="text-3xl font-bold">205 <span className="text-lg font-normal text-slate-500">ml</span></p>
              </div>
              <div className="py-4 md:py-0 md:px-6">
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest mb-1">Calculated Expiry</p>
                <p className="text-xl font-bold text-primary">Oct 29, 2023</p>
                <p className="text-xs text-slate-500 mt-1">at 14:30 (48h 12m remaining)</p>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest mb-1">Target Recipient</p>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="w-4 h-4 text-slate-500" />
                  <p className="font-medium">Doe, Jonathan A.</p>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 ml-6">ID: #PT-88219-X</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 z-50">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={() => setShowConfirm(true)} className="flex-1 bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Finalize Pool & Print Label
          </button>
          <button onClick={onBack} className="px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold">Cancel</button>
        </div>
      </footer>

      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Confirm Platelet Pool</h3>
              <button onClick={() => setShowConfirm(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><Plus className="w-6 h-6 rotate-45" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Units</p>
                  <p className="text-lg font-bold text-slate-900">5 Units</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Volume</p>
                  <p className="text-lg font-bold text-slate-900">205 ml</p>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Calculated Expiry</p>
                <p className="text-lg font-bold text-primary">Oct 29, 2023, 14:30</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800 leading-relaxed font-medium">
                  Once finalized, this pool cannot be modified. The system will generate a unique barcode and print the final product label.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 flex flex-col sm:flex-row gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold">Cancel</button>
              <button onClick={onFinalize} className="flex-[2] px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-2">
                <Printer className="w-5 h-5" /> Confirm & Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = (s: Screen) => setScreen(s);

  return (
    <div className="min-h-screen bg-background-light">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : !isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginScreen onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        ) : !isVerified ? (
          <motion.div
            key="verify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <VerificationScreen onVerify={() => { setIsVerified(true); setScreen('dashboard'); }} />
          </motion.div>
        ) : (
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {screen === 'dashboard' && <DashboardScreen onNavigate={navigate} />}
            {screen === 'inventory' && <InventoryScreen onNavigate={navigate} />}
            {screen === 'donor-reg' && <DonorRegScreen onBack={() => navigate('dashboard')} />}
            {screen === 'lab-testing' && <LabTestingScreen onBack={() => navigate('dashboard')} />}
            {screen === 'pooling' && <PoolingScreen onBack={() => navigate('inventory')} onFinalize={() => navigate('label-gen')} />}
            {screen === 'separation' && (
              <div className="pb-32">
                <Header title="Component Separation" showBack onBack={() => navigate('inventory')} />
                <main className="max-w-md mx-auto p-4 space-y-6">
                  <section className="bg-white rounded-xl p-4 shadow-sm border border-primary/5">
                    <div className="flex items-center gap-4">
                      <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Droplets className="w-8 h-8" /></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-500">Parent Bag ID</p>
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">Screened</span>
                        </div>
                        <p className="text-xl font-bold">BB-10293</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">A+ Positive</span>
                          <span className="text-xs text-slate-400">• Collected: Oct 31, 2023</span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div className="space-y-4">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Components to Separate</h2>
                    {['Packed RBC (PRBC)', 'Fresh Frozen Plasma', 'Platelet Concentrate'].map((comp, i) => (
                      <div key={comp} className="bg-white rounded-xl overflow-hidden border border-primary/10 shadow-sm">
                        <div className={`p-4 flex items-center justify-between border-b border-primary/5 ${i === 0 ? 'bg-primary/5' : 'bg-slate-50'}`}>
                          <div className="flex items-center gap-2">
                            {i === 0 ? <Edit3 className="w-4 h-4 text-primary" /> : i === 1 ? <FlaskConical className="w-4 h-4 text-blue-500" /> : <Droplets className="w-4 h-4 text-amber-500" />}
                            <h3 className="font-bold text-slate-900">{comp}</h3>
                          </div>
                          <div className={`w-11 h-6 rounded-full relative ${i === 0 ? 'bg-primary' : 'bg-slate-200'}`}>
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${i === 0 ? 'right-0.5' : 'left-0.5'}`}></div>
                          </div>
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase">Volume (ml)</label>
                              <input className="w-full bg-slate-50 border-0 rounded-lg text-sm font-medium" placeholder={i === 0 ? "250" : i === 1 ? "200" : "50"} />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-500 uppercase">Component ID</label>
                              <input className="w-full bg-slate-50 border-0 rounded-lg text-sm font-medium" defaultValue={`${comp.split(' ')[0]}-10293`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>
                <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4">
                  <button onClick={() => navigate('label-gen')} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
                    <Package className="w-5 h-5" /> Complete Separation & Transfer
                  </button>
                </div>
              </div>
            )}
            {screen === 'label-gen' && (
              <div className="pb-32">
                <Header 
                  title="Label Generation" 
                  showBack 
                  onBack={() => navigate('separation')}
                  rightElement={
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                      <Printer className="w-4 h-4" /> Print Label
                    </button>
                  }
                />
                <main className="max-w-5xl mx-auto p-6 flex flex-col items-center gap-10">
                  <div className="w-full flex flex-col lg:flex-row gap-10 items-start justify-center">
                    <div className="flex-1 w-full flex flex-col items-center gap-6">
                      <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest self-start">Sticker Preview</h3>
                      <div className="aspect-square max-w-[400px] w-full bg-white shadow-2xl rounded-sm border border-slate-200 p-1 flex flex-col border-[2px] border-black">
                        <div className="grid grid-cols-2 border-b-[2px] border-black">
                          <div className="p-2 border-r-[2px] border-black">
                            <p className="text-[10px] font-bold mb-1">ISBT 128 POOL ID</p>
                            <div className="h-12 w-full bg-slate-100 flex items-center justify-center border border-dashed border-slate-300 mb-1">BARCODE</div>
                            <p className="text-lg font-black tracking-tighter text-center">PL-99823-A</p>
                          </div>
                          <div className="p-2 flex flex-col justify-center items-center">
                            <p className="text-[10px] font-bold mb-1 self-start">FACILITY</p>
                            <p className="text-sm font-bold text-center uppercase">BBMS India<br/>Central Hub</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 border-b-[2px] border-black">
                          <div className="p-2 border-r-[2px] border-black flex flex-col justify-center">
                            <p className="text-[10px] font-bold mb-2">PRODUCT NAME</p>
                            <p className="text-sm font-black uppercase">POOLED PLATELETS, LEUKOCYTES REDUCED</p>
                          </div>
                          <div className="p-2 flex flex-col justify-center items-center bg-black text-white">
                            <p className="text-[10px] font-bold mb-1">ABO / Rh GROUP</p>
                            <p className="text-3xl font-black">O POS</p>
                            <p className="text-xs font-bold">O Positive</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 border-b-[2px] border-black">
                          <div className="p-2 border-r-[2px] border-black">
                            <div className="flex justify-between items-baseline mb-2">
                              <span className="text-[10px] font-bold uppercase">Volume:</span>
                              <span className="text-sm font-black">205 ml</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                              <span className="text-[10px] font-bold uppercase">Units:</span>
                              <span className="text-sm font-black underline">5 Units Pooled</span>
                            </div>
                          </div>
                          <div className="p-2 flex flex-col justify-center">
                            <p className="text-[10px] font-bold mb-1 uppercase">Expiry Date/Time</p>
                            <p className="text-base font-black">OCT 29, 2023</p>
                            <p className="text-base font-black">14:30</p>
                          </div>
                        </div>
                        <div className="p-2 border-b-[2px] border-black bg-slate-50">
                          <p className="text-[10px] font-bold mb-1">RECIPIENT INFORMATION</p>
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-black uppercase">DOE, JONATHAN A.</p>
                            <p className="text-xs font-bold">ID: #PT-88219-X</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-96 space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Product Metadata</h3>
                        <div className="space-y-4">
                          <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                            <span className="text-slate-900 font-medium">5 Units Total</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">Verified</span>
                          </div>
                          <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <p className="text-xs text-amber-800 font-medium">Requires continuous agitation. Do not refrigerate.</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl">
                        <h4 className="font-bold text-lg mb-2">Print Queue</h4>
                        <div className="space-y-3">
                          <select className="w-full bg-slate-800 border-slate-700 rounded-lg text-sm">
                            <option>Zebra ZT411 (Central Lab)</option>
                          </select>
                          <div className="flex gap-2">
                            <input className="bg-slate-800 border-slate-700 rounded-lg p-2 w-20 text-center font-bold" type="number" defaultValue="1" />
                            <button className="flex-1 bg-primary hover:bg-primary/90 rounded-lg font-bold">GO</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            )}
            {screen === 'users' && (
              <div className="pb-24">
                <Header 
                  title="User Management" 
                  rightElement={
                    <button className="bg-primary text-white p-2 rounded-full shadow-lg">
                      <UserPlus className="w-5 h-5" />
                    </button>
                  } 
                />
                <main className="p-4 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-white shadow-sm text-sm" placeholder="Search by name or email" />
                  </div>
                  <div className="flex justify-between items-center mb-2 px-1">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">System Users (24)</h2>
                    <Filter className="w-4 h-4 text-slate-400" />
                  </div>
                  {[
                    { name: 'John Doe', email: 'john.doe@bbms-blood.org', role: 'Admin', active: true },
                    { name: 'Sarah Anderson', email: 's.anderson@bbms-blood.org', role: 'Medical Officer', active: true },
                    { name: 'Mike Knight', email: 'm.knight@bbms-blood.org', role: 'Lab Tech', active: false },
                    { name: 'Linda White', email: 'l.white@bbms-blood.org', role: 'Store Manager', active: true },
                  ].map((user) => (
                    <div key={user.email} className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 ${!user.active ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className={`font-bold ${!user.active ? 'line-through text-slate-400' : 'text-slate-900'}`}>{user.name}</h3>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase text-slate-400">{user.active ? 'Active' : 'Inactive'}</span>
                          <div className={`w-10 h-5 rounded-full relative ${user.active ? 'bg-primary' : 'bg-slate-200'}`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${user.active ? 'right-0.5' : 'left-0.5'}`}></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg">
                          <ShieldCheck className="w-3 h-3 text-primary" />
                          <span className="text-xs font-medium text-slate-700">{user.role}</span>
                        </div>
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  ))}
                </main>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && ['dashboard', 'inventory', 'users'].includes(screen) && (
        <BottomNav activeTab={screen} onTabChange={navigate} />
      )}
    </div>
  );
}
