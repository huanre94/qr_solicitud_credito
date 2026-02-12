import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingV2Service } from '../../../core/onboarding-v2.service';

// Importar componentes hijos
import { EntryV2Component } from '../pages/entry-v2/entry-v2.component';
import { IdentityV2Component } from '../pages/identity-v2/identity-v2.component';
import { EarlyOfferV2Component } from '../pages/early-offer-v2/early-offer-v2.component';
import { PersonalDataV2Component } from '../pages/personal-data-v2/personal-data-v2.component';
import { SignatureV2Component } from '../pages/signature-v2/signature-v2.component';
import { SuccessV2Component } from '../pages/success-v2/success-v2.component';

type OnboardingStep = 'entry' | 'identity' | 'early-offer' | 'personal-data' | 'signature' | 'success';

@Component({
  selector: 'app-onboarding-v2-container',
  standalone: true,
  imports: [
    CommonModule,
    EntryV2Component,
    IdentityV2Component,
    EarlyOfferV2Component,
    PersonalDataV2Component,
    SignatureV2Component,
    SuccessV2Component
  ],
  templateUrl: './onboarding-v2-container.component.html',
  styleUrl: './onboarding-v2-container.component.scss'
})
export class OnboardingV2ContainerComponent {
  private router = inject(Router);
  private onboardingService = inject(OnboardingV2Service);

  // Signal para el paso actual
  currentStep = signal<OnboardingStep>('entry');
  
  // Signal para datos del formulario
  formData = signal<{
    identity?: any;
    consents?: any;
    kyc?: any;
    personalData?: any;
    signature?: any;
  }>({});

  // Computed para saber si podemos retroceder
  canGoBack = computed(() => {
    const step = this.currentStep();
    return step !== 'entry' && step !== 'success';
  });

  // Computed para el índice del paso (para progress indicator)
  stepIndex = computed(() => {
    const steps: OnboardingStep[] = ['entry', 'identity', 'early-offer', 'personal-data', 'signature', 'success'];
    return steps.indexOf(this.currentStep());
  });

  // ============ MANEJADORES DE EVENTOS DE ENTRY ============
  onEntryStart(): void {
    this.onboardingService.startOnboarding();
    this.currentStep.set('identity');
  }

  // ============ MANEJADORES DE EVENTOS DE IDENTITY ============
  onIdentitySubmit(data: { identity: any; consents: any; kyc: any }): void {
    this.onboardingService.updateIdentity(data.identity, data.consents, data.kyc);
    this.formData.update(current => ({
      ...current,
      identity: data.identity,
      consents: data.consents,
      kyc: data.kyc
    }));
    this.currentStep.set('early-offer');
  }

  // ============ MANEJADORES DE EVENTOS DE EARLY OFFER ============
  onEarlyOfferAccepted(): void {
    this.currentStep.set('personal-data');
  }

  onEarlyOfferDeclined(): void {
    this.cancel();
  }

  // ============ MANEJADORES DE EVENTOS DE PERSONAL DATA ============
  onPersonalDataSubmit(data: any): void {
    this.onboardingService.updatePersonalData(data);
    this.formData.update(current => ({
      ...current,
      personalData: data
    }));
    this.currentStep.set('signature');
  }

  onPersonalDataBack(): void {
    this.currentStep.set('early-offer');
  }

  // ============ MANEJADORES DE EVENTOS DE SIGNATURE ============
  onSignatureSubmit(data: any): void {
    this.onboardingService.updateDigitalSignature(data);
    this.onboardingService.completeOnboarding();
    this.formData.update(current => ({
      ...current,
      signature: data
    }));
    this.currentStep.set('success');
  }

  onSignatureBack(): void {
    this.currentStep.set('personal-data');
  }

  // ============ MANEJADORES GLOBALES ============
  cancel(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    const currentStepValue = this.currentStep();
    
    switch (currentStepValue) {
      case 'identity':
        this.currentStep.set('entry');
        break;
      case 'early-offer':
        this.currentStep.set('identity');
        break;
      case 'personal-data':
        this.currentStep.set('early-offer');
        break;
      case 'signature':
        this.currentStep.set('personal-data');
        break;
      default:
        break;
    }
  }
}
