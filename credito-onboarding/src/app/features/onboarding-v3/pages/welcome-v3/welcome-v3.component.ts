import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-v3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-v3.component.html',
  styleUrl: './welcome-v3.component.scss'
})
export class WelcomeV3Component {
  private router = inject(Router);

  startOnboarding(): void {
    this.router.navigate(['/onboarding-v3/identity']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
