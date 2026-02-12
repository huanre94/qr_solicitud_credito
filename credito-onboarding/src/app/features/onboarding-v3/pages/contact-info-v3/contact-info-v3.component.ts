import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-info-v3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-info-v3.component.html',
  styleUrl: './contact-info-v3.component.scss'
})
export class ContactInfoV3Component {
  private fb = inject(FormBuilder);

  // Eventos que emite al componente padre
  submitForm = output<any>();
  goBack = output<void>();
  cancel = output<void>();

  contactForm: FormGroup;
  showCancelModal = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      telefonoCelular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telefonoFijo: ['', Validators.pattern(/^\d{7,10}$/)],
      correoElectronico: ['', [Validators.required, Validators.email]],
      correoAlterno: ['', Validators.email],
      horarioContacto: ['', Validators.required],
      preferenciaContacto: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitForm.emit(this.contactForm.value);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
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

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get telefonoCelular() { return this.contactForm.get('telefonoCelular'); }
  get telefonoFijo() { return this.contactForm.get('telefonoFijo'); }
  get correoElectronico() { return this.contactForm.get('correoElectronico'); }
  get correoAlterno() { return this.contactForm.get('correoAlterno'); }
  get horarioContacto() { return this.contactForm.get('horarioContacto'); }
  get preferenciaContacto() { return this.contactForm.get('preferenciaContacto'); }
}
