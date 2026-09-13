---
title: "AWS Glue 6.0: 30% más barato y con soporte completo para Apache Iceberg"
teaser: "Amazon anuncia Glue 6.0 con mejoras de rendimiento, nuevo tipo de dato VARIANT y procesamiento en tiempo real con latencia de milisegundos."
category: "software"
pubDate: "2026-08-21T18:53:26.000Z"
image:
  url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8YXdzJTIwc29mdHdhcmUlMjBjb2RlJTIwc2NyZWVufGVufDF8MHx8fDE3ODkyNzA4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "monitor showing Java programming"
  credit: "Foto de Ilya Pavlov en Unsplash"
  creditUrl: "https://unsplash.com/photos/monitor-showing-java-programming-OqtafYT5kTw?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "AWS News"
  url: "https://aws.amazon.com/blogs/aws/aws-glue-6-0-now-available-with-30-lower-price-and-full-apache-iceberg-v3-support/"
tags: ["aws", "glue", "apache iceberg", "spark", "etl"]
draft: false
---
Amazon Web Services ha lanzado la versión general de AWS Glue 6.0, ofreciendo un ahorro de costes del 30% respecto a versiones anteriores y soporte íntegro para Apache Iceberg v3. La plataforma se ha reconstruido sobre una arquitectura modernizada: Apache Spark 4.1, Python 3.13 y Scala 2.13, lo que se traduce en mayor velocidad de procesamiento.

La novedad más destacable es el tipo de dato VARIANT con capacidad de fragmentación, que mejora significativamente la lectura de datos semiestructurados en comparación con columnas de texto tradicionales. Gracias a esta funcionalidad, es posible almacenar y consultar JSON, logs y datos de eventos sin necesidad de aplanar esquemas, evitando duplicaciones y problemas derivados de cambios en las estructuras de datos.

Iceberg v3 introduce además tipos Geometry y Geography para análisis GIS, timestamps con precisión de nanosegundos para IoT y cargas financieras de alta frecuencia, y manejo de esquemas desconocidos para mayor resiliencia ante cambios inesperados.

En el lado de Spark 4.1, destaca el nuevo sistema de pipelines declarativos que simplifica la creación de ETL permitiendo a ingenieros especificar qué datos deben parecer sin gestionar manualmente la orquestación. Las funciones Python UDF y UDTF basadas en Arrow eliminan sobrecarga de serialización y mejoran rendimiento, mientras que el modo de streaming en tiempo real logra latencias de un solo dígito en milisegundos para casos de uso sin estado.

La migración es sencilla: no requiere cambios en las APIs existentes. Los usuarios pueden seleccionar Glue 6.0 mediante el parámetro --glue-version disponible en consolas y CLI de AWS. El servicio ya está disponible en todas las regiones donde opera AWS Glue.
