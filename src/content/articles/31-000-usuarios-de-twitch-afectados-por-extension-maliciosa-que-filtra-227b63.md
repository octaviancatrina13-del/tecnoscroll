---
title: "31.000 usuarios de Twitch afectados por extensión maliciosa que filtraba datos"
teaser: "Una extensión de navegador para Twitch capturaba tokens de seguridad y los enviaba a servidores rusos."
category: "software"
pubDate: "2026-09-14T19:05:00.000Z"
image:
  url: "https://images.pexels.com/photos/34804011/pexels-photo-34804011.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  alt: "Close-up of a laptop screen displaying programming code with a cute plush toy reflecting."
  credit: "Foto de Daniil Komov en Pexels"
  creditUrl: "https://www.pexels.com/photo/reflection-in-a-laptop-screen-showing-code-34804011/"
  provider: "pexels"
source:
  name: "TechRadar"
  url: "https://www.techradar.com/pro/security/31-000-twitch-users-hit-by-malicious-browser-extension-oauth-tokens-leaked-via-russian-proxy-network"
tags: ["twitch", "seguridad", "extensiones", "oauth"]
draft: false
---
La compañía de ciberseguridad Socket descubrió una extensión de navegador llamada "Twitch Enhanced Viewer | JeeBot" que estaba robando datos sensibles de usuario. La herramienta, disponible tanto en Chrome como en Firefox, contaba con aproximadamente 30.000 usuarios en el navegador de Google y 600 en Firefox.

Según explicaba Socket en su análisis, la extensión se comercializaba como una herramienta moderna para streamers y espectadores que querían mejorar la calidad de visualización, permitiendo contenido en 2K, ocultando anuncios e incluyendo un bot de IA. Sin embargo, funcionaba de manera muy diferente a lo anunciado.

## El robo silencioso de credenciales

La extensión estaba diseñada para recuperar listas de reproducción de vídeo de Twitch a través de servidores proxy propios del desarrollador. El problema: junto con esas solicitudes, enviaba también los tokens OAuth de los usuarios (credenciales de acceso), que quedaban registrados en los logs de los servidores proxy al formar parte de la URL.

Lo más sospechoso fue descubierto por los investigadores de Socket: había una lista de diez canales de streamers rusos que estaban **exentos** de este envío de tokens. Esto sugiere que el desarrollador (HISHIMIRO/jeetbot.cc) conocía perfectamente lo que hacía.

Tras ser denunciado públicamente, el desarrollador lanzó una versión actualizada (85.8.7) que corrige el fallo. Aun así, los expertos recomiendan a todos los usuarios afectados que revoquen inmediatamente sus tokens de Twitch para garantizar su seguridad.
