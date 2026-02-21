export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
export type ComponentType = 'Whole Blood' | 'RBC' | 'Platelets' | 'Plasma' | 'Cryo';
export type UnitStatus = 'Available' | 'Quarantined' | 'Reserved' | 'Urgent';

export interface BloodUnit {
  id: string;
  group: BloodGroup;
  type: ComponentType;
  status: UnitStatus;
  location: string;
  expiryDate: string;
  volume: number;
  patientId?: string;
}

export interface ActivityLog {
  id: string;
  type: 'donation' | 'requisition' | 'dispatch' | 'registration';
  title: string;
  description: string;
  timestamp: string;
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  registrationDate: string;
  lastDonationDate: string;
  contact: string;
  email?: string;
}

export type Screen = 
  | 'login' 
  | 'verification' 
  | 'dashboard' 
  | 'inventory' 
  | 'pooling' 
  | 'lab-testing' 
  | 'separation' 
  | 'label-gen' 
  | 'donor-reg' 
  | 'users';
