import { Injectable, signal } from '@angular/core';
import { OnboardingDataV2, OnboardingSessionV2 } from '../domain/models/onboarding-v2.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingV2Service {
  private onboardingData = signal<OnboardingDataV2>({
    session: {
      sessionId: this.generateSessionId(),
      status: 'DRAFT',
      currentStep: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });

  private currentStep = signal<number>(0);

  getData = this.onboardingData.asReadonly();
  getCurrentStep = this.currentStep.asReadonly();

  private generateSessionId(): string {
    return `ONB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  startOnboarding(): void {
    this.onboardingData.update(data => ({
      ...data,
      session: {
        ...data.session,
        status: 'IN_PROGRESS',
        updatedAt: new Date()
      }
    }));
    this.nextStep();
  }

  updateIdentity(identity: any, consents: any, kyc: any): void {
    this.onboardingData.update(data => ({
      ...data,
      identity,
      consents,
      kyc,
      session: { ...data.session, updatedAt: new Date() }
    }));
  }

  updatePersonalData(personalData: any): void {
    this.onboardingData.update(data => ({
      ...data,
      personalData,
      session: { ...data.session, updatedAt: new Date() }
    }));
  }

  updateCreditEvaluation(evaluation: any): void {
    this.onboardingData.update(data => ({
      ...data,
      creditEvaluation: evaluation,
      session: { ...data.session, updatedAt: new Date() }
    }));
  }

  updateDigitalSignature(signature: any): void {
    this.onboardingData.update(data => ({
      ...data,
      digitalSignature: signature,
      session: { ...data.session, updatedAt: new Date() }
    }));
  }

  completeOnboarding(): void {
    this.onboardingData.update(data => ({
      ...data,
      session: {
        ...data.session,
        status: 'COMPLETED',
        updatedAt: new Date()
      }
    }));
  }

  nextStep(): void {
    if (this.currentStep() < 5) {
      this.currentStep.update(step => step + 1);
    }
  }

  previousStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update(step => step - 1);
    }
  }

  goToStep(step: number): void {
    if (step >= 0 && step <= 5) {
      this.currentStep.set(step);
    }
  }

  getProgressPercentage(): number {
    return Math.round((this.currentStep() / 5) * 100);
  }
}
