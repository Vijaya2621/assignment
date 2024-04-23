//enums
export enum ROLES {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  SUPER_ADMIN = 'superAdmin',
  HEALTHCARE_WORKER = 'healthcareworker',
  PATIENT = 'patient',
}

//interface
interface IBase {
  createdAt?: Date | string;
  updatedAt?: Date | string;
  createdAtUTC?: number;
  updatedAtUTC?: number;
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
export interface IDoctor extends IBaseWithMeta {
  specialzation: string;
  name: string;
  email: string;
  licenseNumber: string;
  emailVerified: boolean;
  image: string;
  active: boolean;
  phoneNumber: string;
}
