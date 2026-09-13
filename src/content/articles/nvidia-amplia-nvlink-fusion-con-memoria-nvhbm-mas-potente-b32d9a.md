---
title: "NVIDIA amplía NVLink Fusion con memoria NVHBM más potente"
teaser: "NVIDIA introduce una memoria de alto rendimiento diseñada para optimizar los chips de IA de próxima generación."
category: "chips"
pubDate: "2026-08-26T21:05:30.000Z"
image:
  url: "https://images.unsplash.com/photo-1716967318503-05b7064afa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8bnZpZGlhJTIwbWljcm9jaGlwJTIwcHJvY2Vzc29yfGVufDF8MHx8fDE3ODkzMDQ5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "the nvidia logo is displayed on a table"
  credit: "Foto de Mariia Berezovsky en Unsplash"
  creditUrl: "https://unsplash.com/photos/the-nvidia-logo-is-displayed-on-a-table-0SqsTxWhgNU?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "NVIDIA Blog"
  url: "https://blogs.nvidia.com/blog/nvlink-fusion-nvhbm-custom-high-bandwidth-memory/"
tags: ["nvidia", "nvhbm", "memoria", "ia", "aws"]
draft: false
---
NVIDIA ha presentado NVHBM, una nueva tecnología de memoria de alto ancho de banda que forma parte de su expansión de NVLink Fusion, su plataforma para que proveedores de nube construyan infraestructuras de IA personalizadas.

La arquitectura de NVHBM integra el controlador de memoria directamente en la pila HBM en lugar de en el chip principal, lo que libera espacio valioso para más circuitería de procesamiento. Según NVIDIA, esto resulta en un 30% más de ancho de banda de memoria, un 15% menos de consumo energético en la memoria y hasta un 25% adicional de área disponible en el chip de procesamiento comparado con la memoria HBM4E estándar.

El cambio de diseño busca resolver uno de los cuellos de botella en sistemas de IA actuales: los controladores de memoria consumían demasiado espacio en los chips principales que podría dedicarse a computación. Con NVHBM, ese problema se traslada a la propia memoria.

NVIDIA está estableciendo un estándar común que múltiples fabricantes de memoria podrán implementar, lo que simplifica la integración para clientes que deseen crear chips personalizados sin reinventar la rueda en cada ocasión.

Amazon será el primer socio en adoptar NVHBM. Su unidad Annapurna Labs trabajará con NVIDIA para integrar esta memoria en sus próximos chips Trainium4, permitiendo que los procesadores de Amazon trabajen conjuntamente con GPUs de NVIDIA bajo la misma arquitectura de rack.
