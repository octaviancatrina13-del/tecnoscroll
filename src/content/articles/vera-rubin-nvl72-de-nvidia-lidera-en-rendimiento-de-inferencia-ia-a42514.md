---
title: "Vera Rubin NVL72 de NVIDIA lidera en rendimiento de inferencia IA"
teaser: "La nueva arquitectura de NVIDIA multiplica por 3,7 la velocidad en procesamiento de IA respecto a su generación anterior."
category: "chips"
pubDate: "2026-09-16T15:00:48.000Z"
image:
  url: "https://images.unsplash.com/photo-1716967318503-05b7064afa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8bnZpZGlhJTIwbWljcm9jaGlwJTIwcHJvY2Vzc29yfGVufDF8MHx8fDE3ODk1ODY2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "the nvidia logo is displayed on a table"
  credit: "Foto de Mariia Berezovsky en Unsplash"
  creditUrl: "https://unsplash.com/photos/the-nvidia-logo-is-displayed-on-a-table-0SqsTxWhgNU?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "NVIDIA Blog"
  url: "https://blogs.nvidia.com/blog/vera-rubin-nvl72-mlperf-inference/"
tags: ["nvidia", "vera-rubin", "ia", "gpu", "inferencia"]
draft: false
---
NVIDIA ha presentado resultados de su nuevo sistema Vera Rubin NVL72 en los últimos benchmarks de rendimiento de inferencia de IA (MLPerf Inference v6.1). Según el blog de NVIDIA, el nuevo hardware logra velocidades de procesamiento hasta 3,7 veces superior al GB300 NVL72 en modelos como Qwen3-VL, y 2,5 veces más rápido en el modelo DeepSeek-R1.

El salto de rendimiento proviene de una combinación de mejoras en hardware y software. El Vera Rubin incorpora Tensor Cores mejorados y un Transformer Engine reforzado que aceleran tanto la fase de prefill como la de decodificación durante la inferencia. Además, utiliza una nueva precisión llamada NVFP4 que reduce la memoria necesaria sin perder apenas calidad.

Lo interesante es que NVIDIA ha demostrado que su infraestructura escala de forma eficiente. Un sistema con 288 GPUs repartidas en cuatro racks alcanzó un 99% de eficiencia de escalado, lo que significa que al añadir hardware, el rendimiento crece proporcionalmente sin desperdiciar recursos.

Por otro lado, el GB300 NVL72 también destaca por su eficiencia en escalado múltiple. Desde un rack individual hasta cuatro racks, la velocidad de procesamiento crece casi linealmente, algo crucial en data centers reales donde los costes importan.

NVIDIA también subraya que la innovación continúa: las optimizaciones de software entre versiones de MLPerf han entregado hasta 1,6 veces más rendimiento, con mejoras posteriores aún en desarrollo.
