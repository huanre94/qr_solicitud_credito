import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-v3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-v3.component.html',
  styleUrl: './welcome-v3.component.scss'
})
export class WelcomeV3Component {
  // Eventos que emite al componente padre
  start = output<void>();

  startOnboarding(): void {
    this.start.emit();
  }
}
