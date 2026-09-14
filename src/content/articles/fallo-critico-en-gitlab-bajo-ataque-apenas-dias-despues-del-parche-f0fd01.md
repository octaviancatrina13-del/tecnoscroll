---
title: "Fallo crítico en GitLab bajo ataque apenas días después del parche"
teaser: "Una vulnerabilidad máxima en GitLab permite acceso no autorizado a archivos: las patch llegaron hace poco y ya hay ataques."
category: "software"
pubDate: "2026-09-14T14:30:00.000Z"
image:
  url: "https://images.pexels.com/photos/34803998/pexels-photo-34803998.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
  alt: "Focused view of a computer screen displaying programming code with visible reflections."
  credit: "Foto de Daniil Komov en Pexels"
  creditUrl: "https://www.pexels.com/photo/close-up-of-computer-screen-with-code-and-reflection-34803998/"
  provider: "pexels"
source:
  name: "The Register"
  url: "https://www.theregister.com/security/2026/09/14/perfect-10-gitlab-bug-under-attack-days-after-patch-lands/5296176"
tags: ["gitlab", "ciberseguridad", "vulnerabilidad", "software"]
draft: false
---
La agencia estadounidense CISA ha confirmado que ciberatacantes están explotando activamente una vulnerabilidad crítica en GitLab que permite leer archivos arbitrarios sin necesidad de autenticación. El fallo, catalogado como CVE-2026-85706, ha sido incluido en el registro de vulnerabilidades conocidas y explotadas de CISA.

Se trata de un error de traversal de directorios en la API de repositorios que afecta tanto a GitLab Community Edition como a Enterprise Edition. La gravedad es máxima: ostenta una puntuación de 10.0 en la escala CVSS v3.1. El problema radica en la confinación inadecuada de rutas combinada con la ausencia de validación de autenticación, lo que resulta especialmente preocupante en una plataforma que alberga código fuente, ficheros de configuración y credenciales sensibles.

GitLab lanzó parches el 10 de septiembre en las versiones 19.3.2, 19.2.6 y 19.1.8, instando a los administradores a actualizar de inmediato. La vulnerabilidad afecta a versiones desde 18.7 hasta la 19.1.7, así como al rama 19.2 anterior a 19.2.6 y 19.3 antes de 19.3.2.

Según la firma de seguridad watchTowr, el fallo es sencillo de explotar: basta un único request HTTP para acceder a archivos locales, datos de configuración y secretos almacenados. La compañía ya observaba intentos de explotación en la red y alertaba sobre la probabilidad de un ataque generalizado.

GitLab.com ya dispone de la corrección, y los clientes de GitLab Dedicated no requieren acción. Para las instalaciones auto-hospedadas expuestas a internet, la actualización debe ser prioridad inmediata.
