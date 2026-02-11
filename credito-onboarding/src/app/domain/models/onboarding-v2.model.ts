export interface OnboardingSessionV2 {
  sessionId: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  currentStep: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IdentityData {
  documentType: 'CC' | 'CE' | 'PA';
  documentNumber: string;
  fullName?: string;
  birthDate?: string;
}

export interface Consents {
  dataUsage: boolean;
  creditBureauQuery: boolean;
  electronicSignature: boolean;
}

export interface KYCData {
  selfieUrl?: string;
  documentFrontUrl?: string;
  documentBackUrl?: string;
  verificationStatus: 'PENDING' | 'SUCCESS' | 'FAILED';
}

export interface PersonalData {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export interface CreditEvaluation {
  status: 'EVALUATING' | 'APPROVED' | 'REJECTED';
  approvedAmount?: number;
  monthlyPayment?: number;
  interestRate?: number;
  term?: number;
}

export interface DigitalSignature {
  method: 'SMS' | 'EMAIL';
  otpCode?: string;
  signed: boolean;
  signedAt?: Date;
}

export interface OnboardingDataV2 {
  session: OnboardingSessionV2;
  identity?: IdentityData;
  consents?: Consents;
  kyc?: KYCData;
  personalData?: PersonalData;
  creditEvaluation?: CreditEvaluation;
  signature?: DigitalSignature;
}
