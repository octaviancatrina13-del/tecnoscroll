---
title: "Creyó que Android se había roto, pero el culpable era una app modificada"
teaser: "Un usuario con Galaxy S25 FE descubrió que MicroG causaba un conflicto silencioso que devoraba batería sin razón aparente."
category: "moviles"
pubDate: "2026-09-15T14:00:12.000Z"
image:
  url: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDY0Mjc1fDB8MXxzZWFyY2h8MXx8YW5kcm9pZCUyMHNtYXJ0cGhvbmV8ZW58MXwwfHx8MTc4OTUzMDM1NHww&ixlib=rb-4.1.0&q=80&w=1080"
  alt: "green frog iphone case beside black samsung android smartphone"
  credit: "Foto de Denny Müller en Unsplash"
  creditUrl: "https://unsplash.com/photos/green-frog-iphone-case-beside-black-samsung-android-smartphone-HfWA-Axq6Ek?utm_source=tecnoscroll&utm_medium=referral"
  provider: "unsplash"
source:
  name: "Xataka Móvil"
  url: "https://www.xatakamovil.com/movil-y-sociedad/echo-culpa-a-ultima-actualizacion-porque-su-movil-ardia-no-duraba-bateria-culpable-era-app-modificada"
tags: ["android", "bateria", "whatsapp", "microg", "galaxy"]
draft: false
---
Cuando un móvil empieza a fallar, la culpa suele recaer en la última actualización. Sin embargo, el problema documentado recientemente en Xataka Móvil revela un escenario mucho más complejo: un usuario de Galaxy S25 FE notó que su teléfono se calentaba excesivamente y perdía batería de forma anómala incluso en reposo.

Tras analizar los registros con Battery Historian y revisar los ajustes nativos de Android, descubrió que WhatsApp acumulaba más de 14 horas de ejecución en segundo plano, consumiendo más de dos horas de CPU activa y generando más de 200.000 paquetes de datos sin que nadie tocara el dispositivo.

La investigación profunda con Logcat —herramienta que muestra los mensajes del sistema— reveló que el conflicto no venía de Meta ni de Samsung. El culpable era MicroG, la capa de compatibilidad de código abierto que emula los servicios de Google Play. Al coexistir en el mismo móvil tanto los Play Services oficiales como MicroG, WhatsApp entraba en un bucle de excepciones al intentar obtener el identificador de notificaciones, generando reintentos continuos que mantenían la CPU al máximo.

La solución fue inmediata: desinstalar MicroG, forzar la detención de WhatsApp y borrar su caché. Los problemas desaparecieron al instante. Este caso subraya el riesgo invisible de instalar capas de emulación que alteran servicios críticos de Android. Aunque dispositivos como los de Huawei las requieren en Occidente, pueden provocar incompatibilidades muy difíciles de detectar.
