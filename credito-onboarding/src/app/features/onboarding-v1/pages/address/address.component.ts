import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  addressForm: FormGroup;

  constructor() {
    this.addressForm = this.fb.group({
      calle: ['', [Validators.required, Validators.minLength(5)]],
      numeroCasa: ['', Validators.required],
      colonia: ['', Validators.required],
      ciudad: ['', Validators.required],
      estado: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      tiempoResidencia: ['', Validators.required],
      tipoVivienda: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      // Guardar datos de dirección
      console.log('Dirección:', this.addressForm.value);
      this.router.navigate(['/onboarding-v1/references']);
    } else {
      this.markFormGroupTouched(this.addressForm);
    }
  }

  goBack() {
    this.router.navigate(['/onboarding-v1/identity']);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  get calle() { return this.addressForm.get('calle'); }
  get numeroCasa() { return this.addressForm.get('numeroCasa'); }
  get colonia() { return this.addressForm.get('colonia'); }
  get ciudad() { return this.addressForm.get('ciudad'); }
  get estado() { return this.addressForm.get('estado'); }
  get codigoPostal() { return this.addressForm.get('codigoPostal'); }
  get tiempoResidencia() { return this.addressForm.get('tiempoResidencia'); }
  get tipoVivienda() { return this.addressForm.get('tipoVivienda'); }
}
