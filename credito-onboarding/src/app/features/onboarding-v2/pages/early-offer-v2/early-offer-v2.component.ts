import { Component, OnInit, signal, inject, output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
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
  private onboardingService = inject(OnboardingV2Service);

  // Eventos que emite al componente padre
  accepted = output<void>();
  declined = output<void>();

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
    this.accepted.emit();
  }

  decline() {
    this.declined.emit();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
