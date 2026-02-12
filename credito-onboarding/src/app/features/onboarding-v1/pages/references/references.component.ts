import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  referencesForm: FormGroup;

  constructor() {
    this.referencesForm = this.fb.group({
      references: this.fb.array([
        this.createReference(1),
        this.createReference(2)
      ])
    });
  }

  private createReference(number: number): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      relacion: ['', Validators.required]
    });
  }

  get references(): FormArray {
    return this.referencesForm.get('references') as FormArray;
  }

  getReference(index: number): FormGroup {
    return this.references.at(index) as FormGroup;
  }

  onSubmit() {
    if (this.referencesForm.valid) {
      console.log('Referencias:', this.referencesForm.value);
      this.router.navigate(['/onboarding-v1/employment']);
    } else {
      this.markFormGroupTouched(this.referencesForm);
    }
  }

  goBack() {
    this.router.navigate(['/onboarding-v1/address']);
  }

  cancel() {
    this.router.navigate(['/']);
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
}
