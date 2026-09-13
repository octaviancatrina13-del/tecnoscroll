---
title: "Amazon Bedrock abre nuevas puertas para agentes de IA en producción"
teaser: "Amazon anuncia instancias de runtime persistentes que permiten ejecutar agentes de IA durante semanas con soporte GPU."
category: "ia"
pubDate: "2026-08-06T22:58:00.000Z"
image:
  url: "https://images.unsplash.com/photo-1778922286590-5cc0bcba34ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8YXdzJTIwYXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZSUyMHRlY2hub2xvZ3l8ZW58MXwwfHx8MTc4OTMwNTA5NXww&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "Female speaker presenting in front of a projector screen"
  credit: "Foto de Poddar Group of Institutions en Unsplash"
  creditUrl: "https://unsplash.com/photos/female-speaker-presenting-in-front-of-a-projector-screen-d2wtxLJQbXA?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "AWS News"
  url: "https://aws.amazon.com/blogs/aws/runtime-instances-persistent-compute-for-production-ai-agents-on-amazon-bedrock-agentcore/"
tags: ["aws", "bedrock", "agentes ia", "producción", "infraestructura"]
draft: false
---
Amazon Web Services ha anunciado una nueva funcionalidad en Bedrock AgentCore llamada runtime instances, que cambia el juego para desarrolladores que despliegan agentes de IA en entornos de producción.

Hasta ahora, cuando los agentes necesitaban ejecutarse durante días, acceder a GPUs o coordinar múltiples agentes simultáneamente, los desarrolladores tenían que construir y gestionar la infraestructura manualmente: provisionar instancias EC2, configurar redes, manejar escalado y monitoreo. Las nuevas runtime instances automatizan todo eso.

La novedad permite ejecutar múltiples agentes en una sola instancia con sessiones que persisten hasta 14 días. Cada agente mantiene sus propias dependencias, pueden colaborar compartiendo el sistema de ficheros y acceder a aceleración GPU para tareas intensivas. El servicio también soporta hibernación —pausar el trabajo y reanudar días después con todo intacto— para optimizar costes.

Los desarrolladores pueden usar cualquier framework (CrewAI, LangGraph, LlamaIndex, Strands) y el modelo que prefieran. El empaquetado es minimal: solo una anotación @app.entrypoint y un archivo zip o imagen de contenedor.

Las runtime instances son complementarias a las microVMs existentes de Bedrock. Un agente orquestador ligero en microVMs puede delegar trabajo especializado a agentes en instancias persistentes, mientras que estas últimas ejecutan tareas complejas que requieren estado persistente y acceso al sistema operativo.
