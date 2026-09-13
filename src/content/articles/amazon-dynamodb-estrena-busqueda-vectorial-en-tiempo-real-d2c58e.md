---
title: "Amazon DynamoDB estrena búsqueda vectorial en tiempo real"
teaser: "AWS lanza búsqueda semántica nativa en DynamoDB sin necesidad de bases de datos separadas."
category: "software"
pubDate: "2026-08-05T14:45:10.000Z"
image:
  url: "https://images.pexels.com/photos/34803998/pexels-photo-34803998.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  alt: "Focused view of a computer screen displaying programming code with visible reflections."
  credit: "Foto de Daniil Komov en Pexels"
  creditUrl: "https://www.pexels.com/photo/close-up-of-computer-screen-with-code-and-reflection-34803998/"
  provider: "pexels"
source:
  name: "AWS News"
  url: "https://aws.amazon.com/blogs/aws/amazon-dynamodb-now-supports-real-time-vector-search-at-any-scale/"
tags: ["dynamodb", "aws", "ia", "vectores", "bases de datos"]
draft: false
---
Amazon ha anunciado la disponibilidad general de búsqueda vectorial en DynamoDB, su servicio de base de datos NoSQL. La novedad permite almacenar embeddings de vectores directamente en DynamoDB y realizar búsquedas de similitud sobre esos datos sin necesidad de replicarlos a un almacén vectorial separado.

La solución ofrece latencia en milisegundos de un solo dígito con un recall superior al 99%, y está diseñada para cualquier escala, incluso con billones de vectores. Se trata de un servicio completamente serverless sin necesidad de provisionar, parchear ni gestionar servidores, ni instalar software.

Hasta ahora, agregar búsqueda vectorial a aplicaciones que ya usan DynamoDB requería copiar datos a una base de datos vectorial dedicada y mantener una tubería de sincronización entre ambos servicios. Esto añadía complejidad operativa, costes de movimiento de datos y gastos de licencia. Con esta nueva función, los vectores y los datos operativos comparten la misma infraestructura serverless y el modelo de precios por solicitud.

La función introduce un nuevo tipo de índice que se crea sobre un atributo que almacena embeddings. Los usuarios pueden generar embeddings usando modelos como Amazon Bedrock Titan Text Embeddings, Cohere Embed u OpenAI, y almacenarlos como listas de números en la tabla. Luego crean un índice vectorial especificando dimensiones, función de distancia (euclidiana, coseno o producto punto) y atributos opcionales para filtrar resultados.

DynamoDB soporta hasta 4.096 dimensiones y filtrado en línea, escalando automáticamente sin infraestructura que gestionar.
