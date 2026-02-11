import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingV2Service } from '../../../../core/onboarding-v2.service';
import { ProgressIndicatorComponent } from '../../components/progress-indicator/progress-indicator.component';

@Component({
  selector: 'app-personal-data-v2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProgressIndicatorComponent],
  templateUrl: './personal-data-v2.component.html',
  styleUrl: './personal-data-v2.component.scss'
})
export class PersonalDataV2Component implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private onboardingService = inject(OnboardingV2Service);

  personalDataForm!: FormGroup;

  ngOnInit(): void {
    // Simular datos prellenados de fuentes externas
    this.personalDataForm = this.fb.group({
      fullName: [{ value: 'Juan Carlos Pérez García', disabled: true }, Validators.required],
      birthDate: [{ value: '1990-05-15', disabled: true }, Validators.required],
      phone: ['3001234567', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['juan.perez@email.com', [Validators.required, Validators.email]],
      address: ['Calle 123 #45-67, Apto 301', Validators.required],
      city: [{ value: 'Bogotá', disabled: true }, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.personalDataForm.invalid) {
      this.markFormAsTouched();
      return;
    }

    // Combinar datos bloqueados y editables
    const formValue = {
      ...this.personalDataForm.getRawValue() // getRawValue incluye campos disabled
    };

    this.onboardingService.updatePersonalData(formValue);
    this.onboardingService.nextStep();
    this.router.navigate(['/onboarding-v2/evaluation']);
  }

  goBack(): void {
    this.onboardingService.previousStep();
    this.router.navigate(['/onboarding-v2/identity']);
  }

  private markFormAsTouched(): void {
    Object.keys(this.personalDataForm.controls).forEach(key => {
      this.personalDataForm.get(key)?.markAsTouched();
    });
  }

  get fullName() { return this.personalDataForm.get('fullName'); }
  get birthDate() { return this.personalDataForm.get('birthDate'); }
  get phone() { return this.personalDataForm.get('phone'); }
  get email() { return this.personalDataForm.get('email'); }
  get address() { return this.personalDataForm.get('address'); }
  get city() { return this.personalDataForm.get('city'); }
}
