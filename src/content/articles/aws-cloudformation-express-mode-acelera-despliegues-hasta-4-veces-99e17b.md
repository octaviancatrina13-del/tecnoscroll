---
title: "AWS CloudFormation Express mode acelera despliegues hasta 4 veces"
teaser: "AWS presenta un nuevo modo de despliegue que reduce el tiempo de infraestructura en desarrollo e IA."
category: "software"
pubDate: "2026-06-30T21:30:33.000Z"
image:
  url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8YXdzJTIwc29mdHdhcmUlMjBjb2RlJTIwc2NyZWVufGVufDF8MHx8fDE3ODkzOTczNzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "monitor showing Java programming"
  credit: "Foto de Ilya Pavlov en Unsplash"
  creditUrl: "https://unsplash.com/photos/monitor-showing-java-programming-OqtafYT5kTw?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "AWS News"
  url: "https://aws.amazon.com/blogs/aws/accelerate-your-infrastructure-deployments-by-up-to-4x-with-aws-cloudformation-express-mode/"
tags: ["aws", "cloudformation", "infraestructura", "deploy", "devops"]
draft: false
---
AWS ha lanzado CloudFormation Express mode, una nueva modalidad de despliegue diseñada para agilizar el trabajo de desarrolladores y herramientas de IA que iteran sobre infraestructura en la nube.

La novedad funciona de forma sencilla: en lugar de esperar a que CloudFormation complete todas las comprobaciones de estabilización después de aplicar la configuración de recursos, Express mode finaliza el despliegue en el momento en que la configuración se ha aplicado correctamente. Los recursos continúan estabilizándose en segundo plano, lo que reduce considerablemente el tiempo de espera.

Según AWS, los beneficios son especialmente notables en dos escenarios: desarrollo iterativo y producción donde la estabilización eventual es tolerable. Entre los ejemplos reales publicados, crear una cola SQS con dead letter queue tarda 64 segundos en modo estándar, pero solo 10 en Express mode. Eliminar una función Lambda con interfaz de red requiere 20-30 minutos convencionalmente, frente a 10 segundos con la nueva modalidad.

La activación es directa: se puede hacer desde la consola AWS, CLI, SDKs o herramientas como AWS CDK. Solo hay que establecer el parámetro `--deployment-config` en `EXPRESS` sin modificar plantillas existentes. Express mode deshabilita rollback por defecto para agilizar iteraciones, aunque se puede reactivar para entornos de producción.

El servicio ya está disponible en todas las regiones comerciales de AWS sin coste adicional. Funciona con cualquier plantilla CloudFormation existente y soporta todas las características, incluyendo change sets y stacks anidados.
