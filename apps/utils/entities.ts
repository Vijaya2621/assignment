//enums
export enum ROLES {
  SUPER_ADMIN = 'superAdmin',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  HEALTHCARE_WORKER = 'healthcareworker',
  PATIENT = 'patient',
}

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum TYPE {
  HOSPITAL = 'hospital',
  HEALTHCARE_WORKER = 'healthcareworker',
  PATIENT = 'patient',
  NOTES = 'notes',
}
//interface
interface IBase {
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
interface IBaseWithId extends IBase {
  id?: string;
}
export interface IBaseWithMeta extends IBaseWithId {
  createdBy?: string;
  updatedBy?: string;
}

export interface IHospital extends IBaseWithMeta {
  hospitalId: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface IHealthCareWorker extends IBaseWithMeta {
  specialzation: string;
  name: string;
  email: string;
  licenseNumber: string;
  emailVerified: boolean;
  image: string;
  active: boolean;
  phoneNumber: string;
  role: ROLES;
}

export interface IPatient extends IBaseWithMeta {
  condition: string;
  name: string;
  email: string;
  dateOfBirth: string;
  education: string;
  enrolledDate: string;
  height: number;
  weight: number;
  image: string;
  active: boolean;
  role: ROLES;
  phoneNumber: string;
  gender: GENDER;
}
