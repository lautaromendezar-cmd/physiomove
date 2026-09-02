/**
 * Única fuente de textos del sitio.
 * Todo lo que hay acá sale de material-drive/physiomove-material.docx.
 * Los campos que el cliente dejó vacíos o con el placeholder de la plantilla
 * NO se completan: se omiten. Ver README.md > "Contenido pendiente".
 */

export const centro = {
  nombre: 'PHYSIOMOVE',
  bajada: 'Centro Deportivo Especializado',
  frase: 'Donde volvés al deporte',
  apertura: 2023,
  origen:
    'PhysioMove se forma de la idea de Marcos y Sofía, dos hermanos kinesiólogos deportistas nacidos en Río Gallegos y graduados en Córdoba, en la UNC, que dieron sus primeros pasos creyendo que la recuperación de lesiones debía ser de la misma manera en que se producen en la mayoría de los casos: en movimiento.',
  diferencial:
    'PhysioMove se destaca principalmente por sus profesionales altamente capacitados y comprometidos con la actualización permanente, siendo el razonamiento clínico aplicado en la evaluación inicial un factor determinante para la prescripción correcta de ejercicios guiados, planificados y dosificados por nuestros kinesiólogos deportivos.',
  pacientes:
    'Nuestro centro deportivo tiene sus puertas abiertas para todo aquel paciente que desea recuperarse a través del ejercicio. Trabajamos tanto con selecciones, equipos y gimnasios, hasta deportistas profesionales, amateurs, recreacionales, pequeños deportistas en formación y adultos mayores, entre otros.',
  espacio:
    'Actualmente contamos con tres box privados, un baño de damas y otro para caballeros, y un gimnasio de uso exclusivo para pacientes que eligen recuperarse bajo nuestro seguimiento profesional.',
};

/** Métricas del hero. Datos reales pasados por el cliente (ago 2026). */
export const metricas = [
  { valor: '+4300', texto: 'Pacientes pasaron por PhysioMove' },
  { valor: '+450', texto: 'Atletas de vuelta al deporte' },
  { valor: '97%', texto: 'Llegan por recomendación' },
];

export const contacto = {
  direccion: 'Santiago del Estero 80',
  entre: 'Entre Don Bosco y Kirchner',
  localidad: 'Río Gallegos',
  provincia: 'Santa Cruz',
  pais: 'Argentina',
  codigoPostal: '9400',
  horarios: [
    { dias: 'Lunes a viernes', horas: '7 a 20 hs' },
    { dias: 'Sábados', horas: 'Exclusivo evaluaciones' },
  ],
  telefono: '2966 663958',
  telefonoE164: '+542966663958',
  whatsapp: 'https://wa.me/542966663958',
  whatsappTexto:
    'https://wa.me/542966663958?text=Hola%20PhysioMove%2C%20quiero%20agendar%20un%20turno.',
  mail: 'physiomove.depor@gmail.com',
  instagram: 'https://www.instagram.com/physiomove.rgl/',
  instagramUsuario: '@physiomove.rgl',
  mapaEmbed:
    'https://www.google.com/maps?q=PHYSIOMOVE+Kinesiologia+deportiva,+Santiago+del+Estero+80,+R%C3%ADo+Gallegos,+Santa+Cruz&output=embed',
  mapaLink:
    'https://www.google.com/maps/search/?api=1&query=PHYSIOMOVE+Kinesiologia+deportiva+Santiago+del+Estero+80+R%C3%ADo+Gallegos',
};

export type Bloque = { titulo: string; texto?: string; lista?: string[] };

export type Servicio = {
  slug: string;
  nombre: string;
  numero: string;
  resumen: string;
  metaDescription: string;
  foto: string;
  fotoAlt: string;
  bloques: Bloque[];
  atiende?: string;
};

export const servicios: Servicio[] = [
  {
    slug: 'consulta',
    nombre: 'Consulta',
    numero: '01',
    resumen:
      'La primera sesión uno a uno: anamnesis, evaluación funcional y recolección de datos para planificar el tratamiento.',
    metaDescription:
      'Primera consulta de kinesiología en PhysioMove, Río Gallegos: anamnesis, evaluación funcional y recolección de datos para planificar tu tratamiento.',
    foto: 'consulta-evaluacion',
    fotoAlt:
      'Kinesiólogo de PhysioMove evaluando la rodilla de un paciente recostado en la camilla del box',
    bloques: [
      {
        titulo: 'Qué es',
        texto:
          'Es la primera sesión uno a uno en la que se realiza una anamnesis, una evaluación funcional, exploración de signos o síntomas y la recolección de datos para la planificación del tratamiento.',
      },
      {
        titulo: 'Para quién sirve',
        texto:
          'Sirve para determinar el mejor tratamiento en base a los objetivos del paciente y del profesional, para confirmar el diagnóstico médico y para visualizar antiguas lesiones o cirugías que puedan tener relación con la problemática actual.',
      },
      {
        titulo: 'Por qué es necesaria',
        texto:
          'Es necesaria para educar al paciente, que recuerde que el movimiento es el mejor antiinflamatorio y que el reposo no es sinónimo de cura, entendiendo que nuestro equipo siempre es pro del movimiento o del ejercicio, siempre y cuando el contexto acompañe.',
      },
    ],
  },
  {
    slug: 'kinesiologia-deportiva',
    nombre: 'Kinesiología Deportiva',
    numero: '02',
    resumen:
      'Entrevista inicial, tests clínicos y funcionales, y una planificación acorde a las capacidades físicas de cada paciente.',
    metaDescription:
      'Kinesiología deportiva en Río Gallegos: entrevista inicial, tests clínicos y funcionales, y ejercicio planificado y guiado por kinesiólogos deportivos.',
    foto: 'ejercicio-planificado',
    fotoAlt:
      'Paciente haciendo una sentadilla con banda elástica sobre la pista azul del gimnasio de PhysioMove',
    bloques: [
      {
        titulo: 'Qué es',
        texto:
          'Una modalidad de trabajo que comienza a través de una entrevista inicial, seguida de tests clínicos y funcionales para realizar una adecuada lectura sobre su lesión o diagnóstico, y posteriormente una planificación acorde a las capacidades físicas de cada paciente.',
      },
      {
        titulo: 'Para quién sirve',
        texto:
          'Para toda aquella persona que desea recuperarse a través del ejercicio planificado y guiado por profesionales.',
      },
      {
        titulo: 'Cómo es una sesión',
        lista: [
          'Anamnesis',
          'Evaluación',
          'Planificación de ejercicios',
          'Terapia manual',
          'Aplicación de agentes físicos, según corresponda',
        ],
      },
      {
        titulo: 'Cuántas sesiones',
        texto:
          'No existe una temporalidad exacta: se trabaja y se testea para lograr parámetros que disminuyan las probabilidades de lesión o recidiva.',
      },
    ],
    atiende: 'Todos los kinesiólogos del staff',
  },
  {
    slug: 'evaluaciones-de-rendimiento',
    nombre: 'Evaluaciones de rendimiento deportivo',
    numero: '03',
    resumen:
      'Tecnología IVOLUTION para medir, controlar y gestionar el rendimiento físico con datos objetivos.',
    metaDescription:
      'Evaluaciones de rendimiento deportivo en Río Gallegos con tecnología IVOLUTION: dinamometría y plataformas de fuerza para medir y gestionar el rendimiento.',
    foto: 'evaluacion-plataforma',
    fotoAlt:
      'Deportista sobre la plataforma de fuerza mientras una kinesióloga registra los datos de la evaluación en PhysioMove',
    bloques: [
      {
        titulo: 'Qué es',
        texto:
          'La tecnología IVOLUTION se utiliza para medir, controlar y gestionar el rendimiento físico en docenas de deportes diferentes: de pista, de campo, atletismo, individuales y de equipo.',
      },
      {
        titulo: 'Para quién sirve',
        texto:
          'Es aplicable en selecciones, equipos de élite o en formación, gimnasios privados, o incluso en el deportista individual que desea conocer las métricas de su cuerpo y llevarlas al límite con esta nueva tecnología.',
      },
      {
        titulo: 'Cómo es una sesión',
        texto: 'Se realizan tests de movilidad articular, flexibilidad y fuerza.',
      },
      {
        titulo: 'Cada cuánto se testea',
        texto: 'Se suele testear cada 8 a 12 semanas.',
      },
      {
        titulo: 'Para qué sirven los resultados',
        lista: [
          'Establecer un nivel base específico para cada sujeto',
          'Monitorear el progreso en una rehabilitación o entrenamiento',
          'Medir el resultado de un plan específico',
          'Desarrollar programas de prevención de lesiones y rehabilitación',
        ],
      },
      {
        titulo: 'Aparatología y técnicas',
        lista: ['Tecnología IVOLUTION', 'Dinamometría', 'Plataformas de fuerza'],
      },
    ],
  },
  {
    slug: 'fisioterapia-invasiva-mep',
    nombre: 'Fisioterapia Invasiva MEP',
    numero: '04',
    resumen:
      'Una técnica mínimamente invasiva para tendinopatías y lesiones musculares crónicas.',
    metaDescription:
      'Fisioterapia invasiva MEP en Río Gallegos: técnica mínimamente invasiva para tendinopatías y lesiones musculares crónicas, con corriente galvánica.',
    foto: 'mep-sesion',
    fotoAlt:
      'Kinesiólogo de PhysioMove trabajando sobre la pierna de un paciente recostado en la camilla',
    bloques: [
      {
        titulo: 'Qué es',
        texto:
          'Es una técnica innovadora, mínimamente invasiva, que revolucionó la kinesiología deportiva.',
      },
      {
        titulo: 'Para quién sirve',
        texto:
          'Sumamente utilizada en pacientes que presentan tendinopatías o lesiones musculares crónicas.',
      },
      {
        titulo: 'Cómo es una sesión',
        texto:
          'Se localiza el tendón lesionado, se esteriliza la zona y se introduce una aguja de acupuntura durante unos minutos; luego se retira y se descarta.',
      },
      { titulo: 'Cuántas sesiones', texto: 'Se recomienda entre 2 y 3 sesiones.' },
      {
        titulo: 'Aparatología y técnicas',
        texto: 'Agente físico Sveltia, de emisión de corriente galvánica.',
      },
    ],
  },
  {
    slug: 'recovery-post-competencia',
    nombre: 'Sesión Recovery Post Competencia',
    numero: '05',
    resumen:
      'Masoterapia, presoterapia y restricción del flujo sanguíneo para eliminar toxinas de forma inmediata.',
    metaDescription:
      'Sesión Recovery post competencia en Río Gallegos: masoterapia, presoterapia, contraste térmico y neuromodulación para recuperar después de competir.',
    foto: 'recovery-presoterapia',
    fotoAlt:
      'Botas de presoterapia sobre la camilla del box de recuperación de PhysioMove',
    bloques: [
      {
        titulo: 'Qué es',
        texto:
          'Es una excelente opción durante o luego de una competencia de alta intensidad. Masoterapia, presoterapia y restricción del flujo sanguíneo la hacen una sesión completa para eliminar toxinas de forma inmediata.',
      },
      {
        titulo: 'Para quién sirve',
        texto:
          'Es una herramienta innovadora para cuidar tu cuerpo. Quienes se han recuperado con nosotros entienden que no lesionarse es posible, y en gran parte es tu responsabilidad.',
      },
      {
        titulo: 'Cómo es una sesión',
        lista: [
          'Movilidad y liberación miofascial',
          'Terapia compresiva neumática intermitente',
          'Contraste térmico o inmersión',
          'Neuromodulación y nutrición periférica',
        ],
      },
      {
        titulo: 'Efectos fisiológicos',
        lista: [
          'Modulación del sistema nervioso autónomo',
          'Disminuye la respuesta inflamatoria',
          'Aporte de sustratos energéticos',
          'Disminuye marcadores de daño muscular',
          'Barrido de lactato y sustancias tóxicas',
        ],
      },
    ],
  },
  {
    slug: 'iniciacion-performance-ninos',
    nombre: 'Iniciación a la performance deportiva en niños',
    numero: '06',
    resumen:
      'Grupos reducidos, evaluación funcional inicial con tecnología IVOLUTION y un plan personalizado para cada atleta.',
    metaDescription:
      'Iniciación a la performance deportiva para niños en Río Gallegos: grupos reducidos, evaluación funcional con tecnología IVOLUTION y plan personalizado.',
    foto: 'ninos-entrenamiento',
    fotoAlt:
      'Profesional de PhysioMove entrenando a dos chicos frente al mural de hexágonos del centro',
    bloques: [
      {
        titulo: 'Modalidad de trabajo',
        lista: [
          'Entrenamos en grupos pequeños, priorizando el bienestar integral de cada atleta en su dimensión física, funcional y emocional.',
          'La primera clase incluye una evaluación funcional y de fuerza a partir del uso de la tecnología IVOLUTION, realizada por kinesiólogos y el profe a cargo.',
          'Esa evaluación nos permite conocer el punto de partida, detectar déficits o asimetrías y diseñar un plan personalizado, asegurando una mejora continua con datos objetivos.',
        ],
      },
      {
        titulo: 'Beneficios del programa',
        lista: [
          'Desarrollo seguro de la fuerza en todas sus magnitudes',
          'Prevención de lesiones',
          'Mejora de la postura, la confianza y los hábitos saludables',
          'Entrenamiento divertido y motivador',
        ],
      },
      {
        titulo: 'Cómo es un entrenamiento',
        lista: ['Bloque de movilidad articular', 'Entrada en calor', 'Bloque de fuerza'],
      },
      { titulo: 'Cuántas clases al mes', texto: 'Habitualmente son ocho clases por mes.' },
      {
        titulo: 'Horarios',
        lista: [
          'Martes y jueves — Grupo 1: 18 a 19 hs',
          'Martes y jueves — Grupo 2: 19 a 20 hs',
          'Martes y jueves — Grupo 3: 20 a 21 hs',
          'Sábados: 14 a 15 hs y 15 a 16 hs',
        ],
      },
    ],
    atiende: 'Profe. Nicolás Ovando',
  },
];

export type Profesional = {
  nombre: string;
  iniciales: string;
  titulo: string;
  matricula?: string;
  especialidad?: string;
  formacion?: string;
  experiencia?: string;
  bio?: string;
  /** Nombre del archivo en src/assets/retratos, sin extension. */
  retrato?: string;
  fichaCompleta: boolean;
};

export const profesionales: Profesional[] = [
  {
    nombre: 'Marcos Exequiel Anaquín',
    iniciales: 'MA',
    retrato: 'retrato-marcos',
    titulo: 'Licenciado en Kinesiología y Fisioterapia',
    matricula: 'LK MP 294',
    especialidad:
      'Kinesiología deportiva. Análisis de diagnósticos médicos y kinésicos.',
    formacion:
      'Licenciatura en Kinesiología y Fisioterapia, Universidad Nacional de Córdoba. Certificado en medicina ortopédica Cyriax. Certificado en MEP Sport. Actualmente cursando la Especialización en evaluación funcional y ciencias de datos de Equipo Physical.',
    experiencia:
      'Co-fundador de PhysioMove — Centro Deportivo Especializado. Evaluaciones deportivas en Hispano Americano. Evaluaciones deportivas de alto rendimiento en el Predio AFA — Barracas Central (Primera División).',
    bio: 'Profesional asertivo, resiliente, proactivo y alentador en todo tipo de lesiones deportivas. Próximamente entrenador de tenis enfocado en la biomecánica, la estrategia y el análisis técnico del juego, potenciando el talento a través del desarrollo de la mentalidad y el cuidado del atleta.',
    fichaCompleta: true,
  },
  {
    nombre: 'Sofía Alejandra Anaquín',
    iniciales: 'SA',
    retrato: 'retrato-sofia',
    titulo: 'Licenciada en Kinesiología y Fisioterapia',
    matricula: 'LK MP 336',
    especialidad: 'Especialista en Kinesiología Deportiva',
    formacion:
      'Licenciatura en Kinesiología y Fisioterapia, Universidad Nacional de Córdoba. Especialidad en Kinesiología Deportiva, Universidad Abierta Interamericana. Actualmente cursando la Diplomatura en Deporte y Neurociencias, Universidad Favaloro. Certificada en MEP Sport. Formación continua en rehabilitación, readaptación, evaluación y tecnología aplicada al deporte.',
    experiencia:
      'Co-fundadora de PhysioMove — Centro Deportivo Especializado. Kinesióloga de la Secretaría de Deportes de Santa Cruz y de la Selección de Santa Cruz. Integrante del Observatorio de Deporte y Actividad Física de Santa Cruz. Participación en los Juegos Panamericanos Junior ASU 2025 y evaluaciones deportivas de alto rendimiento en el Predio AFA — Barracas Central y en el CENARD con la Selección Argentina de Hockey Masculino, Los Leones.',
    bio: 'Me interesa entender al deportista más allá de la lesión. Trabajo desde la evaluación y el análisis para tomar decisiones que permitan rehabilitar, prevenir y potenciar el rendimiento, integrando evidencia científica, tecnología y una mirada interdisciplinaria.',
    fichaCompleta: true,
  },
  {
    nombre: 'Eduardo Agustín Guiguet',
    iniciales: 'EG',
    retrato: 'retrato-agustin',
    titulo: 'Licenciado en Kinesiología y Fisioterapia',
    matricula: 'LK MP 385',
    especialidad: 'Kinesiología deportiva',
    formacion:
      'Licenciatura en Kinesiología y Fisioterapia, Universidad Nacional de Córdoba. Método Busquet, las cadenas fisiológicas. Experto en Rehabilitación y Readaptación deportiva, Equipo Physical. Actualmente cursando la Diplomatura de Neurociencias Aplicadas al Deporte, Universidad Favaloro. Evaluación y tecnología aplicada al deporte.',
    experiencia:
      'Socio de PhysioMove — Centro Deportivo Especializado. Ex kinesiólogo de Hispano Americano Básquet, temporada 2025. Participación en los Juegos Panamericanos Junior ASU 2025. Evaluaciones deportivas de alto rendimiento en el CENARD con la Selección Argentina de Hockey Masculino.',
    bio: 'Kinesiólogo orientado a la rehabilitación, la readaptación deportiva y al retorno seguro al deporte, con enfoque en el rendimiento, la prevención de lesiones y la recuperación funcional, integrando evidencia científica y clínica para alcanzar la performance de los deportistas.',
    fichaCompleta: true,
  },
  {
    nombre: 'Graciela Sánchez',
    iniciales: 'GS',
    retrato: 'retrato-graciela',
    titulo: 'Licenciada en Kinesiología y Fisioterapia',
    matricula: 'LK MP 432',
    especialidad: 'Kinesiología deportiva',
    formacion:
      'Universidad Nacional de Córdoba. Actualmente cursando la formación en Osteopatía Deportiva.',
    fichaCompleta: true,
  },
  {
    nombre: 'Lucía Fernández',
    iniciales: 'LF',
    retrato: 'retrato-lucia',
    titulo: 'Licenciada en Nutrición',
    matricula: 'MP 204',
    fichaCompleta: false,
  },
  // Sumado el 2/9/2026 a pedido del cliente. La bio todavia no llego:
  // cuando la mande, se completan los campos y pasa a fichaCompleta.
  {
    nombre: 'Nicolás Oviedo',
    iniciales: 'NO',
    retrato: 'retrato-nicolas',
    titulo: 'Profesor',
    fichaCompleta: false,
  },
];

/**
 * El asterisco del documento marca las que abonan copago.
 * `logo` es el nombre del archivo en src/assets/logos (sin extension).
 * Las que no lo tienen se muestran con el nombre en texto, en la misma celda.
 * La procedencia de cada logo esta en src/assets/logos/ORIGEN.md.
 */
export type ObraSocial = { nombre: string; copago: boolean; logo?: string };

export const obrasSociales: ObraSocial[] = [
  { nombre: 'Caja de Servicios Sociales', copago: true },
  { nombre: 'Avalian', copago: true, logo: 'avalian' },
  { nombre: 'Dasuten', copago: true },
  { nombre: 'IOSFA', copago: true, logo: 'iosfa' },
  { nombre: 'Galeno', copago: true, logo: 'galeno' },
  { nombre: 'Medicus', copago: true, logo: 'medicus' },
  { nombre: 'Medifé', copago: true, logo: 'medife' },
  { nombre: 'OSDE', copago: false, logo: 'osde' },
  { nombre: 'OSDEPYM', copago: false, logo: 'osdepym' },
  { nombre: 'OSPEDYC', copago: true, logo: 'ospedyc' },
  { nombre: 'OSMATA', copago: false, logo: 'osmata' },
  { nombre: 'OSPTV', copago: true },
  { nombre: 'OSPE', copago: true },
  { nombre: 'OSPSA', copago: true },
  { nombre: 'OSUTHGRA', copago: true, logo: 'osuthgra' },
  { nombre: 'PAMI', copago: false, logo: 'pami' },
  { nombre: 'Poder Judicial', copago: false },
  { nombre: 'Swiss Medical', copago: true, logo: 'swiss-medical' },
  { nombre: 'Sancor Salud', copago: true, logo: 'sancor-salud' },
];

export const aranceles = {
  notaCopago:
    'Las obras sociales marcadas con asterisco no alcanzan el mínimo ético profesional, por lo tanto abonan copago.',
  particulares:
    'Sí. El pago es al comienzo del tratamiento, según el valor mínimo ético profesional: actualmente $19.500 por sesión.',
  queTraer: 'Orden médica, credencial digital y autorización, según corresponda.',
  autorizacion:
    'Cuando se requiere autorización, el trámite queda a cargo del paciente.',
};

/** Fotos reales del centro para la galería horizontal de la home. */
export const galeria = [
  { foto: 'espacio-recepcion', titulo: 'Recepción', alt: 'Recepción de PhysioMove con la alfombra del logo PM en el piso' },
  { foto: 'espacio-gimnasio', titulo: 'Gimnasio', alt: 'Gimnasio de uso exclusivo para pacientes, con la pista azul y el cartel PHYSIOMOVE' },
  { foto: 'espacio-pista', titulo: 'La pista', alt: 'Pasillo central del centro con la pista de 4 metros y el mural de hexágonos' },
  { foto: 'espacio-fuerza', titulo: 'Sector de fuerza', alt: 'Sector de fuerza con barra, discos, mancuernas y el lema Medir para mejorar en la pared' },
  { foto: 'evaluacion-cancha', titulo: 'Evaluaciones', alt: 'Evaluación de rendimiento a una deportista en un gimnasio deportivo' },
  { foto: 'espacio-pasillo', titulo: 'En sesión', alt: 'Paciente entrenando con supervisión sobre la pista azul del centro' },
  { foto: 'equipo-hexagonos', titulo: 'El equipo', alt: 'Profesional de PhysioMove frente al mural con las etapas de la rehabilitación' },
  { foto: 'ninos-evaluacion', titulo: 'En el club', alt: 'Kinesiólogo registrando los datos de la evaluación de un chico durante un camp deportivo' },
];

/**
 * Banda de fotos del hero. Siete verticales elegidas porque muestran cosas
 * DISTINTAS: tratamiento manual, entrenamiento, evaluacion con tecnologia,
 * recovery, chicos y el metodo. Las 16 fotos del centro comparten pared, pasto
 * verde y pista azul: en tarjetas chicas, siete del mismo tipo leen como una
 * sola repetida.
 *
 * giro  = rotacion en grados (asimetrica a proposito: un arco simetrico lee a
 *         plantilla)
 * baja  = cuanto CAE la tarjeta por debajo del piso del hero, en fraccion de
 *         su alto: es lo que rompe la fila perfecta
 * vel   = velocidad relativa en el parallax del scroll
 */
/*
  Fotos nuevas del 2/9/2026 (las dejó el cliente en fotos-marcos/hero, 1 a 7).
  Pidió que la 4ta —el local con el cartel "Donde volvés al deporte"— quede en
  el medio de la banda, en PC y en mobile (el carrusel arranca centrado en ella,
  ver centrarBandaMobile en animaciones.js).
*/
export const bandaHero = [
  {
    foto: 'evaluacion-salto-rugby',
    giro: -2.6,
    baja: 0.55,
    vel: 0.55,
    alt: 'Jugador de rugby sobre la plataforma de salto durante una evaluación, con una kinesióloga revisando los datos en la laptop',
  },
  {
    foto: 'panam-sports',
    giro: 1.4,
    baja: 0.1,
    vel: 1,
    alt: 'Dos profesionales de PhysioMove frente al cartel de Panam Sports con los anillos olímpicos',
  },
  {
    foto: 'predio-afa',
    giro: -1.1,
    baja: 0.75,
    vel: 0.45,
    alt: 'Dos integrantes del equipo frente al mural de los campeones en el Predio de AFA',
  },
  {
    foto: 'centro-cartel',
    giro: 0.9,
    baja: 0,
    vel: 0.8,
    alt: 'Recepción y pista del gimnasio de PhysioMove bajo el cartel Kinesiología deportiva, donde volvés al deporte',
  },
  {
    foto: 'evaluacion-fuerza',
    giro: -1.8,
    baja: 0.6,
    vel: 1.15,
    alt: 'Plantel de rugby alrededor de la estación de registro durante una evaluación de fuerza en el gimnasio',
  },
  {
    foto: 'evaluacion-club',
    giro: 2.4,
    baja: 0.2,
    vel: 0.6,
    alt: 'Deportista acostado en la plataforma durante una evaluación de fuerza mientras dos profesionales registran los datos',
  },
  {
    foto: 'equipo-delegacion',
    giro: -2.2,
    baja: 0.85,
    vel: 1.05,
    alt: 'El equipo de PhysioMove junto a una delegación deportiva tras una jornada de evaluaciones en el gimnasio',
  },
];
