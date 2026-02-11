import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingV2Service } from '../../../../core/onboarding-v2.service';
import { ProgressIndicatorComponent } from '../../components/progress-indicator/progress-indicator.component';

@Component({
  selector: 'app-early-offer-v2',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ProgressIndicatorComponent],
  templateUrl: './early-offer-v2.component.html',
  styleUrl: './early-offer-v2.component.scss'
})
export class EarlyOfferV2Component implements OnInit {
  private router = inject(Router);
  private onboardingService = inject(OnboardingV2Service);

  isEvaluating = signal(true);
  showOffer = signal(false);
  monthlyPayment = 250;

  ngOnInit() {
    this.performEarlyEvaluation();
  }

  private async performEarlyEvaluation() {
    // Simular evaluación rápida basada en cédula y buró
    await this.delay(3000);
    
    this.isEvaluating.set(false);
    this.showOffer.set(true);

    // Guardar resultado preliminar
    this.onboardingService.updateCreditEvaluation({
      status: 'PRELIMINARY',
      monthlyPayment: this.monthlyPayment
    });
  }

  continueProcess() {
    this.onboardingService.nextStep();
    this.router.navigate(['/onboarding-v2/personal-data']);
  }

  decline() {
    this.router.navigate(['/']);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
