
export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  createdAt?: Date;
  // lastLogin?: Date;
  profileImageUrl?: string;
  provider?: string;
}

export interface UserFirestore {
  email?: string;
  firstName?: string;
  lastName?: string;
  // birthDate?: Timestamp;
  // createdAt?: Timestamp;
  // lastLogin?: Timestamp;
  profileImageUrl?: string;
  provider?: string;
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