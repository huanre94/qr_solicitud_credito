import { Component, inject, output, signal, input, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-address-references-v3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-references-v3.component.html',
  styleUrl: './address-references-v3.component.scss'
})
export class AddressReferencesV3Component implements OnInit {
  private fb = inject(FormBuilder);

  // Input para recibir datos iniciales
  initialData = input<any>(null);

  // Eventos que emite al componente padre
  submitForm = output<any>();
  goBack = output<any>();  // Ahora emite los datos parciales
  cancel = output<void>();

  combinedForm: FormGroup;
  showCancelModal = signal(false);

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

    // Efecto para restaurar datos cuando cambien
    effect(() => {
      const data = this.initialData();
      if (data) {
        // Restaurar datos de dirección
        this.combinedForm.patchValue({
          calle: data.calle || '',
          numeroCasa: data.numeroCasa || '',
          ciudad: data.ciudad || '',
          codigoPostal: data.codigoPostal || ''
        });

        // Restaurar referencias si existen
        if (data.references && Array.isArray(data.references)) {
          const referencesArray = this.references;
          referencesArray.clear();
          data.references.forEach((ref: any) => {
            const refGroup = this.createReference();
            refGroup.patchValue(ref);
            referencesArray.push(refGroup);
          });
        }
      }
    });
  }

  ngOnInit(): void {
    // La restauración se maneja en el effect del constructor
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
      this.submitForm.emit(this.combinedForm.value);
    } else {
      this.markFormGroupTouched(this.combinedForm);
    }
  }

  onGoBack() {
    // Emitir datos parciales del formulario
    this.goBack.emit(this.combinedForm.value);
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
