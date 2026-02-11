import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingV2Service } from '../../../../core/onboarding-v2.service';

@Component({
  selector: 'app-success-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-v2.component.html',
  styleUrl: './success-v2.component.scss'
})
export class SuccessV2Component {
  constructor(
    private router: Router,
    private onboardingService: OnboardingV2Service
  ) {}

  get creditOffer() {
    return this.onboardingService.getData().creditEvaluation;
  }

  get personalData() {
    return this.onboardingService.getData().personalData;
  }

  finishOnboarding() {
    // En producción, aquí se podría redirigir al dashboard de la app
    console.log('Onboarding completado:', this.onboardingService.getData());
    this.router.navigate(['/']);
  }

  downloadContract() {
    // En producción, descargar PDF del contrato
    console.log('Descargando contrato...');
    alert('Funcionalidad de descarga de contrato - En producción se descargaría un PDF');
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
}
