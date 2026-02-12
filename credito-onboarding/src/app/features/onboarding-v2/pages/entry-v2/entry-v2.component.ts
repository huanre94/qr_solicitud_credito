import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entry-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-v2.component.html',
  styleUrl: './entry-v2.component.scss'
})
export class EntryV2Component {
  // Eventos que emite al componente padre
  start = output<void>();

  startOnboarding(): void {
    this.start.emit();
  }
}
