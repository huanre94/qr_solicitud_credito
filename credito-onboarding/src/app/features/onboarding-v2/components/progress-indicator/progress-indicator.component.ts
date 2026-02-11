import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-indicator">
      <div class="progress-bar-wrapper">
        <div class="progress-bar-fill" [style.width.%]="percentage"></div>
      </div>
      <div class="progress-text">{{ currentStep }} / {{ totalSteps }}</div>
    </div>
  `,
  styles: [`
    @use '../../../../../styles/variables' as *;
    
    .progress-indicator {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      margin-bottom: $spacing-lg;
    }
    
    .progress-bar-wrapper {
      flex: 1;
      height: 8px;
      background-color: $bg-secondary;
      border-radius: $border-radius-full;
      overflow: hidden;
    }
    
    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease-in-out;
    }
    
    .progress-text {
      color: $text-secondary;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      white-space: nowrap;
    }
  `]
})
export class ProgressIndicatorComponent {
  @Input() currentStep: number = 0;
  @Input() totalSteps: number = 6;
  
  get percentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
