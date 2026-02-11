import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-v3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-v3.component.html',
  styleUrl: './verification-v3.component.scss'
})
export class VerificationV3Component {
  applicationNumber = this.generateApplicationNumber();
  estimatedTime = '24-48 horas';
  supportEmail = 'soporte@resuelve.com';
  supportPhone = '+593 2 123-4567';
  monthlyPayment = 250;

  constructor(private router: Router) {}

  private generateApplicationNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `RES-V3-${timestamp}-${random}`;
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  downloadDetails() {
    console.log('Descargando detalles de solicitud:', this.applicationNumber);
    alert('Función de descarga en desarrollo. Tu número de solicitud es: ' + this.applicationNumber);
  }
}
