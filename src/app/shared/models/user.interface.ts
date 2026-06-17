// .TS:
export interface User {
  id: string;
  role: string;
  email: string;
  phone: string;
  lastSignInAt: Date;
  provider: string;
  providers: string[];
  isEmailVerified: boolean;
  identities: Identity[];
  createdAt: Date;
  updatedAt: Date;
  isAnonymous: boolean;
  userProfile: any; // TODO: first_name, last_name, city, state, country, zip_code, birth_date, profile_image_url
  employeeProfile: any; // TODO: agency, hire_date, manager_id, linkedin_url, driving_license, own_car, company_car
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  password: string;
  fullName?: string;
}

// SUPABASE:
export interface UserSupabase {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmed_at: Date;
  last_sign_in_at: Date;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: Date;
  updated_at: Date;
  is_anonymous: boolean;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
  email: string;
}

export interface IdentityData {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}

export interface UserMetadata {
  email_verified: boolean;
}
