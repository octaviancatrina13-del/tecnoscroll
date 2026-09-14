---
title: "Amazon SQS celebra 20 años como servicio de mensajería imprescindible"
teaser: "AWS recuerda dos décadas de evolución de su servicio de colas de mensajes, desde sus orígenes hasta las últimas mejoras en 2025."
category: "software"
pubDate: "2026-07-13T18:13:57.000Z"
image:
  url: "https://images.unsplash.com/photo-1632813405743-ab79b1d3d98b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8YW1hem9uJTIwc29mdHdhcmUlMjBjb2RlJTIwc2NyZWVufGVufDF8MHx8fDE3ODkzNTc2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "a computer screen with a website on it"
  credit: "Foto de Marques Thomas en Unsplash"
  creditUrl: "https://unsplash.com/photos/a-computer-screen-with-a-website-on-it-hO5s1nSEMSc?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "AWS News"
  url: "https://aws.amazon.com/blogs/aws/amazon-sqs-turns-20-two-decades-of-reliable-messaging-at-scale/"
tags: ["amazon", "aws", "sqs", "cloud", "servicios web"]
draft: false
---
Hace exactamente dos décadas, el 13 de julio de 2006, Amazon lanzaba Simple Queue Service (SQS) como uno de los primeros tres servicios de AWS, junto a EC2 y S3. La idea era fundamental: resolver un problema crítico en sistemas distribuidos donde los componentes necesitaban comunicarse sin depender directamente unos de otros.

La solución fue la asincronía. Un servicio productor podía dejar mensajes en una cola y continuar, mientras otro los consumía cuando estuviera listo. Si algún componente fallaba o era lento, el sistema completo no se hundía. Dos décadas después, esa filosofía sigue siendo el corazón de SQS.

En los últimos cinco años, las mejoras han sido sustanciales. En 2021, SQS introdujo cifrado servidor con claves gestionadas por Amazon (SSE-SQS) que se convirtió en estándar automático al año siguiente. Las colas FIFO ganaron un "modo de alto rendimiento" que multiplicó por 350 su capacidad máxima, llegando a 70.000 transacciones por segundo en noviembre de 2023.

Otras adiciones notables incluyen soporte para control de acceso basado en atributos (ABAC) en 2022, protocolo JSON que reduce la latencia hasta un 23% en 2023, e integración directa con EventBridge Pipes. En 2024 llegó una librería extendida para Python que permite enviar mensajes de hasta 2 GB.

Lo más reciente es notable: en 2025, Amazon subió el tamaño máximo de mensaje de 256 KB a 1 MB y creó "fair queues" para evitar que un único inquilino monopolice recursos en sistemas multiusuario.

Ahora, SQS también soporta cargas de IA: buffers para modelos de lenguaje, coordinación de agentes autónomos, y gestión de interferencia en sistemas de inferencia.
