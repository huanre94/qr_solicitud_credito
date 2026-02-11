import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-references-v3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-references-v3.component.html',
  styleUrl: './address-references-v3.component.scss'
})
export class AddressReferencesV3Component {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  combinedForm: FormGroup;

  constructor() {
    this.combinedForm = this.fb.group({
      // Dirección
      calle: ['', [Validators.required, Validators.minLength(5)]],
      numeroCasa: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      
      // Referencias
      references: this.fb.array([
        this.createReference(),
        this.createReference()
      ])
    });
  }

  private createReference(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      relacion: ['', Validators.required]
    });
  }

  get references(): FormArray {
    return this.combinedForm.get('references') as FormArray;
  }

  getReference(index: number): FormGroup {
    return this.references.at(index) as FormGroup;
  }

  onSubmit() {
    if (this.combinedForm.valid) {
      console.log('Dirección y Referencias:', this.combinedForm.value);
      this.router.navigate(['/onboarding-v3/processing']);
    } else {
      this.markFormGroupTouched(this.combinedForm);
    }
  }

  goBack() {
    this.router.navigate(['/onboarding-v3/contact-info']);
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    if (formGroup instanceof FormArray) {
      formGroup.controls.forEach(control => {
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFormGroupTouched(control);
        } else {
          control.markAsTouched();
        }
      });
    } else {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFormGroupTouched(control);
        } else {
          control?.markAsTouched();
        }
      });
    }
  }

  get calle() { return this.combinedForm.get('calle'); }
  get numeroCasa() { return this.combinedForm.get('numeroCasa'); }
  get ciudad() { return this.combinedForm.get('ciudad'); }
  get codigoPostal() { return this.combinedForm.get('codigoPostal'); }
}
