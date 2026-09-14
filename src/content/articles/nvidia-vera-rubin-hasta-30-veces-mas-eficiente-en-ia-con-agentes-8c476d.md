---
title: "NVIDIA Vera Rubin: hasta 30 veces más eficiente en IA con agentes"
teaser: "La nueva GPU de NVIDIA multiplica la eficiencia energética en tareas de IA con agentes, reduciendo costes radicalmente."
category: "chips"
pubDate: "2026-08-24T15:00:19.000Z"
image:
  url: "https://images.unsplash.com/photo-1716967318503-05b7064afa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8bnZpZGlhJTIwbWljcm9jaGlwJTIwcHJvY2Vzc29yfGVufDF8MHx8fDE3ODkzMjQ1Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "the nvidia logo is displayed on a table"
  credit: "Foto de Mariia Berezovsky en Unsplash"
  creditUrl: "https://unsplash.com/photos/the-nvidia-logo-is-displayed-on-a-table-0SqsTxWhgNU?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "NVIDIA Blog"
  url: "https://blogs.nvidia.com/blog/vera-rubin-nvl72-efficiency-ai-agents/"
tags: ["nvidia", "vera rubin", "gpu", "ia", "eficiencia energética"]
draft: false
---
NVIDIA ha presentado datos de rendimiento para su nueva arquitectura Vera Rubin NVL72, demostrando mejoras significativas en eficiencia energética para cargas de trabajo basadas en agentes de IA. Según la información publicada en el blog de NVIDIA, el nuevo sistema alcanza hasta 30 veces mayor rendimiento por megavatio que el modelo anterior GB300 NVL72 en estas tareas específicas.

La razón de esta mejora radical está en cómo funcionan los agentes de IA. A diferencia de un simple chat, estos sistemas deben ejecutar múltiples pasos consecutivos: consultar bases de datos, buscar información, invocar sub-agentes y sintetizar resultados. Según datos de OpenRouter citados por NVIDIA, los agentes de IA consumen 15 veces más tokens que una conversación convencional, porque cada paso genera entrada para el siguiente, acumulando contexto progresivamente.

Los nuevos datos fueron medidos usando la prueba SemiAnalysis AgentX, que replica sesiones reales de programación asistida por IA. NVIDIA señala que Vera Rubin logra rendimiento superior en modelos como DeepSeek V4 Pro, Qwen3.5 y otros. Además, la arquitectura reduce el costo por millón de tokens hasta 35 veces comparado con GB300 NVL72.

Para lograrlo, NVIDIA ha optimizado cada aspecto: separación de procesamiento de contexto y generación de respuestas, técnicas de caché distribuido, cuantización de 4 bits y mejoras en sus núcleos Tensor de quinta generación. La tecnología NVLink, en su sexta versión, proporciona interconexión 10 veces más rápida que Ethernet convencional.

En data centers con restricciones de energía, esto traduce en ejecutar significativamente más trabajo de IA con el mismo consumo eléctrico.
