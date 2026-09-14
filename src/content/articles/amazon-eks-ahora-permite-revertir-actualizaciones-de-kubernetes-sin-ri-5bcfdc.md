---
title: "Amazon EKS ahora permite revertir actualizaciones de Kubernetes sin riesgos"
teaser: "AWS añade un botón de deshacer para las actualizaciones de Kubernetes, permitiendo recuperarse de fallos en siete días."
category: "software"
pubDate: "2026-07-01T17:20:30.000Z"
image:
  url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8YXdzJTIwc29mdHdhcmUlMjBjb2RlJTIwc2NyZWVufGVufDF8MHx8fDE3ODkzOTczNzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "monitor showing Java programming"
  credit: "Foto de Ilya Pavlov en Unsplash"
  creditUrl: "https://unsplash.com/photos/monitor-showing-java-programming-OqtafYT5kTw?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "AWS News"
  url: "https://aws.amazon.com/blogs/aws/upgrade-amazon-eks-clusters-with-confidence-using-kubernetes-version-rollbacks/"
tags: ["aws", "kubernetes", "eks", "infraestructura", "actualizaciones"]
draft: false
---
Actualizar el plano de control de Kubernetes ha sido históricamente un proceso irreversible. Una vez completada la actualización, no había forma de volver atrás, lo que obligaba a las organizaciones a implementar mecanismos complejos como períodos de prueba prolongados y ciclos de actualización de meses. Esto ha generado que muchos equipos retrasen las actualizaciones de seguridad críticas por miedo a los problemas que puedan surgir.

Amazon EKS acaba de anunciar una nueva funcionalidad: la reversión de versiones de Kubernetes. Si algo sale mal tras actualizar a una nueva versión, los administradores pueden volver a la versión anterior en un plazo de siete días, sin necesidad de reconstruir el clúster ni solucionar problemas bajo presión.

## Cómo funciona la reversión

La reversión solo puede hacerse una versión menor a la vez, reflejando el mismo enfoque que EKS usa para las actualizaciones. Antes de revertir, EKS analiza automáticamente el estado del clúster a través de sus herramientas de análisis, identificando problemas de compatibilidad de nodos o dependencias de complementos. Si necesitas actuar rápido, existe un parámetro para saltarse esas comprobaciones.

Para clústeres que usan EKS Auto Mode (gestión completamente automatizada), la reversión se comporta de manera más sofisticada: nodos y plano de control se revierten juntos, respetando los presupuestos de interrupción de pods. AWS ha incluido una API de cancelación para detener cualquier reversión en progreso si consideras que está tomando demasiado tiempo.

La funcionalidad está disponible sin costes adicionales en todas las regiones comerciales de AWS donde funciona EKS. Solo pagas los gastos estándar de EKS y computación que ya incurrirías.
