import { Injectable, signal } from '@angular/core';
import { OnboardingData, OnboardingStep, ContactInfo, Reference, WorkInfo } from '../domain/models/onboarding.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private onboardingData = signal<OnboardingData>({
    referencias: []
  });

  private currentStep = signal<OnboardingStep>(OnboardingStep.WELCOME);

  // Getters para señales
  getData = this.onboardingData.asReadonly();
  getCurrentStep = this.currentStep.asReadonly();

  setContactInfo(contactInfo: ContactInfo): void {
    this.onboardingData.update(data => ({
      ...data,
      contactInfo
    }));
  }

  setReferences(referencias: Reference[]): void {
    this.onboardingData.update(data => ({
      ...data,
      referencias
    }));
  }

  setWorkInfo(workInfo: WorkInfo): void {
    this.onboardingData.update(data => ({
      ...data,
      workInfo
    }));
  }

  nextStep(): void {
    if (this.currentStep() < OnboardingStep.SUMMARY) {
      this.currentStep.update(step => step + 1);
    }
  }

  previousStep(): void {
    if (this.currentStep() > OnboardingStep.WELCOME) {
      this.currentStep.update(step => step - 1);
    }
  }

  goToStep(step: OnboardingStep): void {
    this.currentStep.set(step);
  }

  calculateQuota(): number {
    // Lógica simple para calcular cuota disponible
    // En producción esto vendría de un servicio backend
    const workInfo = this.onboardingData().workInfo;
    if (workInfo && workInfo.salario) {
      // 30% del salario como cuota disponible
      return Math.floor(workInfo.salario * 0.3);
    }
    return 0;
  }

  resetOnboarding(): void {
    this.onboardingData.set({ referencias: [] });
    this.currentStep.set(OnboardingStep.WELCOME);
  }
}
