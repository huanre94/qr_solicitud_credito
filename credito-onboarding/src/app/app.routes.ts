import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  // Onboarding V2 (Wireframe v2) - Controlado por Container con Signals
  {
    path: 'onboarding-v2',
    loadComponent: () => import('./features/onboarding-v2/container/onboarding-v2-container.component').then(m => m.OnboardingV2ContainerComponent)
  },
  {
    path: 'onboarding-v1',
    children: [
      {
        path: 'welcome',
        loadComponent: () => import('./features/onboarding-v1/pages/welcome/welcome.component').then(m => m.WelcomeComponent)
      },
      {
        path: 'identity',
        loadComponent: () => import('./features/onboarding-v1/pages/identity/identity.component').then(m => m.IdentityComponent)
      },
      {
        path: 'address',
        loadComponent: () => import('./features/onboarding-v1/pages/address/address.component').then(m => m.AddressComponent)
      },
      {
        path: 'references',
        loadComponent: () => import('./features/onboarding-v1/pages/references/references.component').then(m => m.ReferencesComponent)
      },
      {
        path: 'employment',
        loadComponent: () => import('./features/onboarding-v1/pages/employment/employment.component').then(m => m.EmploymentComponent)
      },
      {
        path: 'contact-info',
        loadComponent: () => import('./features/onboarding-v1/pages/contact-info/contact-info.component').then(m => m.ContactInfoComponent)
      },
      {
        path: 'processing',
        loadComponent: () => import('./features/onboarding-v1/pages/processing/processing.component').then(m => m.ProcessingComponent)
      },
      {
        path: 'verification',
        loadComponent: () => import('./features/onboarding-v1/pages/verification/verification.component').then(m => m.VerificationComponent)
      }
    ]
  },
  // Onboarding V3 (Hybrid Process - Escenario 2) - Controlado por Container con Signals
  {
    path: 'onboarding-v3',
    loadComponent: () => import('./features/onboarding-v3/container/onboarding-v3-container.component').then(m => m.OnboardingV3ContainerComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
