export interface AgentInfo {
  name: string;
  title: string;
  photoUrl: string;
}

// Location Interface
export interface AgentLocation {
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

// Supabase:
export interface SupabaseAgent {
  id: number;
  name?: string;
  firstName?: string;
  secondLastName?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  profileImageUrl?: string;
  agency?: string;
  role?: string;
  hireDate?: string;
  managerId?: string;
  managerName?: string;
  managerFirstName?: string;
  managerSecondLastName?: string;
  managerEmail?: string;
  managerPhone?: string;
  linkedin?: string;
  location?: AgentLocation;
  drivingLicense?: boolean;
  ownCar?: boolean;
  companyCar?: boolean;
}

// .TS:
export interface Agent {
  id: number;
  name: string;
  firstName: string;
  secondLastName: string;
  email: string;
  phone: string;
  birthDate: string;
  profileImageUrl: string;
  agency: string;
  role: string;
  hireDate: string;
  managerId: string;
  managerName: string;
  managerFirstName: string;
  managerSecondLastName: string;
  managerEmail: string;
  managerPhone: string;
  linkedin: string;
  location: AgentLocation;
  drivingLicense: boolean;
  ownCar: boolean;
  companyCar: boolean;
}
