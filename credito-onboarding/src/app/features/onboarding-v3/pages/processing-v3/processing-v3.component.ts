import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processing-v3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processing-v3.component.html',
  styleUrl: './processing-v3.component.scss'
})
export class ProcessingV3Component implements OnInit {
  currentStep = signal(0);
  isComplete = signal(false);
  
  steps = [
    { title: 'Validando identidad', subtitle: 'Verificando documentos', icon: '🔍', delay: 2000 },
    { title: 'Consultando buró de crédito', subtitle: 'Analizando historial', icon: '📊', delay: 2500 },
    { title: 'Validando referencias', subtitle: 'Confirmando contactos', icon: '👥', delay: 2000 },
    { title: 'Calculando cuota final', subtitle: 'Optimizando términos', icon: '💳', delay: 2000 },
    { title: '¡Aprobación exitosa!', subtitle: 'Todo listo', icon: '✅', delay: 1500 }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.processSteps();
  }

  private async processSteps() {
    for (let i = 0; i < this.steps.length; i++) {
      this.currentStep.set(i);
      await this.delay(this.steps[i].delay);
    }
    this.isComplete.set(true);
    await this.delay(1000);
    this.router.navigate(['/onboarding-v3/verification']);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
