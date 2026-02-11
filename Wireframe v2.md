📄 Documento de Wireframes Textuales

Onboarding – Línea de Crédito (Autoservicio)

Metadatos generales

Duración objetivo: ≤ 10 minutos

Canal: Web responsive (QR / short URL)

Dispositivo: Móvil (primario), Desktop (secundario)

Sesión: onboarding_session_id obligatorio

Estado global: DRAFT | IN_PROGRESS | COMPLETED | FAILED

Layout base (todas las pantallas)
--------------------------------------------------
[Logo]                         [Progreso 2/6]
--------------------------------------------------
[Título principal]

[Descripción corta]

[Contenido dinámico]

--------------------------------------------------
[Botón primario]
[Botón secundario opcional]
--------------------------------------------------


Progreso siempre visible

Botón primario sticky

Nunca más de 1 acción principal

🧩 Pantalla 0 — Entrada / Contexto
Objetivo

Reducir fricción inicial y preparar al usuario.

Wireframe textual
Título:
Obtén tu línea de crédito en minutos

Descripción:
• Sin papeleo
• Uso en múltiples comercios
• Resultado inmediato

[ Comenzar ]

Reglas UX

No formularios

No términos legales aquí

Acción

POST /onboarding/start

🧩 Pantalla 1 — Identidad + Consentimientos
Objetivo

Desbloquear consultas externas y cumplir normativa.

Wireframe textual
Título:
Verifiquemos tu identidad

Campo:
[ Tipo de documento ▼ ]
[ Número de documento ]

Sección:
☐ Autorizo el uso de mis datos personales
☐ Autorizo la consulta en burós de crédito
☐ Acepto el uso de firma electrónica

Sección KYC:
[ Tomar selfie ]
[ Capturar documento ]

[ Continuar ]

Validaciones

Checkboxes obligatorios

Documento válido por regex

KYC = SUCCESS

Estados

LOADING: “Verificando identidad…”

ERROR: mensaje claro + retry

🧩 Pantalla 2 — Confirmación de datos personales
Objetivo

Confirmar información prellenada.

Wireframe textual
Título:
Confirma tus datos

Sección: Datos personales
[ Nombre completo      ] (bloqueado)
[ Fecha de nacimiento  ] (bloqueado)

Sección: Contacto
[ Teléfono ] (editable)
[ Email    ] (editable)

Sección: Dirección
[ Dirección principal ] (editable)
[ Ciudad ] (bloqueado)

[ Confirmar y continuar ]

Indicadores

Badge: “Sugerido”

Tooltip: “Obtenido de fuentes externas”

Reglas

Máx. 6 campos visibles

Scroll mínimo

🧩 Pantalla 3 — Evaluación crediticia (transición)
Objetivo

Ocultar complejidad del scoring.

Wireframe textual
Título:
Estamos evaluando tu solicitud

Loader animado

Texto dinámico:
• Validando información
• Calculando tu línea de crédito
• Confirmando elegibilidad

Tiempo

5–10 segundos

Timeout controlado

Acción

POST /credit/evaluate

🧩 Pantalla 4 — Oferta de línea de crédito
Objetivo

Decisión rápida y clara.

Wireframe textual
Título:
Tu línea de crédito está lista

Card principal:
Monto aprobado: $X.XXX
Cuota estimada: $XXX / mes
Uso: Múltiples comercios

Texto colapsable:
Ver condiciones ▼

[ Aceptar línea de crédito ]

Reglas

1 oferta principal

No sliders

No negociación

🧩 Pantalla 5 — Firma digital y activación
Objetivo

Cierre contractual inmediato.

Wireframe textual
Título:
Activa tu línea de crédito

Resumen:
• Monto aprobado
• Tasa
• Plazo

Método de firma:
(•) Código OTP por SMS
( ) Email

[ Enviar código ]

[ Código OTP ]

[ Firmar y activar ]

Resultado OK
🎉 Línea de crédito activada

Ya puedes usarla en comercios afiliados.

[ Finalizar ]
