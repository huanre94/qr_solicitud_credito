import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss'
})
export class IdentityComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  identityForm: FormGroup;
  captchaVerified = signal(false);
  isProcessing = signal(false);
  
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
    // Verificar que la respuesta sea correcta
    if (captchaValue && parseInt(captchaValue) === this.captchaRespuestaCorrecta) {
      this.captchaVerified.set(true);
    } else {
      this.captchaVerified.set(false);
    }
  }

  onSubmit() {
    if (this.identityForm.valid && this.captchaVerified()) {
      this.isProcessing.set(true);
      
      // Simular validación de cédula
      setTimeout(() => {
        this.isProcessing.set(false);
        this.router.navigate(['/onboarding-v1/address']);
      }, 2000);
    } else {
      this.markFormGroupTouched(this.identityForm);
    }
  }

  goBack() {
    this.router.navigate(['/onboarding-v1/welcome']);
  }

  cancel() {
    this.router.navigate(['/']);
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
