import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employment.component.html',
  styleUrl: './employment.component.scss'
})
export class EmploymentComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  employmentForm: FormGroup;
  showEmployerFields = signal(false);

  constructor() {
    this.employmentForm = this.fb.group({
      tipoEmpleo: ['', Validators.required],
      nombreEmpresa: [''],
      cargo: [''],
      telefonoEmpresa: [''],
      tiempoLaboral: [''],
      ingresoMensual: ['', [Validators.required, Validators.min(1)]],
      otrosIngresos: [0, Validators.min(0)]
    });

    // Suscripción para mostrar/ocultar campos según tipo de empleo
    this.employmentForm.get('tipoEmpleo')?.valueChanges.subscribe(value => {
      const isEmployed = value === 'empleado' || value === 'independiente';
      this.showEmployerFields.set(isEmployed);
      
      if (isEmployed) {
        this.employmentForm.get('nombreEmpresa')?.setValidators([Validators.required]);
        this.employmentForm.get('cargo')?.setValidators([Validators.required]);
        this.employmentForm.get('telefonoEmpresa')?.setValidators([Validators.required, Validators.pattern(/^\d{7,10}$/)]);
        this.employmentForm.get('tiempoLaboral')?.setValidators([Validators.required]);
      } else {
        this.employmentForm.get('nombreEmpresa')?.clearValidators();
        this.employmentForm.get('cargo')?.clearValidators();
        this.employmentForm.get('telefonoEmpresa')?.clearValidators();
        this.employmentForm.get('tiempoLaboral')?.clearValidators();
      }
      
      this.employmentForm.get('nombreEmpresa')?.updateValueAndValidity();
      this.employmentForm.get('cargo')?.updateValueAndValidity();
      this.employmentForm.get('telefonoEmpresa')?.updateValueAndValidity();
      this.employmentForm.get('tiempoLaboral')?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.employmentForm.valid) {
      console.log('Datos laborales:', this.employmentForm.value);
      this.router.navigate(['/onboarding-v1/contact-info']);
    } else {
      this.markFormGroupTouched(this.employmentForm);
    }
  }

  goBack() {
    this.router.navigate(['/onboarding-v1/references']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  get tipoEmpleo() { return this.employmentForm.get('tipoEmpleo'); }
  get nombreEmpresa() { return this.employmentForm.get('nombreEmpresa'); }
  get cargo() { return this.employmentForm.get('cargo'); }
  get telefonoEmpresa() { return this.employmentForm.get('telefonoEmpresa'); }
  get tiempoLaboral() { return this.employmentForm.get('tiempoLaboral'); }
  get ingresoMensual() { return this.employmentForm.get('ingresoMensual'); }
  get otrosIngresos() { return this.employmentForm.get('otrosIngresos'); }
}
