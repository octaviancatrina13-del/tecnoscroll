// Genera un lote de artículos DEMO variados para poblar el feed sin usar API.
// Uso: node scripts/seed-demo.js            (añade a los existentes)
//      node scripts/seed-demo.js --reset    (borra los .md actuales y regenera)
//
// El contenido es de relleno realista en español; el pipeline real lo sustituye
// por noticias reescritas. Las imágenes usan las ilustraciones de reserva.
import fs from 'node:fs';
import path from 'node:path';
import { PATHS } from './lib/env.js';
import { slugify } from './lib/util.js';

const RESET = process.argv.includes('--reset');

// ── Contenido por categoría: 9 titulares cada una ─────────────
const DATA = {
  moviles: [
    ['El plegable más fino del año llega con una bisagra rediseñada', 'Cierra sin hueco y promete aguantar años de aperturas.', ['plegables', 'diseño']],
    ['Un fabricante chino adelanta la carga de 300 W en su próximo móvil', 'De cero a lleno en menos de lo que tardas en desayunar.', ['carga', 'bateria']],
    ['La próxima gama alta apostará por una cámara de 1 pulgada', 'El sensor más grande visto en un móvil quiere plantar cara a las réflex.', ['camara', 'fotografia']],
    ['Filtrado el diseño del nuevo buque insignia: adiós al notch', 'La cámara frontal desaparece bajo la pantalla, según las imágenes.', ['filtracion', 'pantalla']],
    ['Android estrena un modo de ahorro que promete un día extra', 'Menos brillo, menos fondo y mucha más autonomía sin tocar nada.', ['android', 'bateria']],
    ['Un móvil modular vuelve a intentarlo: cámaras que se cambian a mano', 'La idea que fracasó hace una década regresa con otra ejecución.', ['modular', 'gadgets']],
    ['El eSIM se generaliza y el hueco para la tarjeta empieza a desaparecer', 'Cada vez más modelos prescinden de la bandeja física.', ['esim', 'conectividad']],
    ['La resistencia al agua da un salto: sumergible a 5 metros media hora', 'La nueva certificación amplía lo que puedes hacer sin miedo.', ['resistencia', 'ip']],
    ['Un gama media sorprende con pantalla de 144 Hz por menos de 300 euros', 'Fluidez de gama alta a precio de bolsillo ajustado.', ['gama-media', 'pantalla']],
  ],
  ordenadores: [
    ['El nuevo portátil de 14 pulgadas pesa menos de 900 gramos', 'Ligereza de récord sin renunciar a puertos de verdad.', ['portatiles', 'diseño']],
    ['Llega el primer portátil con pantalla enrollable', 'Amplía el panel con un gesto cuando necesitas más espacio.', ['pantalla', 'innovacion']],
    ['Las memorias LPDDR6 prometen portátiles mucho más rápidos', 'Más ancho de banda y menos consumo en la próxima generación.', ['memoria', 'rendimiento']],
    ['Un mini PC del tamaño de un router mueve juegos actuales', 'Potencia sorprendente en una caja que cabe en la mano.', ['mini-pc', 'gaming']],
    ['El teclado mecánico de bajo perfil conquista los portátiles finos', 'Tacto de sobremesa en un chasis de pocos milímetros.', ['teclado', 'diseño']],
    ['Windows estrena un modo que reduce el consumo en segundo plano', 'La autonomía mejora sin que el usuario note nada.', ['windows', 'software']],
    ['Los monitores OLED de 32 pulgadas bajan por fin de precio', 'El negro perfecto se acerca al presupuesto de más gente.', ['monitores', 'oled']],
    ['Un portátil con dos pantallas apuesta por trabajar sin ratón', 'La mitad inferior se convierte en teclado o lienzo táctil.', ['pantalla', 'productividad']],
    ['El puerto USB-C unificado ya mueve datos, vídeo y 240 W de carga', 'Un solo cable para todo se vuelve realidad en los nuevos equipos.', ['usb-c', 'conectividad']],
  ],
  camaras: [
    ['La nueva sin espejo dispara 40 fotos por segundo sin apagón', 'El visor nunca se congela, ni en la ráfaga más larga.', ['sin-espejo', 'fotografia']],
    ['Un objetivo 24-200 promete cubrir casi cualquier escena', 'La lente todoterreno que quiere vivir pegada a la cámara.', ['objetivos', 'zoom']],
    ['La estabilización llega a 8 pasos y salva fotos a pulso', 'Adiós al trípode en muchas situaciones de poca luz.', ['estabilizacion', 'video']],
    ['Una cámara de acción añade sensor más grande y mejor noche', 'Vídeo más limpio cuando cae el sol, sin perder tamaño.', ['accion', 'video']],
    ['El enfoque por IA ahora reconoce también aves y trenes', 'El seguimiento de sujetos se vuelve casi infalible.', ['enfoque', 'ia']],
    ['Vuelve el formato medio a un precio nunca visto', 'La calidad profesional se acerca a los aficionados serios.', ['formato-medio', 'fotografia']],
    ['Grabación en 8K a 60p sin límite de tiempo ni sobrecalentamiento', 'La barrera térmica que frenaba el vídeo cae por fin.', ['8k', 'video']],
    ['Un flash de estudio portátil cabe en la mochila', 'Luz potente y controlable desde el móvil, sin cables.', ['iluminacion', 'accesorios']],
    ['La cámara instantánea moderna imprime y guarda en digital a la vez', 'Lo mejor de lo analógico y lo digital en un mismo disparo.', ['instantanea', 'gadgets']],
  ],
  software: [
    ['La nueva versión del navegador agrupa pestañas por proyectos', 'Orden automático para quien vive con cincuenta pestañas abiertas.', ['navegador', 'productividad']],
    ['Un editor de vídeo gratuito estrena cortes automáticos por voz', 'Elimina silencios y muletillas con un clic.', ['edicion', 'ia']],
    ['La suite ofimática libre ya abre archivos pesados sin tirones', 'Rendimiento renovado para hojas de cálculo enormes.', ['ofimatica', 'rendimiento']],
    ['Llega el modo offline real a la app de notas más popular', 'Escribe sin conexión y sincroniza cuando vuelva internet.', ['apps', 'productividad']],
    ['Un gestor de contraseñas añade acceso sin contraseña por defecto', 'Las passkeys se convierten en la opción principal.', ['seguridad', 'passkeys']],
    ['El sistema operativo de escritorio estrena escritorios inteligentes', 'Las ventanas se ordenan solas según lo que estés haciendo.', ['sistema', 'productividad']],
    ['Una app de finanzas personales predice tus gastos del mes', 'Te avisa antes de quedarte corto, no después.', ['finanzas', 'apps']],
    ['El reproductor multimedia veterano resucita con soporte moderno', 'Vuelve a reproducir de todo, ahora también en 4K HDR.', ['multimedia', 'software']],
    ['La herramienta de copias de seguridad ahora cifra por defecto', 'Tus archivos viajan a la nube sin que nadie más los lea.', ['backup', 'seguridad']],
  ],
  coches: [
    ['Un eléctrico promete 1.000 km de autonomía con batería sólida', 'La química que lo cambia todo empieza a llegar a la carretera.', ['electricos', 'bateria']],
    ['El coche que se actualiza como un móvil gana el aparcamiento solo', 'Una descarga nocturna le enseña a estacionar sin conductor.', ['ota', 'autonomo']],
    ['La carga bidireccional convierte el coche en batería de casa', 'Aprovecha el enchufe del vehículo cuando se va la luz.', ['carga', 'v2g']],
    ['Un fabricante elimina casi todos los botones del salpicadero', 'Todo se controla por voz y pantalla, para bien o para mal.', ['interior', 'infotainment']],
    ['El asistente de conducción aprende de los trayectos que repites', 'El coche anticipa tu ruta habitual y la prepara solo.', ['adas', 'ia']],
    ['Llega el faro que proyecta señales sobre el asfalto', 'Avisos de peligro dibujados delante del propio coche.', ['iluminacion', 'seguridad']],
    ['El infotainment estrena tienda de apps con juegos para la espera', 'Mientras cargas, la pantalla central se convierte en consola.', ['infotainment', 'gaming']],
    ['Un sistema detecta el cansancio del conductor por la mirada', 'Cámaras internas que avisan antes de un despiste peligroso.', ['seguridad', 'adas']],
    ['El primer coche con pantalla en todo el salpicadero llega a Europa', 'Un panel continuo de lado a lado sustituye a los clásicos.', ['pantalla', 'interior']],
  ],
  chips: [
    ['El nuevo proceso de 2 nanómetros entra en producción en masa', 'Chips más rápidos y eficientes empiezan a fabricarse en serie.', ['fabricacion', 'procesadores']],
    ['Un procesador para portátil integra una NPU tres veces más potente', 'La IA local deja de depender de la nube en el día a día.', ['npu', 'ia']],
    ['La memoria apilada en 3D promete duplicar el ancho de banda', 'Más datos por segundo sin subir el consumo.', ['memoria', 'rendimiento']],
    ['Un chip de código abierto reta a las arquitecturas dominantes', 'RISC-V gana terreno en dispositivos de consumo.', ['risc-v', 'arquitectura']],
    ['El nuevo módem 5G reduce a la mitad el gasto de batería', 'Conexión rápida que ya no castiga la autonomía.', ['5g', 'conectividad']],
    ['Fotónica en el chip: la luz sustituye al cobre para ir más rápido', 'Comunicaciones internas a la velocidad de la luz.', ['fotonica', 'innovacion']],
    ['Un acelerador de IA cabe en un llavero USB', 'Potencia para modelos locales enchufada a cualquier equipo.', ['ia', 'gadgets']],
    ['La próxima GPU integrada moverá juegos en 1080p sin tarjeta aparte', 'El gráfico dedicado deja de ser imprescindible para jugar.', ['gpu', 'gaming']],
    ['Las fábricas de chips europeas arrancan su primera gran planta', 'Europa busca depender menos de Asia en semiconductores.', ['industria', 'europa']],
  ],
  ia: [
    ['Un modelo abierto iguala a los grandes y cabe en un portátil', 'La IA potente deja de ser exclusiva de los gigantes.', ['modelos', 'open-source']],
    ['La IA que edita fotos por voz llega a los móviles', 'Pides el cambio hablando y la imagen se retoca sola.', ['fotografia', 'moviles']],
    ['Un asistente de código escribe y prueba sus propios programas', 'Programar con ayuda entra en una nueva fase.', ['programacion', 'agentes']],
    ['La traducción simultánea en el auricular ya casi no tiene retardo', 'Conversaciones en dos idiomas casi en tiempo real.', ['traduccion', 'wearables']],
    ['Crecen las marcas de agua para distinguir imágenes generadas por IA', 'Un estándar busca frenar los engaños visuales.', ['etica', 'imagenes']],
    ['La IA local llega a los electrodomésticos sin enviar datos fuera', 'Tu nevera decide sola y sin subir nada a la nube.', ['hogar', 'privacidad']],
    ['Un modelo de vídeo genera clips de un minuto con sonido incluido', 'La generación audiovisual da un salto de calidad.', ['video', 'generativa']],
    ['Los agentes de IA empiezan a reservar y comprar por ti', 'Delegar tareas online se vuelve real, con sus riesgos.', ['agentes', 'productividad']],
    ['La detección de voz clonada mejora para frenar las estafas', 'Nuevas defensas contra el fraude con voces falsas.', ['seguridad', 'voz']],
  ],
  gadgets: [
    ['Unas gafas de realidad mixta bajan de peso y de precio', 'Más cómodas y más baratas: la mezcla que faltaba.', ['xr', 'wearables']],
    ['El altavoz inteligente se queda sin nube y funciona en local', 'Responde al instante y sin enviar tu voz a ningún sitio.', ['hogar', 'privacidad']],
    ['Un proyector de bolsillo llena una pared con calidad sorprendente', 'Cine portátil que cabe en el bolsillo del abrigo.', ['proyectores', 'video']],
    ['Llega el marco digital que imita la textura del papel', 'Tus fotos se ven como impresas, sin brillos molestos.', ['hogar', 'pantalla']],
    ['Un lápiz digital escribe en papel y lo digitaliza al vuelo', 'Toma notas a mano y aparecen ya en el móvil.', ['accesorios', 'productividad']],
    ['El cargador magnético universal quiere acabar con el lío de cables', 'Un solo accesorio para pegar y cargar casi cualquier cosa.', ['carga', 'accesorios']],
    ['Una cámara de seguridad funciona un año con una sola carga', 'Vigilancia sin cables y casi sin mantenimiento.', ['hogar', 'seguridad']],
    ['El teclado plegable convierte la tablet en un mini portátil', 'Se guarda en cualquier bolsa y despliega experiencia de escritorio.', ['accesorios', 'productividad']],
    ['Un traductor de bolsillo funciona sin conexión en 40 idiomas', 'Viajar y entenderte deja de depender del wifi.', ['traduccion', 'viajes']],
  ],
  wearables: [
    ['El reloj inteligente añade medición de glucosa sin pinchazos', 'Un sensor óptico promete seguir el azúcar desde la muñeca.', ['salud', 'sensores']],
    ['Unos auriculares miden el pulso desde dentro del oído', 'El oído resulta ser un gran punto para el ritmo cardíaco.', ['auriculares', 'salud']],
    ['El anillo inteligente dura una semana y mide el sueño al detalle', 'Seguimiento discreto sin cargar cada noche.', ['anillo', 'sueno']],
    ['Una pulsera avisa de fiebre antes de que la notes', 'Detecta cambios de temperatura para adelantarse al malestar.', ['salud', 'sensores']],
    ['El reloj deportivo estrena mapas sin conexión y linterna', 'Menos dependencia del móvil en plena montaña.', ['deporte', 'gps']],
    ['Las gafas con pantalla muestran indicaciones sin sacar el móvil', 'Navegar a pie con la vista al frente.', ['xr', 'navegacion']],
    ['Un wearable para dormir mejora la fase profunda con sonido', 'Estímulos suaves que buscan un descanso más reparador.', ['sueno', 'salud']],
    ['El smartwatch infantil añade llamadas seguras y zona segura', 'Tranquilidad para las familias sin darle un móvil al niño.', ['familia', 'seguridad']],
    ['La correa que carga el reloj con el movimiento del brazo', 'Energía cinética para olvidarse un poco del cargador.', ['bateria', 'innovacion']],
  ],
  gaming: [
    ['La nueva consola portátil mueve juegos AAA sin despeinarse', 'Potencia de sobremesa en un formato de viaje.', ['consolas', 'portatil']],
    ['Un mando añade gatillos hápticos que imitan cada superficie', 'Sentir el terreno del juego en las manos.', ['mandos', 'haptica']],
    ['El streaming de juegos baja la latencia a niveles de consola local', 'Jugar en la nube deja de notarse.', ['cloud', 'streaming']],
    ['Un monitor gaming alcanza los 500 Hz para los más competitivos', 'Fluidez extrema para quien vive de los reflejos.', ['monitores', 'esports']],
    ['La retrocompatibilidad total llega a la próxima generación', 'Toda tu biblioteca antigua, lista desde el primer día.', ['consolas', 'juegos']],
    ['Un juego indie español arrasa en las listas mundiales', 'El talento local vuelve a colarse entre los grandes.', ['indie', 'espana']],
    ['Las gafas de realidad virtual estrenan seguimiento de manos sin mandos', 'Jugar con las manos desnudas se vuelve preciso.', ['vr', 'control']],
    ['El teclado para jugar ajusta la sensibilidad tecla por tecla', 'Personalización milimétrica para cada partida.', ['teclado', 'perifericos']],
    ['La suscripción de juegos suma estrenos el mismo día de lanzamiento', 'Más motivos para no comprar cada título por separado.', ['suscripciones', 'juegos']],
  ],
};

// ── Generación del cuerpo (variado por plantilla) ─────────────
const OPEN = [
  (t) => `La actualidad tecnológica vuelve a moverse rápido. ${t}, un anuncio que ha llamado la atención tanto por lo que promete como por el momento en que llega.`,
  (t) => `${t}. Es la novedad de la que se habla estos días, y conviene mirarla con algo de perspectiva antes de sacar conclusiones.`,
  (t) => `No todos los días aparece algo así. ${t}, y las primeras reacciones apuntan a que puede marcar tendencia en los próximos meses.`,
  (t) => `El sector no descansa. ${t}, una propuesta que busca diferenciarse en un mercado cada vez más competido.`,
];
const MID = {
  default: [
    'La clave está en el equilibrio entre lo que se promete sobre el papel y lo que de verdad se nota en el uso diario. Las cifras impresionan, pero el rendimiento real siempre depende de cómo se aproveche en condiciones normales.',
    'Como suele pasar en estos casos, el precio y la disponibilidad serán decisivos. Una buena idea puede quedarse en anécdota si no llega a un coste razonable y a suficiente gente.',
    'Los primeros análisis independientes serán los que aclaren si estamos ante un cambio real o ante un titular llamativo. Hasta entonces, conviene tomar los datos oficiales con la cautela habitual.',
  ],
};
const CLOSE = [
  'De momento, la propuesta va en la dirección que pide el público: más utilidad y menos complicaciones. Habrá que ver cómo responde cuando llegue a las tiendas.',
  'Si las promesas se cumplen, el resto del sector tendrá que moverse para no quedarse atrás. La competencia, como casi siempre, acaba beneficiando al usuario.',
  'Queda por ver el recorrido a largo plazo, pero el punto de partida es prometedor. Seguiremos de cerca su evolución en las próximas semanas.',
];

function pick(arr, i) { return arr[i % arr.length]; }

function bodyFor(title, teaser, i) {
  const p1 = pick(OPEN, i)(title);
  const p2 = pick(MID.default, i);
  const p3 = `${teaser} ${pick(CLOSE, i)}`;
  return `${p1}\n\n${p2}\n\n${p3}\n`;
}

function yaml(s = '') { return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`; }

// ── Construir lista intercalada (feed diversificado) ──────────
const cats = Object.keys(DATA);
const maxLen = Math.max(...cats.map((c) => DATA[c].length));
const interleaved = [];
for (let row = 0; row < maxLen; row++) {
  for (const c of cats) {
    if (DATA[c][row]) interleaved.push({ category: c, entry: DATA[c][row], row });
  }
}

// Fechas descendentes desde ahora, ~38 min entre artículos.
const base = Date.now();
const stepMs = 38 * 60 * 1000;

if (RESET) {
  for (const f of fs.readdirSync(PATHS.articlesDir).filter((f) => f.endsWith('.md'))) {
    fs.unlinkSync(path.join(PATHS.articlesDir, f));
  }
  console.log('Artículos anteriores borrados.');
}

fs.mkdirSync(PATHS.articlesDir, { recursive: true });
let n = 0;
interleaved.forEach((item, i) => {
  const [title, teaser, tags] = item.entry;
  const pubDate = new Date(base - i * stepMs - 4 * 60 * 1000).toISOString();
  const slug = `${slugify(title)}`.slice(0, 60).replace(/-+$/, '') + `-d${String(i + 1).padStart(2, '0')}`;
  const fm = [
    '---',
    `title: ${yaml(title)}`,
    `teaser: ${yaml(teaser)}`,
    `category: ${yaml(item.category)}`,
    `pubDate: ${yaml(pubDate)}`,
    'image:',
    `  url: ${yaml(`/fallback/${item.category}.svg`)}`,
    `  alt: ${yaml('Ilustración de ' + item.category)}`,
    `  credit: ${yaml('Ilustración de TecnoScroll')}`,
    `  provider: ${yaml('fallback')}`,
    'source:',
    `  name: ${yaml('TecnoScroll')}`,
    `  url: ${yaml('https://tecnoscroll.es')}`,
    `tags: [${tags.map(yaml).join(', ')}]`,
    'draft: false',
    '---',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(PATHS.articlesDir, `${slug}.md`), fm + bodyFor(title, teaser, i));
  n++;
});

console.log(`Generados ${n} artículos demo en ${path.relative(PATHS.root, PATHS.articlesDir)}`);
