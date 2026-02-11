import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  // Onboarding V2 (Wireframe v2)
  {
    path: 'onboarding-v2',
    children: [
      {
        path: 'entry',
        loadComponent: () => import('./features/onboarding-v2/pages/entry-v2/entry-v2.component').then(m => m.EntryV2Component)
      },
      {
        path: 'identity',
        loadComponent: () => import('./features/onboarding-v2/pages/identity-v2/identity-v2.component').then(m => m.IdentityV2Component)
      },
      {
        path: 'personal-data',
        loadComponent: () => import('./features/onboarding-v2/pages/personal-data-v2/personal-data-v2.component').then(m => m.PersonalDataV2Component)
      },
      {
        path: 'evaluation',
        loadComponent: () => import('./features/onboarding-v2/pages/evaluation-v2/evaluation-v2.component').then(m => m.EvaluationV2Component)
      },
      {
        path: 'offer',
        loadComponent: () => import('./features/onboarding-v2/pages/offer-v2/offer-v2.component').then(m => m.OfferV2Component)
      },
      {
        path: 'signature',
        loadComponent: () => import('./features/onboarding-v2/pages/signature-v2/signature-v2.component').then(m => m.SignatureV2Component)
      },
      {
        path: 'success',
        loadComponent: () => import('./features/onboarding-v2/pages/success-v2/success-v2.component').then(m => m.SuccessV2Component)
      }
    ]
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
  {
    path: '**',
    redirectTo: ''
  }
];
