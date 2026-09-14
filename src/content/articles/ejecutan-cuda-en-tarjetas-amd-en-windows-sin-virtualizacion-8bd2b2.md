---
title: "Ejecutan CUDA en tarjetas AMD en Windows sin virtualizacion"
teaser: "Un desarrollador crea un script que permite usar aplicaciones exclusivas de NVIDIA en GPUs AMD en Windows puro."
category: "gadgets"
pubDate: "2026-09-14T14:23:12.000Z"
image:
  url: "https://images.pexels.com/photos/32300577/pexels-photo-32300577.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  alt: "Detailed shot of AMD Ryzen 7 9700X processor held against bright yellow background."
  credit: "Foto de Andrey Matveev en Pexels"
  creditUrl: "https://www.pexels.com/photo/close-up-of-amd-ryzen-7-9700x-processor-in-hand-32300577/"
  provider: "pexels"
source:
  name: "Tom's Hardware"
  url: "https://www.tomshardware.com/pc-components/gpu-drivers/solo-developer-wires-zluda-to-amds-hip-getting-multiple-cuda-libraries-running-on-a-radeon-rx-9060-xt-in-windows-cuda-exclusive-workloads-on-amd-hardware-in-windows-is-possible-without-virtualization-or-dual-booting"
tags: ["amd", "cuda", "zluda", "windows", "ia"]
draft: false
---
AMD lleva tiempo ampliando el soporte oficial de PyTorch y HIP SDK en Windows para GPUs de consumo como la serie RX 7000 y RX 9000. Sin embargo, existe un problema persistente: muchas herramientas de inteligencia artificial y aplicaciones especializadas están hardcodeadas exclusivamente para CUDA de NVIDIA, lo que deja a los usuarios de AMD sin opciones.

Un desarrollador ha creado un proyecto llamado "CUDA-for-AMD-Windows" que intenta resolver esto mediante un conjunto de scripts PowerShell automatizados. La herramienta actúa como puente entre ZLUDA (una capa de traducción que fue financiada por AMD en el pasado) y el SDK nativo ROCm de AMD.

El proyecto mapea automáticamente librerías CUDA como cuBLAS, cuSPARSE y cuFFT hacia sus equivalentes en AMD, sin necesidad de virtualización ni arranque dual. Como prueba de concepto, el autor logró entrenar una red de aprendizaje por refuerzo de 2,2 millones de parámetros usando librerías CUDA sin modificar en una Radeon RX 9060 XT, actualmente la única GPU soportada.

Según los datos documentados en el proyecto, la versión oficial alcanzó 13.278 pasos por segundo en un test de rendimiento, mientras que una versión alternativa obtuvo 12.876 SPS (3% más lenta). Hay limitaciones claras: librerías críticas como cuDNN, TensorRT y NCCL aún no funcionan, y esto es un proyecto de un solo desarrollador, no una solución empresarial. Aun así, demuestra que la barrera no es el hardware, sino las herramientas de traducción.
