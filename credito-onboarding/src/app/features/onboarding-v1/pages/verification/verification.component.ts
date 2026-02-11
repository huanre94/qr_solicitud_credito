import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {
  private router = inject(Router);

  // Datos de ejemplo para mostrar
  applicationNumber = 'RES-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  estimatedTime = '24 a 48 horas';

  nextSteps = [
    {
      title: 'Contacto telefónico',
      description: 'Nuestro equipo te llamará para verificar algunos datos de tu solicitud.',
      icon: 'phone'
    },
    {
      title: 'Verificación de referencias',
      description: 'Contactaremos las referencias que proporcionaste para confirmar la información.',
      icon: 'users'
    },
    {
      title: 'Validación de documentos',
      description: 'Revisaremos tu identificación y datos laborales.',
      icon: 'file'
    },
    {
      title: 'Respuesta final',
      description: 'Te notificaremos por correo y SMS el resultado de tu solicitud.',
      icon: 'check'
    }
  ];

  goToHome() {
    this.router.navigate(['/']);
  }
}
