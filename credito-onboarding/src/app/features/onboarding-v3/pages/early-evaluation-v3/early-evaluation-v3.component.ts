import { Component, OnInit, inject, signal, output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-early-evaluation-v3',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './early-evaluation-v3.component.html',
  styleUrl: './early-evaluation-v3.component.scss'
})
export class EarlyEvaluationV3Component implements OnInit {
  // Eventos que emite al componente padre
  accepted = output<any>();
  declined = output<void>();

  isEvaluating = signal(true);
  showOffer = signal(false);
  
  // Datos simulados de la oferta
  monthlyPayment = 250; // Cuota máxima mensual en USD

  ngOnInit() {
    // Simular evaluación en el buró
    setTimeout(() => {
      this.isEvaluating.set(false);
      this.showOffer.set(true);
    }, 3000);
  }

  continueProcess() {
    this.accepted.emit({ monthlyPayment: this.monthlyPayment });
  }

  onDecline() {
    this.declined.emit();
  }
}
