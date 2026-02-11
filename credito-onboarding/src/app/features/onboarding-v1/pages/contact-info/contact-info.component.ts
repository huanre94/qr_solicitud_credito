import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss'
})
export class ContactInfoComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  contactForm: FormGroup;

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
      console.log('Datos de contactabilidad:', this.contactForm.value);
      this.router.navigate(['/onboarding-v1/processing']);
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  goBack(): void {
    this.router.navigate(['/onboarding-v1/employment']);
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
