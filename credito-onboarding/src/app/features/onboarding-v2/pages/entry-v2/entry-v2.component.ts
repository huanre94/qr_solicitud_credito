import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingV2Service } from '../../../../core/onboarding-v2.service';

@Component({
  selector: 'app-entry-v2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-v2.component.html',
  styleUrl: './entry-v2.component.scss'
})
export class EntryV2Component {
  private router = inject(Router);
  private onboardingService = inject(OnboardingV2Service);

  startOnboarding(): void {
    this.onboardingService.startOnboarding();
    this.router.navigate(['/onboarding-v2/identity']);
  }
}
