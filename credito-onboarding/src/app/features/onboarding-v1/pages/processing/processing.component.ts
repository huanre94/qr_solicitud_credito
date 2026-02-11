import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ProcessingStep {
  id: number;
  label: string;
  status: 'pending' | 'processing' | 'completed';
}

@Component({
  selector: 'app-processing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processing.component.html',
  styleUrl: './processing.component.scss'
})
export class ProcessingComponent implements OnInit {
  private router = inject(Router);

  steps = signal<ProcessingStep[]>([
    { id: 1, label: 'Validando información personal', status: 'pending' },
    { id: 2, label: 'Consultando buró de crédito', status: 'pending' },
    { id: 3, label: 'Evaluando capacidad de pago', status: 'pending' },
    { id: 4, label: 'Analizando referencias', status: 'pending' },
    { id: 5, label: 'Generando oferta personalizada', status: 'pending' }
  ]);

  currentStepIndex = signal(0);
  isComplete = signal(false);

  ngOnInit() {
    this.processSteps();
  }

  private async processSteps() {
    const stepsArray = this.steps();
    
    for (let i = 0; i < stepsArray.length; i++) {
      // Marcar como procesando
      stepsArray[i].status = 'processing';
      this.currentStepIndex.set(i);
      this.steps.set([...stepsArray]);
      
      // Simular tiempo de procesamiento (1.5-2.5 segundos por paso)
      await this.delay(1500 + Math.random() * 1000);
      
      // Marcar como completado
      stepsArray[i].status = 'completed';
      this.steps.set([...stepsArray]);
      
      // Pequeña pausa entre pasos
      await this.delay(300);
    }
    
    // Marcar como finalizado y navegar
    this.isComplete.set(true);
    await this.delay(1000);
    this.router.navigate(['/onboarding-v1/verification']);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getProgress(): number {
    const completed = this.steps().filter(s => s.status === 'completed').length;
    return (completed / this.steps().length) * 100;
  }
}
