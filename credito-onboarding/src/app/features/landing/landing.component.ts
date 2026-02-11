import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToV1() {
    this.router.navigate(['/onboarding-v1/welcome']);
  }

  goToV2() {
    this.router.navigate(['/onboarding-v2/entry']);
  }
}
