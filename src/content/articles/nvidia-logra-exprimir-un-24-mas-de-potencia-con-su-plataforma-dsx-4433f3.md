---
title: "NVIDIA logra exprimir un 24% más de potencia con su plataforma DSX"
teaser: "Una nueva plataforma de NVIDIA permite extraer más rendimiento de los centros de datos de IA sin aumentar el consumo de electricidad."
category: "chips"
pubDate: "2026-09-15T16:55:59.000Z"
image:
  url: "https://images.unsplash.com/photo-1716967318503-05b7064afa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8bnZpZGlhJTIwbWljcm9jaGlwJTIwcHJvY2Vzc29yfGVufDF8MHx8fDE3ODk1MDA4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "the nvidia logo is displayed on a table"
  credit: "Foto de Mariia Berezovsky en Unsplash"
  creditUrl: "https://unsplash.com/photos/the-nvidia-logo-is-displayed-on-a-table-0SqsTxWhgNU?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "NVIDIA Blog"
  url: "https://blogs.nvidia.com/blog/from-megawatts-to-tokens-how-nvidia-maximizes-ai-factory-production/"
tags: ["nvidia", "dsx", "ia", "eficiencia energética", "centros datos"]
draft: false
---
NVIDIA ha presentado DSX, una plataforma integral diseñada para maximizar la eficiencia de los centros de datos especializados en IA. El objetivo es directo: obtener más trabajo con la misma cantidad de energía disponible.

El punto de partida es que la potencia eléctrica es el cuello de botella principal en estas instalaciones. Por eso, NVIDIA ha desarrollado varias herramientas que actúan de manera coordinada. DSX MaxLPS monitoriza el consumo de energía en tiempo real a nivel de GPU y de bastidor, redistribuyendo la capacidad disponible según el tipo de carga de trabajo. De este modo, recupera capacidad que quedaría ociosa con sistemas tradicionales.

Según datos de Lambda, proveedor de computación en la nube, los resultados son convincentes. Al ejecutar 19 servidores dentro del mismo presupuesto de energía que normalmente requieren 16 nodos a potencia máxima, la plataforma consiguió aumentar el rendimiento de tokens en un 24%, pasando de aproximadamente 4 millones de tokens por segundo a 5 millones. La eficiencia energética mejoró un 23%.

Además, DSX Flex permite que los centros de datos respondan a señales de la red eléctrica, ralentizando o reprogramando trabajos no prioritarios mientras mantiene en marcha los servicios críticos. Un caso real en Silicon Valley demostró esta capacidad: reducir el consumo de 4 megavatios a 3 de forma automática más de 200 veces sin fallos.

NVIDIA proyecta que su plataforma podría permitir hasta un 40% más de capacidad de GPU en próximas generaciones manteniendo los mismos límites de potencia.
