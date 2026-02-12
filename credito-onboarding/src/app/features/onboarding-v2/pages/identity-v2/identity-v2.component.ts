import { Component, inject, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProgressIndicatorComponent } from '../../components/progress-indicator/progress-indicator.component';

@Component({
  selector: 'app-identity-v2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProgressIndicatorComponent],
  templateUrl: './identity-v2.component.html',
  styleUrl: './identity-v2.component.scss'
})
export class IdentityV2Component implements OnInit {
  private fb = inject(FormBuilder);

  // Eventos que emite al componente padre
  submitForm = output<{ identity: any; consents: any; kyc: any }>();
  cancel = output<void>();

  identityForm!: FormGroup;
  consentsForm!: FormGroup;
  kycStatus: 'PENDING' | 'SUCCESS' | 'FAILED' = 'PENDING';
  isLoading = false;
  errorMessage = '';
  showCancelModal = signal(false);

  documentTypes = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'PA', label: 'Pasaporte' }
  ];

  ngOnInit(): void {
    this.identityForm = this.fb.group({
      documentType: ['CC', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern(/^\d{6,12}$/)]]
    });

    this.consentsForm = this.fb.group({
      dataUsage: [false, Validators.requiredTrue],
      creditBureauQuery: [false, Validators.requiredTrue],
      electronicSignature: [false, Validators.requiredTrue]
    });
  }

  async simulateKYC(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Simular captura biométrica
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular verificación exitosa
    this.kycStatus = 'SUCCESS';
    this.isLoading = false;
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

  onSubmit(): void {
    if (this.identityForm.invalid || this.consentsForm.invalid || this.kycStatus !== 'SUCCESS') {
      this.markFormsAsTouched();
      if (this.kycStatus !== 'SUCCESS') {
        this.errorMessage = 'Debes completar la verificación biométrica';
      }
      return;
    }

    // Emitir evento al padre con los datos del formulario
    this.submitForm.emit({
      identity: this.identityForm.value,
      consents: this.consentsForm.value,
      kyc: { verificationStatus: this.kycStatus }
    });
  }

  private markFormsAsTouched(): void {
    Object.keys(this.identityForm.controls).forEach(key => {
      this.identityForm.get(key)?.markAsTouched();
    });
    Object.keys(this.consentsForm.controls).forEach(key => {
      this.consentsForm.get(key)?.markAsTouched();
    });
  }

  get documentType() { return this.identityForm.get('documentType'); }
  get documentNumber() { return this.identityForm.get('documentNumber'); }
  get dataUsage() { return this.consentsForm.get('dataUsage'); }
  get creditBureauQuery() { return this.consentsForm.get('creditBureauQuery'); }
  get electronicSignature() { return this.consentsForm.get('electronicSignature'); }
}
