import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingV2Service } from '../../../../core/onboarding-v2.service';

@Component({
  selector: 'app-signature-v2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signature-v2.component.html',
  styleUrl: './signature-v2.component.scss'
})
export class SignatureV2Component {
  signatureForm: FormGroup;
  otpMethod = signal<'sms' | 'email'>('sms');
  otpSent = signal(false);
  isProcessing = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private onboardingService: OnboardingV2Service
  ) {
    this.signatureForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  get creditOffer() {
    return this.onboardingService.getData().creditEvaluation;
  }

  get personalData() {
    return this.onboardingService.getData().personalData;
  }

  selectOTPMethod(method: 'sms' | 'email') {
    this.otpMethod.set(method);
    this.otpSent.set(false);
    this.signatureForm.patchValue({ otp: '' });
    this.errorMessage.set(null);
  }

  sendOTP() {
    this.isProcessing.set(true);
    this.errorMessage.set(null);

    // Simular envío de OTP
    setTimeout(() => {
      this.otpSent.set(true);
      this.isProcessing.set(false);
      console.log(`OTP enviado vía ${this.otpMethod()}`);
    }, 1500);
  }

  resendOTP() {
    this.signatureForm.patchValue({ otp: '' });
    this.sendOTP();
  }

  activateCredit() {
    if (this.signatureForm.invalid) {
      this.signatureForm.markAllAsTouched();
      return;
    }

    this.isProcessing.set(true);
    this.errorMessage.set(null);

    // Simular validación de OTP y activación
    setTimeout(() => {
      const otpValue = this.signatureForm.value.otp;
      
      // Simular validación (en producción sería contra backend)
      if (otpValue === '123456') {
        // OTP correcto - actualizar estado y navegar a éxito
        this.onboardingService.updateDigitalSignature({
          signatureMethod: this.otpMethod(),
          signedAt: new Date(),
          contractAccepted: true,
          otpValidated: true
        });
        
        this.isProcessing.set(false);
        this.router.navigate(['/onboarding-v2/success']);
      } else {
        // OTP incorrecto
        this.isProcessing.set(false);
        this.errorMessage.set('Código incorrecto. Por favor, verifica el código enviado.');
      }
    }, 2000);
  }

  goBack() {
    this.router.navigate(['/onboarding-v2/offer']);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
}
