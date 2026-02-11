export interface ContactInfo {
  nombre: string;
  cedula: string;
  telefono: string;
  correo: string;
}

export interface Reference {
  nombre: string;
  apellido: string;
  parentesco: string;
  celular: string;
  telefonoFijo: string;
}

export interface WorkInfo {
  lugarTrabajo: string;
  salario: number;
  actividadEconomica: string;
  contactoVerificacion: string;
  celularContacto: string;
}

export interface OnboardingData {
  contactInfo?: ContactInfo;
  referencias?: Reference[];
  workInfo?: WorkInfo;
  cuotaDisponible?: number;
}

export enum OnboardingStep {
  WELCOME = 0,
  CONTACT_INFO = 1,
  REFERENCES = 2,
  WORK_INFO = 3,
  SUMMARY = 4
}
