import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingV2Service } from '../../../../core/onboarding-v2.service';
import { ProgressIndicatorComponent } from '../../components/progress-indicator/progress-indicator.component';

@Component({
  selector: 'app-offer-v2',
  standalone: true,
  imports: [CommonModule, ProgressIndicatorComponent],
  templateUrl: './offer-v2.component.html',
  styleUrl: './offer-v2.component.scss'
})
export class OfferV2Component {
  private router = inject(Router);
  private onboardingService = inject(OnboardingV2Service);

  creditOffer = this.onboardingService.getData().creditEvaluation;
  showConditions = false;

  toggleConditions(): void {
    this.showConditions = !this.showConditions;
  }

  acceptOffer(): void {
    this.onboardingService.nextStep();
    this.router.navigate(['/onboarding-v2/signature']);
  }

  formatCurrency(value: number | undefined): string {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  }
}
