import { Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-identity-v3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './identity-v3.component.html',
  styleUrl: './identity-v3.component.scss'
})
export class IdentityV3Component {
  private fb = inject(FormBuilder);

  // Eventos que emite al componente padre
  submitForm = output<any>();
  goBack = output<void>();
  cancel = output<void>();

  identityForm: FormGroup;
  captchaVerified = signal(false);
  isProcessing = signal(false);
  showCancelModal = signal(false);
  
  // CAPTCHA dinámico
  captchaNum1: number;
  captchaNum2: number;
  captchaRespuestaCorrecta: number;

  constructor() {
    // Generar números aleatorios para CAPTCHA (1-10)
    this.captchaNum1 = Math.floor(Math.random() * 10) + 1;
    this.captchaNum2 = Math.floor(Math.random() * 10) + 1;
    this.captchaRespuestaCorrecta = this.captchaNum1 + this.captchaNum2;
    
    this.identityForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]],
      autorizacionBuro: [false, Validators.requiredTrue],
      autorizacionDatos: [false, Validators.requiredTrue],
      captcha: ['', Validators.required]
    });
  }

  verifyCaptcha() {
    const captchaValue = this.identityForm.get('captcha')?.value;
    if (captchaValue && parseInt(captchaValue) === this.captchaRespuestaCorrecta) {
      this.captchaVerified.set(true);
    } else {
      this.captchaVerified.set(false);
    }
  }

  onSubmit() {
    if (this.identityForm.valid && this.captchaVerified()) {
      this.isProcessing.set(true);
      
      // Simular validación y consulta al buró
      setTimeout(() => {
        this.isProcessing.set(false);
        this.submitForm.emit(this.identityForm.value);
      }, 2000);
    } else {
      this.markFormGroupTouched(this.identityForm);
    }
  }

  onGoBack() {
    this.goBack.emit();
  }

  openCancelModal(): void {
    this.showCancelModal.set(true);
  }

  closeCancelModal(): void {
    this.showCancelModal.set(false);
  }

  confirmCancel(): void {
    this.showCancelModal.set(false);
    this.cancel.emit();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  get cedula() { return this.identityForm.get('cedula'); }
  get autorizacionBuro() { return this.identityForm.get('autorizacionBuro'); }
  get autorizacionDatos() { return this.identityForm.get('autorizacionDatos'); }
  get captcha() { return this.identityForm.get('captcha'); }
}
