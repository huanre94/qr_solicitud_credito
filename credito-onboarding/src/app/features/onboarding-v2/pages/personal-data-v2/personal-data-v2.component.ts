import { Component, inject, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

  // Eventos que emite al componente padre
  submitForm = output<any>();
  goBack = output<void>();
  cancel = output<void>();

  personalDataForm!: FormGroup;
  showCancelModal = signal(false);

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

    this.submitForm.emit(formValue);
  }

  onGoBack(): void {
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
