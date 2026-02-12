import { Component, inject, signal, output, input, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-identity-v3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './identity-v3.component.html',
  styleUrl: './identity-v3.component.scss'
})
export class IdentityV3Component implements OnInit {
  private fb = inject(FormBuilder);

  // Input para recibir datos iniciales
  initialData = input<any>(null);

  // Eventos que emite al componente padre
  submitForm = output<any>();
  goBack = output<any>();  // Ahora emite los datos parciales
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

    // Efecto para restaurar datos cuando cambien
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.identityForm.patchValue({
          cedula: data.cedula || '',
          autorizacionBuro: data.autorizacionBuro || false,
          autorizacionDatos: data.autorizacionDatos || false
        });
      }
    });
  }

  ngOnInit(): void {
    // La restauración se maneja en el effect del constructor
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
    // Emitir datos parciales del formulario
    this.goBack.emit(this.identityForm.value);
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
