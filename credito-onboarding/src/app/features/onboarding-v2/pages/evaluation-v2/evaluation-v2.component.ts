import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingV2Service } from '../../../../core/onboarding-v2.service';
import { ProgressIndicatorComponent } from '../../components/progress-indicator/progress-indicator.component';

@Component({
  selector: 'app-evaluation-v2',
  standalone: true,
  imports: [CommonModule, ProgressIndicatorComponent],
  templateUrl: './evaluation-v2.component.html',
  styleUrl: './evaluation-v2.component.scss'
})
export class EvaluationV2Component implements OnInit, OnDestroy {
  private router = inject(Router);
  private onboardingService = inject(OnboardingV2Service);
  
  currentMessage = 0;
  messages = [
    'Validando información',
    'Calculando tu línea de crédito',
    'Confirmando elegibilidad'
  ];

  private messageInterval?: any;
  private evaluationTimeout?: any;

  ngOnInit(): void {
    // Cambiar mensaje cada 2 segundos
    this.messageInterval = setInterval(() => {
      this.currentMessage = (this.currentMessage + 1) % this.messages.length;
    }, 2000);

    // Simular evaluación crediticia (5-10 segundos)
    this.evaluationTimeout = setTimeout(() => {
      this.completeEvaluation();
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.messageInterval) {
      clearInterval(this.messageInterval);
    }
    if (this.evaluationTimeout) {
      clearTimeout(this.evaluationTimeout);
    }
  }

  private completeEvaluation(): void {
    // Simular resultado de evaluación exitosa
    this.onboardingService.updateCreditEvaluation({
      status: 'APPROVED',
      approvedAmount: 5000,
      monthlyPayment: 250,
      interestRate: 0,
      term: 24
    });

    this.onboardingService.nextStep();
    this.router.navigate(['/onboarding-v2/offer']);
  }
}
