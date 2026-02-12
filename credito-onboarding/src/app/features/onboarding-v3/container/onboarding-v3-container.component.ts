import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Importar componentes hijos
import { WelcomeV3Component } from '../pages/welcome-v3/welcome-v3.component';
import { IdentityV3Component } from '../pages/identity-v3/identity-v3.component';
import { EarlyEvaluationV3Component } from '../pages/early-evaluation-v3/early-evaluation-v3.component';
import { ContactInfoV3Component } from '../pages/contact-info-v3/contact-info-v3.component';
import { AddressReferencesV3Component } from '../pages/address-references-v3/address-references-v3.component';
import { ProcessingV3Component } from '../pages/processing-v3/processing-v3.component';
import { VerificationV3Component } from '../pages/verification-v3/verification-v3.component';

type OnboardingStep = 'welcome' | 'identity' | 'early-evaluation' | 'contact-info' | 'address-references' | 'processing' | 'verification';

@Component({
  selector: 'app-onboarding-v3-container',
  standalone: true,
  imports: [
    CommonModule,
    WelcomeV3Component,
    IdentityV3Component,
    EarlyEvaluationV3Component,
    ContactInfoV3Component,
    AddressReferencesV3Component,
    ProcessingV3Component,
    VerificationV3Component
  ],
  templateUrl: './onboarding-v3-container.component.html',
  styleUrl: './onboarding-v3-container.component.scss'
})
export class OnboardingV3ContainerComponent {
  private router = inject(Router);

  // Signal para el paso actual
  currentStep = signal<OnboardingStep>('welcome');
  
  // Signal para datos del formulario
  formData = signal<{
    identity?: any;
    earlyEvaluation?: any;
    contactInfo?: any;
    addressReferences?: any;
  }>({});

  // Computed para saber si podemos retroceder
  canGoBack = computed(() => {
    const step = this.currentStep();
    return step !== 'welcome' && step !== 'verification' && step !== 'processing';
  });

  // Computed para el índice del paso (para progress indicator)
  stepIndex = computed(() => {
    const steps: OnboardingStep[] = ['welcome', 'identity', 'early-evaluation', 'contact-info', 'address-references', 'processing', 'verification'];
    return steps.indexOf(this.currentStep());
  });

  // ============ MANEJADORES DE EVENTOS DE WELCOME ============
  onWelcomeStart(): void {
    this.currentStep.set('identity');
  }

  // ============ MANEJADORES DE EVENTOS DE IDENTITY ============
  onIdentitySubmit(data: any): void {
    this.formData.update(current => ({
      ...current,
      identity: data
    }));
    this.currentStep.set('early-evaluation');
  }

  onIdentityBack(): void {
    this.currentStep.set('welcome');
  }

  // ============ MANEJADORES DE EVENTOS DE EARLY EVALUATION ============
  onEarlyEvaluationAccepted(data: any): void {
    this.formData.update(current => ({
      ...current,
      earlyEvaluation: data
    }));
    this.currentStep.set('contact-info');
  }

  onEarlyEvaluationDeclined(): void {
    this.cancel();
  }

  // ============ MANEJADORES DE EVENTOS DE CONTACT INFO ============
  onContactInfoSubmit(data: any): void {
    this.formData.update(current => ({
      ...current,
      contactInfo: data
    }));
    this.currentStep.set('address-references');
  }

  onContactInfoBack(): void {
    this.currentStep.set('early-evaluation');
  }

  // ============ MANEJADORES DE EVENTOS DE ADDRESS-REFERENCES ============
  onAddressReferencesSubmit(data: any): void {
    this.formData.update(current => ({
      ...current,
      addressReferences: data
    }));
    this.currentStep.set('processing');
  }

  onAddressReferencesBack(): void {
    this.currentStep.set('contact-info');
  }

  // ============ MANEJADORES DE EVENTOS DE PROCESSING ============
  onProcessingComplete(): void {
    this.currentStep.set('verification');
  }

  // ============ MANEJADORES GLOBALES ============
  cancel(): void {
    this.router.navigate(['/']);
  }
}
