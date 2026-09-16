---
title: "Universidades británicas usan IA de NVIDIA para predecir la contaminación"
teaser: "Investigadores de Mánchester aprovechan la IA generativa para pronosticar la calidad del aire en el Reino Unido."
category: "ia"
pubDate: "2026-09-16T05:00:42.000Z"
image:
  url: "https://images.unsplash.com/photo-1716967318503-05b7064afa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8bnZpZGlhJTIwYXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZSUyMHRlY2hub2xvZ3l8ZW58MXwwfHx8MTc4OTU2NDM2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "the nvidia logo is displayed on a table"
  credit: "Foto de Mariia Berezovsky en Unsplash"
  creditUrl: "https://unsplash.com/photos/the-nvidia-logo-is-displayed-on-a-table-0SqsTxWhgNU?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "NVIDIA Blog"
  url: "https://blogs.nvidia.com/blog/uk-air-pollution-research-earth-2/"
tags: ["nvidia", "earth-2", "contaminacion", "ia", "supercomputador"]
draft: false
---
La contaminación atmosférica causa alrededor de 30.000 muertes anuales en el Reino Unido, según el blog de NVIDIA. Para atajar este problema, investigadores de la Universidad de Mánchester han encontrado una solución innovadora: utilizar modelos de IA abiertos de NVIDIA diseñados inicialmente para predicciones meteorológicas.

El profesor David Topping, del departamento de Ciencias de la Tierra y Medioambiente, lideró el proyecto junto al equipo de NVIDIA Earth-2. El reto principal era que los modelos de química tradicionales resultan costosos computacionalmente y demasiado lentos cuando se integran en sistemas meteorológicos. La solución fue adaptar los marcos generativos que NVIDIA ya usaba para previsiones climáticas al campo de la calidad del aire.

El equipo entrenó el modelo Earth-2 CorrDiff utilizando datos procedentes de simulaciones química-climáticas existentes en Isambard-AI, el supercomputador nacional de IA del Reino Unido ubicado en Bristol. El resultado fue un modelo capaz de predecir contaminación a escala nacional con una resolución de 2-3 kilómetros cuadrados. Lo más destacable: el entrenamiento completó en solo dos días.

Posteriormente añadieron Earth-2 StormCast, que permite realizar predicciones dependientes del tiempo usando datos reales de calidad del aire. El sistema funciona tanto en supercomputadores como en el DGX Spark, un ordenador de sobremesa con capacidades de IA, demostrando su versatilidad.

Entre las aplicaciones futuras está alertar a pacientes con asma sobre picos de contaminación, o integrar datos en tiempo real de dispositivos edge para respuestas inmediatas ante incendios forestales. El equipo planea liberar el código y datos abiertos para que otros países desarrollen modelos similares con sus propios datos locales.
