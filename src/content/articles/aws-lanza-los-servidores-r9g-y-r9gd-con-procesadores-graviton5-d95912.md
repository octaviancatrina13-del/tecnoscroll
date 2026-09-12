---
title: "AWS lanza los servidores R9g y R9gd con procesadores Graviton5"
teaser: "Amazon pone a disposición de todos sus nuevas instancias optimizadas en memoria con un 25% más de rendimiento."
category: "chips"
pubDate: "2026-08-31T19:53:34.000Z"
image:
  url: "https://images.unsplash.com/photo-1778922286590-5cc0bcba34ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8YXdzJTIwbWljcm9jaGlwJTIwcHJvY2Vzc29yfGVufDF8MHx8fDE3ODkyMzQzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "Female speaker presenting in front of a projector screen"
  credit: "Foto de Poddar Group of Institutions en Unsplash"
  creditUrl: "https://unsplash.com/photos/female-speaker-presenting-in-front-of-a-projector-screen-d2wtxLJQbXA?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "AWS News"
  url: "https://aws.amazon.com/blogs/aws/amazon-ec2-r9g-and-r9gd-instances-powered-by-aws-graviton5-processors-are-now-generally-available/"
tags: ["aws", "graviton5", "ec2", "procesadores", "cloud"]
draft: false
---
Amazon ha anunciado la disponibilidad general de sus instancias EC2 R9g y R9gd, equipadas con los procesadores AWS Graviton5. Se trata de una generación mejorada respecto a los anteriores R8g, ofreciendo un rendimiento computacional hasta un 25% superior por vCPU, con un consumo energético más eficiente que cualquier procesador que AWS haya desarrollado hasta ahora.

Ambas líneas de instancias están pensadas para cargas de trabajo intensivas en memoria: bases de datos, cachés en memoria (Valkey, Redis, MemCached), análisis de datos en tiempo real y aplicaciones containerizadas basadas en Kubernetes o Docker. Los R9gd incluyen además almacenamiento local NVMe-SSD de baja latencia, ideal para sistemas distribuidos que requieren acceso rápido a datos temporales.

Las mejoras hardware del Graviton5 respecto a la generación anterior incluyen memoria DDR5 a 8800 MT/s (frente a 5600 MT/s en Graviton4), un caché L3 cinco veces mayor y hasta el doble de ancho de banda de red y EBS. Para los modelos de mayor tamaño, la velocidad de red alcanza 100 Gbps y EBS llega a 72 Gbps.

Ambas líneas incorporan el Nitro Isolation Engine, un componente de seguridad que emplea verificación formal para garantizar matemáticamente el aislamiento entre máquinas virtuales. Amazon destaca que es el primer hipervisor en cloud con verificación formal certificada.

Las instancias están disponibles en 11 tamaños, desde medium hasta metal-48xl, y se pueden desplegar en regiones de EE.UU. y Frankfurt. La migración desde R8g es sencilla: la mayoría de aplicaciones no requiere cambios de código.
