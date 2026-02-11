# Onboarding V2 - Flujo de Crédito

Este documento describe el flujo completo de onboarding V2 implementado según el wireframe proporcionado.

## 📋 Descripción General

El onboarding V2 es un flujo de 6 pantallas para solicitar y activar una línea de crédito. Incluye validación de identidad, evaluación crediticia, presentación de oferta y firma digital.

## 🎯 Pantallas Implementadas

### Pantalla 0: Entrada/Contexto (`entry-v2`)
**Ruta:** `/onboarding-v2/entry`

**Funcionalidad:**
- Presentación inicial de los beneficios del servicio
- 3 tarjetas de beneficios con iconos
- Botón CTA para iniciar el proceso

**Características:**
- Sin formularios ni validaciones
- Diseño limpio con gradiente morado
- Navegación a pantalla de identidad

---

### Pantalla 1: Identidad + KYC (`identity-v2`)
**Ruta:** `/onboarding-v2/identity`

**Funcionalidad:**
- Captura de número de documento
- 3 checkboxes de consentimientos obligatorios
- Simulación de validación KYC (2 segundos)
- Navegación a datos personales

**Validaciones:**
- Documento: Requerido, solo números, mínimo 6 dígitos
- Consentimientos: Los 3 deben estar marcados

**Características:**
- Loading state durante validación KYC
- Formulario reactivo con validators
- Transición suave entre estados

---

### Pantalla 2: Datos Personales (`personal-data-v2`)
**Ruta:** `/onboarding-v2/personal-data`

**Funcionalidad:**
- Presentación de datos pre-poblados (bloqueados)
- Campos editables: email, teléfono, dirección, ciudad
- Confirmación de información
- Navegación a evaluación crediticia

**Validaciones:**
- Email: Formato válido requerido
- Teléfono: Solo números, 10 dígitos
- Dirección: Requerida, longitud mínima
- Ciudad: Requerida

**Características:**
- Campos pre-poblados no editables (nombre, documento, fecha de nacimiento)
- Indicadores visuales de campos bloqueados vs editables
- Botón "Volver" funcional

---

### Pantalla 3: Evaluación Crediticia (`evaluation-v2`)
**Ruta:** `/onboarding-v2/evaluation`

**Funcionalidad:**
- Pantalla de carga con mensajes rotativos
- Simulación de evaluación crediticia (6 segundos)
- Auto-navegación a pantalla de oferta
- 3 mensajes que rotan cada 2 segundos

**Mensajes:**
1. "Verificando tu información..."
2. "Analizando tu historial crediticio..."
3. "Preparando tu oferta personalizada..."

**Características:**
- Sin interacción del usuario
- Spinner animado
- Navegación automática al completar

---

### Pantalla 4: Oferta de Crédito (`offer-v2`)
**Ruta:** `/onboarding-v2/offer`

**Funcionalidad:**
- Presentación de línea de crédito aprobada
- Detalles de la oferta (monto, cuota, tasa, plazo)
- Sección de condiciones colapsable
- Aceptación de oferta

**Información Mostrada:**
- Monto aprobado: $5,000,000 COP
- Cuota mensual: $450,000 COP
- Tasa de interés: 2.5% E.A.
- Plazo: 12 meses

**Características:**
- Tarjeta con gradiente destacado
- 4 condiciones colapsables
- Ícono de éxito (check verde)
- Navegación a firma digital

---

### Pantalla 5: Firma Digital y Activación (`signature-v2`)
**Ruta:** `/onboarding-v2/signature`

**Funcionalidad:**
- Resumen de crédito aprobado
- Selección de método OTP (SMS o Email)
- Envío y validación de código OTP
- Aceptación de términos y condiciones
- Activación de línea de crédito

**Métodos de firma:**
- Código OTP por SMS
- Código OTP por Email

**Validaciones:**
- Código OTP: 6 dígitos numéricos requeridos
- Términos: Checkbox obligatorio
- **OTP de prueba:** `123456`

**Flujo:**
1. Usuario selecciona método (SMS/Email)
2. Click en "Enviar código"
3. Ingresa código de 6 dígitos
4. Acepta términos
5. Click en "Activar línea de crédito"
6. Navegación a pantalla de éxito

---

### Pantalla 6: Éxito (`success-v2`)
**Ruta:** `/onboarding-v2/success`

**Funcionalidad:**
- Confirmación de activación exitosa
- Detalles finales del crédito
- Próximos pasos (3 items)
- Descarga de contrato (simulado)
- Navegación a inicio

**Características:**
- Animación de checkmark con confetti
- Tarjeta de crédito con badge "Activa y disponible"
- 3 cards de próximos pasos con iconos
- Info de soporte 24/7

**Acciones:**
- Descargar contrato (simulado)
- Ir a mi cuenta (redirección a home)

---

## 🎨 Diseño y Estilos

### Tema de colores
- **Gradiente principal:** `#667eea` → `#764ba2` (morado)
- **Éxito:** `#7ED321` (verde)
- **Error:** `#FF6B6B` (rojo)
- **Fondo:** `#F8F9FA` (gris claro)

### Responsive
- Breakpoints: xs, sm, md, lg, xl, xxl
- Mobile-first approach
- Ajustes automáticos de padding, tamaño de fuente y layout

### Componentes reutilizables
- Logo header (todas las pantallas)
- Indicadores de progreso personalizados
- Botones con gradiente y estados hover
- Cards con sombras y bordes redondeados

---

## 🔄 Gestión de Estado

### Servicio: `OnboardingV2Service`

**Datos almacenados:**
```typescript
{
  session: OnboardingSessionV2,
  identity?: IdentityData,
  consents?: Consents,
  kyc?: KYCData,
  personalData?: PersonalData,
  creditEvaluation?: CreditEvaluation,
  digitalSignature?: DigitalSignature
}
```

**Métodos principales:**
- `startOnboarding()` - Inicia el flujo
- `updateIdentity()` - Guarda datos de identidad
- `updatePersonalData()` - Guarda datos personales
- `updateCreditEvaluation()` - Guarda resultado de evaluación
- `updateDigitalSignature()` - Guarda firma digital
- `getData()` - Obtiene todos los datos (read-only)

**Uso de signals:**
- Estado reactivo con Angular signals
- Read-only accessors para prevenir mutaciones
- Actualizaciones inmutables con `update()`

---

## 🧪 Testing

### Datos de prueba

**Documento:** Cualquier número de 6+ dígitos (ej: `1234567890`)

**Código OTP válido:** `123456`

**Datos pre-poblados:**
- Nombre: Juan Pérez
- Fecha de nacimiento: 15/03/1990
- Email: juan.perez@ejemplo.com
- Teléfono: 3001234567

**Oferta generada:**
- Monto: $5,000,000
- Cuota: $450,000
- Tasa: 2.5%
- Plazo: 12 meses

---

## 🚀 Navegación

### Flujo completo:
```
/onboarding-v2/entry (Inicio)
    ↓
/onboarding-v2/identity (Identidad + KYC)
    ↓
/onboarding-v2/personal-data (Datos Personales)
    ↓
/onboarding-v2/evaluation (Evaluación - Auto)
    ↓
/onboarding-v2/offer (Oferta de Crédito)
    ↓
/onboarding-v2/signature (Firma Digital)
    ↓
/onboarding-v2/success (¡Éxito!)
    ↓
/ (Home)
```

### Redirección por defecto:
- Ruta raíz (`/`) redirige a `/onboarding-v2/entry`
- Rutas inválidas redirigen a entry

---

## 📁 Estructura de Archivos

```
src/app/
├── features/
│   └── onboarding-v2/
│       └── pages/
│           ├── entry-v2/
│           │   ├── entry-v2.component.ts
│           │   ├── entry-v2.component.html
│           │   └── entry-v2.component.scss
│           ├── identity-v2/
│           ├── personal-data-v2/
│           ├── evaluation-v2/
│           ├── offer-v2/
│           ├── signature-v2/
│           └── success-v2/
├── core/
│   └── onboarding-v2.service.ts
├── domain/
│   └── models/
│       └── onboarding-v2.model.ts
└── styles/
    ├── _variables.scss
    ├── _mixins.scss
    └── _global.scss
```

---

## 🛠️ Tecnologías

- **Framework:** Angular 19
- **Componentes:** Standalone components
- **Formularios:** Reactive Forms
- **Estilos:** SCSS con @use modules
- **Estado:** Angular Signals
- **Navegación:** Angular Router (lazy loading)

---

## 📝 Notas de Implementación

### Validaciones simuladas
- KYC: Timeout de 2 segundos
- Evaluación: Timeout de 6 segundos con mensajes rotativos
- OTP: Validación local con código hardcoded `123456`

### Producción
En un entorno real, se requeriría:
- Integración con API backend para KYC
- Servicio de scoring crediticio real
- Envío real de OTP por SMS/Email
- Generación y descarga de PDF de contrato
- Persistencia de datos en base de datos
- Manejo de errores y casos edge

---

## ✅ Checklist de Funcionalidades

- [x] Pantalla 0: Entry/Contexto
- [x] Pantalla 1: Identidad + KYC
- [x] Pantalla 2: Datos Personales
- [x] Pantalla 3: Evaluación Crediticia
- [x] Pantalla 4: Oferta de Crédito
- [x] Pantalla 5: Firma Digital + OTP
- [x] Pantalla 6: Éxito/Completación
- [x] Servicio de estado (OnboardingV2Service)
- [x] Modelos de datos (TypeScript interfaces)
- [x] Rutas configuradas (lazy loading)
- [x] Estilos SCSS centralizados
- [x] Validaciones de formularios
- [x] Navegación entre pantallas
- [x] Diseño responsive
- [x] Animaciones y transiciones

---

## 🎯 Próximas Mejoras

- [ ] Tests unitarios (Jest/Jasmine)
- [ ] Tests e2e (Cypress/Playwright)
- [ ] Integración con API backend
- [ ] Manejo de errores global
- [ ] Internacionalización (i18n)
- [ ] Accesibilidad (ARIA labels)
- [ ] Performance optimization
- [ ] Analytics tracking

---

**Versión:** 2.0  
**Última actualización:** 2024  
**Mantenedor:** Equipo de Desarrollo
