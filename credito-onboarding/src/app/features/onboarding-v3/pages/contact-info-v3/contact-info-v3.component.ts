import { Component, inject, output, signal, input, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-info-v3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-info-v3.component.html',
  styleUrl: './contact-info-v3.component.scss'
})
export class ContactInfoV3Component implements OnInit {
  private fb = inject(FormBuilder);

  // Input para recibir datos iniciales
  initialData = input<any>(null);

  // Eventos que emite al componente padre
  submitForm = output<any>();
  goBack = output<any>();  // Ahora emite los datos parciales
  cancel = output<void>();

  contactForm: FormGroup;
  showCancelModal = signal(false);

  constructor() {
    this.contactForm = this.fb.group({
      telefonoCelular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correoElectronico: ['', [Validators.required, Validators.email]]
    });

    // Efecto para restaurar datos cuando cambien
    effect(() => {
      const data = this.initialData();
      if (data) {
        this.contactForm.patchValue(data);
      }
    });
  }

  ngOnInit(): void {
    // La restauración se maneja en el effect del constructor
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitForm.emit(this.contactForm.value);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  onGoBack(): void {
    // Emitir datos parciales del formulario
    this.goBack.emit(this.contactForm.value);
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
  get correoElectronico() { return this.contactForm.get('correoElectronico'); }
}
