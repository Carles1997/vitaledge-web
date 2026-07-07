/* ============================================================
   VitalEdge Lab — i18n.js
   Client-side language switcher (es · en · ca · fr).
   Marks up text with data-i18n / data-i18n-html / data-i18n-attr,
   remembers the choice in localStorage and detects the browser
   language on first visit. Runs before main.js/animations.js so the
   hero headline is translated before it is split for its reveal.
   ============================================================ */
(function () {
  'use strict';

  var LANGS = [
    { code: 'es', name: 'Castellano', short: 'ES' },
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'ca', name: 'Català', short: 'CA' },
    { code: 'fr', name: 'Français', short: 'FR' }
  ];
  var CODES = LANGS.map(function (l) { return l.code; });
  var DEFAULT = 'es';
  var STORE_KEY = 'vel-lang';

  /* ---- Dictionary. es is the base; en/ca/fr fall back to es until filled ---- */
  var dict = {
    es: {
      /* meta */
      'meta.index.title': 'VitalEdge Lab — Comunicación visual para healthcare',
      'meta.index.description': 'Agencia de comunicación visual y diseño estratégico especializada en healthcare: clínicas, pharma y startups de salud. Convertimos lo complejo en claro.',
      'meta.index.ogDescription': 'Diseño estratégico para clínicas, pharma y startups de salud. Convertimos información compleja en sistemas visuales claros.',
      'meta.index.twDescription': 'Diseño estratégico para clínicas, pharma y startups de salud.',
      'meta.about.title': 'VitalEdge Lab — Sobre nosotros',
      'meta.about.description': 'Sobre VitalEdge Lab: nacimos para que el sector salud comunique mejor. Nuestra historia, misión, visión y valores en comunicación visual para healthcare.',
      'meta.about.ogDescription': 'Nacimos para que el sector salud comunique mejor. Nuestra historia, misión, visión y valores.',
      'meta.about.twDescription': 'Nuestra historia, misión, visión y valores.',

      /* nav + shared */
      'nav.servicios': 'Servicios',
      'nav.proyectos': 'Proyectos',
      'nav.metodologia': 'Metodología',
      'nav.about': 'About',
      'nav.contacto': 'Contacto',
      'nav.cta': 'Solicita una propuesta',
      'lang.aria': 'Cambiar idioma',

      /* hero */
      'hero.eyebrow': 'Healthcare · Comunicación visual',
      'hero.title': 'Transformamos materiales<br>Diseñamos <em class="accent">soluciones</em>',
      'hero.sub': 'Ayudamos a las marcas del sector salud a comunicar mejor, combinando estrategia, diseño y producción para generar impacto real en las personas.',
      'hero.cta': 'Solicita una propuesta',
      'hero.cta2': 'Ver servicios',

      /* intro */
      'intro.eyebrow': 'Quiénes somos',
      'intro.title': 'Elevamos la comunicación <em class="accent">en healthcare</em>',
      'intro.p1': 'VitalEdge Lab nace para elevar la comunicación en el sector healthcare. Transformamos información compleja en sistemas visuales claros, comprensibles y efectivos.',
      'intro.p2': 'Trabajamos exclusivamente en salud: clínicas, pharma, startups y entornos hospitalarios. Escuchamos, analizamos y diseñamos a medida. Sin plantillas. Sin fórmulas genéricas.',
      'diff.1.label': 'Especialización real',
      'diff.1.text': 'Solo healthcare. No trabajamos otros sectores.',
      'diff.2.label': 'Pensamiento estratégico',
      'diff.2.text': 'Partimos del problema, el contexto y el objetivo.',
      'diff.3.label': 'Tailor-made',
      'diff.3.text': 'Cada proyecto se diseña desde cero.',
      'diff.4.label': 'Enfoque humano',
      'diff.4.text': 'Diseñamos para personas que deciden, no para diagnósticos.',
      'diff.5.label': 'Diseño con función',
      'diff.5.text': 'El diseño no decora: mejora la comprensión y la confianza.',

      /* servicios */
      'servicios.eyebrow': 'Servicios',
      'servicios.title': 'No ofrecemos servicios aislados. Ofrecemos <em class="accent">sistemas completos</em> de comunicación.',
      'svc.a.title': 'Comunicación visual y diseño estratégico',
      'svc.a.lead': 'Transformamos información compleja en herramientas claras, útiles y coherentes con la marca.',
      'svc.a.li1': 'Arquitectura de información y narrativa visual',
      'svc.a.li2': 'Materiales médicos explicativos (tratamientos, procesos, formación)',
      'svc.a.li3': 'Presentaciones estratégicas para equipos médicos y comerciales',
      'svc.a.li4': 'Publicaciones científicas y pósters académicos',
      'svc.a.li5': 'Folletos, catálogos y dossiers corporativos',
      'svc.a.li6': 'Adaptación de contenido científico a lenguaje visual accesible',
      'svc.a.thesis': 'No diseñamos contenidos.<br>Hacemos que la información se entienda.',
      'svc.b.title': 'Materiales y sistemas corporativos healthcare',
      'svc.b.lead': 'Extendemos la identidad de marca a todos los puntos de contacto del entorno clínico y farmacéutico.',
      'svc.b.li1': 'Packaging médico y farmacéutico',
      'svc.b.li2': 'Kits promocionales y materiales de soporte clínico',
      'svc.b.li3': 'Branding aplicado a elementos hospitalarios (textiles, cajas, fungibles…)',
      'svc.b.li4': 'Uniformes y vestuario corporativo',
      'svc.b.li5': 'Señalética y elementos ambientales en clínicas y hospitales',
      'svc.b.thesis': 'Convertimos el entorno sanitario en una experiencia coherente de marca.',
      'svc.c.title': 'Espacios y experiencias',
      'svc.c.lead': 'Diseñamos espacios que comunican, posicionan y generan impacto en entornos competitivos.',
      'svc.c.li1': 'Conceptualización estratégica de espacios y stands',
      'svc.c.li2': 'Diseño 3D y visualización de experiencia',
      'svc.c.li3': 'Producción y montaje completo',
      'svc.c.li4': 'Adaptación a congresos médicos y ferias internacionales',
      'svc.c.li5': 'Activaciones en clínicas, farmacias y retail health',
      'svc.c.li6': 'Gestión y supervisión on-site',
      'svc.c.thesis': 'No diseñamos stands.<br>Diseñamos presencia de marca.',
      'svc.d.title': 'Branding e identidad',
      'svc.d.lead': 'Construimos marcas preparadas para comunicar donde la confianza lo es todo.',
      'svc.d.li1': 'Creación de marca desde cero',
      'svc.d.li2': 'Identidad visual completa',
      'svc.d.li3': 'Sistemas gráficos coherentes',
      'svc.d.li4': 'Manuales de marca y guías de uso',
      'svc.d.li5': 'Rebranding estratégico',
      'svc.d.thesis': 'Una identidad clara no solo se reconoce.<br>Se confía.',

      /* cifras */
      'cifras.title': 'La <em class="accent">confianza</em>, en cifras',
      'cifras.l1': 'Años de experiencia',
      'cifras.l2': 'Profesionales confían en nosotros',
      'cifras.l3': 'Servicio personalizado',

      /* proyectos */
      'proyectos.eyebrow': 'Proyectos',
      'proyectos.title': 'Experiencias y espacios',
      'proj.1.cat': 'Branding',
      'proj.1.title': 'Identidad visual estratégica para marcas healthcare',
      'proj.2.cat': 'Comunicación visual',
      'proj.2.title': 'Diseño de comunicación científica, publicaciones y pósteres de ensayos clínicos',
      'proj.3.cat': 'Packaging',
      'proj.3.title': 'Productos farmacéuticos y dermocosméticos',
      'proj.4.cat': 'Stands',
      'proj.4.title': 'Diseño, producción y montaje de espacios para congresos y eventos',
      'proj.5.cat': 'Espacios',
      'proj.5.title': 'Diseño de espacios para clínicas, hospitales y retail healthcare',
      'proj.6.cat': 'Servicio 360º',
      'proj.6.title': 'Gestión integral de la presencia de tu marca en congresos, desde el concepto creativo hasta la ejecución final',

      /* metodología */
      'metodologia.eyebrow': 'Cómo trabajamos',
      'metodologia.title': 'Un proceso claro, de principio a fin',
      'method.1.title': 'Briefing y análisis',
      'method.1.desc': 'Escuchamos el reto, el contexto y los objetivos.',
      'method.2.title': 'Conceptualización',
      'method.2.desc': 'Definimos la idea y la estrategia visual.',
      'method.3.title': 'Diseño',
      'method.3.desc': 'Damos forma al sistema, con precisión y detalle.',
      'method.4.title': 'Producción',
      'method.4.desc': 'Llevamos el diseño a materiales y formatos reales.',
      'method.5.title': 'Implementación',
      'method.5.desc': 'Desplegamos la solución en cada punto de contacto.',
      'method.6.title': 'Seguimiento',
      'method.6.desc': 'Medimos, ajustamos y acompañamos el resultado.',

      /* contacto */
      'contacto.eyebrow': 'Contacto',
      'contacto.title': '¿Hablamos de tu proyecto?',
      'contacto.sub': 'Si necesitas comunicar mejor, te ayudamos a convertir tu idea en una solución real.',
      'form.nombre': 'Nombre',
      'form.empresa': 'Empresa',
      'form.email': 'Email',
      'form.telefono': 'Teléfono',
      'form.tipo': 'Tipo de proyecto',
      'form.tipoPlaceholder': 'Selecciona una opción',
      'form.opt1': 'Comunicación visual',
      'form.opt2': 'Espacios y stands',
      'form.opt3': 'Branding',
      'form.opt4': 'Otro',
      'form.descripcion': 'Descripción del proyecto',
      'form.timing': 'Timing aproximado <span class="field__opt">(opcional)</span>',
      'form.timingPlaceholder': 'Ej. próximo trimestre',
      'form.submit': 'Solicitar propuesta',
      'contactinfo.write': 'Escríbenos',
      'contactinfo.where': 'Dónde estamos',
      'contactinfo.follow': 'Síguenos',

      /* footer */
      'footer.tagline': 'Comunicación visual para healthcare.',
      'footer.explora': 'Explora',
      'footer.estudios': 'Estudios',
      'footer.social': 'Social',
      'footer.legal': 'Comunicación visual para healthcare',

      /* about page */
      'about.eyebrow': 'Sobre nosotros',
      'about.title': 'Nuestra historia',
      'about.lead': 'VitalEdge Lab nace al detectar una carencia clara: el sector salud necesita comunicar mejor. La comunicación médica suele ser compleja, fría o poco diferenciada. Trabajamos para cambiar eso: marcas healthcare más claras, más humanas y más relevantes.',
      'about.mision.label': 'Misión',
      'about.mision.text': 'Resolver retos de comunicación en healthcare mediante soluciones visuales estratégicas, claras y centradas en las personas.',
      'about.vision.label': 'Visión',
      'about.vision.text': 'Convertirnos en el partner de referencia en comunicación visual para healthcare, elevando el estándar del sector a través de diseño con propósito.',
      'about.valores.eyebrow': 'Valores',
      'about.valores.title': 'En qué creemos',
      'about.val.1.label': 'Especialización',
      'about.val.1.text': 'Solo healthcare.',
      'about.val.2.label': 'Escucha activa',
      'about.val.2.text': 'Cada proyecto empieza por entender a las personas.',
      'about.val.3.label': 'Tailor-made',
      'about.val.3.text': 'No creemos en soluciones genéricas.',
      'about.val.4.label': 'Rigor y claridad',
      'about.val.4.text': 'Simplificamos lo complejo sin perder precisión.',
      'about.val.5.label': 'Humanización',
      'about.val.5.text': 'Diseñamos para personas, no para patologías.',
      'about.val.6.label': 'Impacto real',
      'about.val.6.text': 'El éxito se mide en comprensión, confianza y resultado.',
      'about.cta.title': '¿Hablamos de tu proyecto?',
      'about.cta.sub': 'Convertimos tu idea en una solución real.',
      'about.cta.btn': 'Solicita una propuesta'
    },
    en: {
      /* meta */
      'meta.index.title': 'VitalEdge Lab — Visual communication for healthcare',
      'meta.index.description': 'Visual communication and strategic design agency specialized in healthcare: clinics, pharma and health startups. We turn the complex into the clear.',
      'meta.index.ogDescription': 'Strategic design for clinics, pharma and health startups. We turn complex information into clear visual systems.',
      'meta.index.twDescription': 'Strategic design for clinics, pharma and health startups.',
      'meta.about.title': 'VitalEdge Lab — About us',
      'meta.about.description': 'About VitalEdge Lab: we were born to help healthcare communicate better. Our story, mission, vision and values in visual communication for healthcare.',
      'meta.about.ogDescription': 'We were born to help healthcare communicate better. Our story, mission, vision and values.',
      'meta.about.twDescription': 'Our story, mission, vision and values.',

      /* nav + shared */
      'nav.servicios': 'Services',
      'nav.proyectos': 'Projects',
      'nav.metodologia': 'Methodology',
      'nav.about': 'About',
      'nav.contacto': 'Contact',
      'nav.cta': 'Request a proposal',
      'lang.aria': 'Change language',

      /* hero */
      'hero.eyebrow': 'Healthcare · Visual communication',
      'hero.title': 'We transform materials<br>We design <em class="accent">solutions</em>',
      'hero.sub': 'We help healthcare brands communicate better, combining strategy, design and production to create real impact on people.',
      'hero.cta': 'Request a proposal',
      'hero.cta2': 'View services',

      /* intro */
      'intro.eyebrow': 'Who we are',
      'intro.title': 'We elevate communication <em class="accent">in healthcare</em>',
      'intro.p1': 'VitalEdge Lab was born to elevate communication in the healthcare sector. We transform complex information into clear, understandable and effective visual systems.',
      'intro.p2': 'We work exclusively in health: clinics, pharma, startups and hospital environments. We listen, analyze and design to measure. No templates. No generic formulas.',
      'diff.1.label': 'Real specialization',
      'diff.1.text': 'Healthcare only. We don’t work in other sectors.',
      'diff.2.label': 'Strategic thinking',
      'diff.2.text': 'We start from the problem, the context and the goal.',
      'diff.3.label': 'Tailor-made',
      'diff.3.text': 'Every project is designed from scratch.',
      'diff.4.label': 'Human focus',
      'diff.4.text': 'We design for people who decide, not for diagnoses.',
      'diff.5.label': 'Design with function',
      'diff.5.text': 'Design doesn’t decorate: it improves understanding and trust.',

      /* servicios */
      'servicios.eyebrow': 'Services',
      'servicios.title': 'We don’t offer isolated services. We offer <em class="accent">complete systems</em> of communication.',
      'svc.a.title': 'Visual communication and strategic design',
      'svc.a.lead': 'We transform complex information into clear, useful tools that are consistent with the brand.',
      'svc.a.li1': 'Information architecture and visual narrative',
      'svc.a.li2': 'Explanatory medical materials (treatments, processes, training)',
      'svc.a.li3': 'Strategic presentations for medical and sales teams',
      'svc.a.li4': 'Scientific publications and academic posters',
      'svc.a.li5': 'Brochures, catalogs and corporate dossiers',
      'svc.a.li6': 'Adapting scientific content into accessible visual language',
      'svc.a.thesis': 'We don’t design content.<br>We make information understood.',
      'svc.b.title': 'Corporate healthcare materials and systems',
      'svc.b.lead': 'We extend brand identity to every touchpoint of the clinical and pharmaceutical environment.',
      'svc.b.li1': 'Medical and pharmaceutical packaging',
      'svc.b.li2': 'Promotional kits and clinical support materials',
      'svc.b.li3': 'Branding applied to hospital elements (textiles, boxes, consumables…)',
      'svc.b.li4': 'Uniforms and corporate workwear',
      'svc.b.li5': 'Signage and environmental elements in clinics and hospitals',
      'svc.b.thesis': 'We turn the healthcare environment into a coherent brand experience.',
      'svc.c.title': 'Spaces and experiences',
      'svc.c.lead': 'We design spaces that communicate, position and create impact in competitive environments.',
      'svc.c.li1': 'Strategic conceptualization of spaces and stands',
      'svc.c.li2': '3D design and experience visualization',
      'svc.c.li3': 'Full production and assembly',
      'svc.c.li4': 'Adaptation for medical congresses and international trade fairs',
      'svc.c.li5': 'Activations in clinics, pharmacies and health retail',
      'svc.c.li6': 'On-site management and supervision',
      'svc.c.thesis': 'We don’t design stands.<br>We design brand presence.',
      'svc.d.title': 'Branding and identity',
      'svc.d.lead': 'We build brands ready to communicate where trust is everything.',
      'svc.d.li1': 'Brand creation from scratch',
      'svc.d.li2': 'Complete visual identity',
      'svc.d.li3': 'Coherent graphic systems',
      'svc.d.li4': 'Brand manuals and usage guides',
      'svc.d.li5': 'Strategic rebranding',
      'svc.d.thesis': 'A clear identity isn’t just recognized.<br>It’s trusted.',

      /* cifras */
      'cifras.title': '<em class="accent">Trust</em>, in numbers',
      'cifras.l1': 'Years of experience',
      'cifras.l2': 'Professionals trust us',
      'cifras.l3': 'Personalized service',

      /* proyectos */
      'proyectos.eyebrow': 'Projects',
      'proyectos.title': 'Experiences and spaces',
      'proj.1.cat': 'Branding',
      'proj.1.title': 'Strategic visual identity for healthcare brands',
      'proj.2.cat': 'Visual communication',
      'proj.2.title': 'Scientific communication design, publications and clinical-trial posters',
      'proj.3.cat': 'Packaging',
      'proj.3.title': 'Pharmaceutical and dermocosmetic products',
      'proj.4.cat': 'Stands',
      'proj.4.title': 'Design, production and assembly of spaces for congresses and events',
      'proj.5.cat': 'Spaces',
      'proj.5.title': 'Space design for clinics, hospitals and healthcare retail',
      'proj.6.cat': '360º service',
      'proj.6.title': 'End-to-end management of your brand’s presence at congresses, from creative concept to final execution',

      /* metodología */
      'metodologia.eyebrow': 'How we work',
      'metodologia.title': 'A clear process, from start to finish',
      'method.1.title': 'Briefing and analysis',
      'method.1.desc': 'We listen to the challenge, the context and the objectives.',
      'method.2.title': 'Conceptualization',
      'method.2.desc': 'We define the idea and the visual strategy.',
      'method.3.title': 'Design',
      'method.3.desc': 'We shape the system, with precision and detail.',
      'method.4.title': 'Production',
      'method.4.desc': 'We bring the design to real materials and formats.',
      'method.5.title': 'Implementation',
      'method.5.desc': 'We roll out the solution across every touchpoint.',
      'method.6.title': 'Follow-up',
      'method.6.desc': 'We measure, adjust and support the result.',

      /* contacto */
      'contacto.eyebrow': 'Contact',
      'contacto.title': 'Shall we talk about your project?',
      'contacto.sub': 'If you need to communicate better, we’ll help you turn your idea into a real solution.',
      'form.nombre': 'Name',
      'form.empresa': 'Company',
      'form.email': 'Email',
      'form.telefono': 'Phone',
      'form.tipo': 'Project type',
      'form.tipoPlaceholder': 'Select an option',
      'form.opt1': 'Visual communication',
      'form.opt2': 'Spaces and stands',
      'form.opt3': 'Branding',
      'form.opt4': 'Other',
      'form.descripcion': 'Project description',
      'form.timing': 'Approximate timing <span class="field__opt">(optional)</span>',
      'form.timingPlaceholder': 'e.g. next quarter',
      'form.submit': 'Request proposal',
      'contactinfo.write': 'Write to us',
      'contactinfo.where': 'Where we are',
      'contactinfo.follow': 'Follow us',

      /* footer */
      'footer.tagline': 'Visual communication for healthcare.',
      'footer.explora': 'Explore',
      'footer.estudios': 'Studios',
      'footer.social': 'Social',
      'footer.legal': 'Visual communication for healthcare',

      /* about page */
      'about.eyebrow': 'About us',
      'about.title': 'Our story',
      'about.lead': 'VitalEdge Lab was born on spotting a clear gap: healthcare needs to communicate better. Medical communication is often complex, cold or undifferentiated. We work to change that: healthcare brands that are clearer, more human and more relevant.',
      'about.mision.label': 'Mission',
      'about.mision.text': 'To solve communication challenges in healthcare through strategic, clear and people-centered visual solutions.',
      'about.vision.label': 'Vision',
      'about.vision.text': 'To become the reference partner in visual communication for healthcare, raising the sector’s standard through design with purpose.',
      'about.valores.eyebrow': 'Values',
      'about.valores.title': 'What we believe in',
      'about.val.1.label': 'Specialization',
      'about.val.1.text': 'Healthcare only.',
      'about.val.2.label': 'Active listening',
      'about.val.2.text': 'Every project starts by understanding people.',
      'about.val.3.label': 'Tailor-made',
      'about.val.3.text': 'We don’t believe in generic solutions.',
      'about.val.4.label': 'Rigor and clarity',
      'about.val.4.text': 'We simplify the complex without losing precision.',
      'about.val.5.label': 'Humanization',
      'about.val.5.text': 'We design for people, not for pathologies.',
      'about.val.6.label': 'Real impact',
      'about.val.6.text': 'Success is measured in understanding, trust and results.',
      'about.cta.title': 'Shall we talk about your project?',
      'about.cta.sub': 'We turn your idea into a real solution.',
      'about.cta.btn': 'Request a proposal'
    },
    ca: {
      /* meta */
      'meta.index.title': 'VitalEdge Lab — Comunicació visual per a healthcare',
      'meta.index.description': 'Agència de comunicació visual i disseny estratègic especialitzada en healthcare: clíniques, pharma i startups de salut. Convertim allò complex en clar.',
      'meta.index.ogDescription': 'Disseny estratègic per a clíniques, pharma i startups de salut. Convertim la informació complexa en sistemes visuals clars.',
      'meta.index.twDescription': 'Disseny estratègic per a clíniques, pharma i startups de salut.',
      'meta.about.title': 'VitalEdge Lab — Sobre nosaltres',
      'meta.about.description': 'Sobre VitalEdge Lab: naixem perquè el sector salut comuniqui millor. La nostra història, missió, visió i valors en comunicació visual per a healthcare.',
      'meta.about.ogDescription': 'Naixem perquè el sector salut comuniqui millor. La nostra història, missió, visió i valors.',
      'meta.about.twDescription': 'La nostra història, missió, visió i valors.',

      /* nav + shared */
      'nav.servicios': 'Serveis',
      'nav.proyectos': 'Projectes',
      'nav.metodologia': 'Metodologia',
      'nav.about': 'About',
      'nav.contacto': 'Contacte',
      'nav.cta': 'Demana una proposta',
      'lang.aria': 'Canviar d’idioma',

      /* hero */
      'hero.eyebrow': 'Healthcare · Comunicació visual',
      'hero.title': 'Transformem materials<br>Dissenyem <em class="accent">solucions</em>',
      'hero.sub': 'Ajudem les marques del sector salut a comunicar millor, combinant estratègia, disseny i producció per generar un impacte real en les persones.',
      'hero.cta': 'Demana una proposta',
      'hero.cta2': 'Veure serveis',

      /* intro */
      'intro.eyebrow': 'Qui som',
      'intro.title': 'Elevem la comunicació <em class="accent">en healthcare</em>',
      'intro.p1': 'VitalEdge Lab neix per elevar la comunicació en el sector healthcare. Transformem informació complexa en sistemes visuals clars, comprensibles i efectius.',
      'intro.p2': 'Treballem exclusivament en salut: clíniques, pharma, startups i entorns hospitalaris. Escoltem, analitzem i dissenyem a mesura. Sense plantilles. Sense fórmules genèriques.',
      'diff.1.label': 'Especialització real',
      'diff.1.text': 'Només healthcare. No treballem altres sectors.',
      'diff.2.label': 'Pensament estratègic',
      'diff.2.text': 'Partim del problema, el context i l’objectiu.',
      'diff.3.label': 'Tailor-made',
      'diff.3.text': 'Cada projecte es dissenya des de zero.',
      'diff.4.label': 'Enfocament humà',
      'diff.4.text': 'Dissenyem per a persones que decideixen, no per a diagnòstics.',
      'diff.5.label': 'Disseny amb funció',
      'diff.5.text': 'El disseny no decora: millora la comprensió i la confiança.',

      /* servicios */
      'servicios.eyebrow': 'Serveis',
      'servicios.title': 'No oferim serveis aïllats. Oferim <em class="accent">sistemes complets</em> de comunicació.',
      'svc.a.title': 'Comunicació visual i disseny estratègic',
      'svc.a.lead': 'Transformem informació complexa en eines clares, útils i coherents amb la marca.',
      'svc.a.li1': 'Arquitectura de la informació i narrativa visual',
      'svc.a.li2': 'Materials mèdics explicatius (tractaments, processos, formació)',
      'svc.a.li3': 'Presentacions estratègiques per a equips mèdics i comercials',
      'svc.a.li4': 'Publicacions científiques i pòsters acadèmics',
      'svc.a.li5': 'Fullets, catàlegs i dossiers corporatius',
      'svc.a.li6': 'Adaptació de contingut científic a llenguatge visual accessible',
      'svc.a.thesis': 'No dissenyem continguts.<br>Fem que la informació s’entengui.',
      'svc.b.title': 'Materials i sistemes corporatius healthcare',
      'svc.b.lead': 'Estenem la identitat de marca a tots els punts de contacte de l’entorn clínic i farmacèutic.',
      'svc.b.li1': 'Packaging mèdic i farmacèutic',
      'svc.b.li2': 'Kits promocionals i materials de suport clínic',
      'svc.b.li3': 'Branding aplicat a elements hospitalaris (tèxtils, caixes, fungibles…)',
      'svc.b.li4': 'Uniformes i vestuari corporatiu',
      'svc.b.li5': 'Senyalització i elements ambientals en clíniques i hospitals',
      'svc.b.thesis': 'Convertim l’entorn sanitari en una experiència coherent de marca.',
      'svc.c.title': 'Espais i experiències',
      'svc.c.lead': 'Dissenyem espais que comuniquen, posicionen i generen impacte en entorns competitius.',
      'svc.c.li1': 'Conceptualització estratègica d’espais i estands',
      'svc.c.li2': 'Disseny 3D i visualització d’experiència',
      'svc.c.li3': 'Producció i muntatge complet',
      'svc.c.li4': 'Adaptació a congressos mèdics i fires internacionals',
      'svc.c.li5': 'Activacions en clíniques, farmàcies i retail health',
      'svc.c.li6': 'Gestió i supervisió on-site',
      'svc.c.thesis': 'No dissenyem estands.<br>Dissenyem presència de marca.',
      'svc.d.title': 'Branding i identitat',
      'svc.d.lead': 'Construïm marques preparades per comunicar on la confiança ho és tot.',
      'svc.d.li1': 'Creació de marca des de zero',
      'svc.d.li2': 'Identitat visual completa',
      'svc.d.li3': 'Sistemes gràfics coherents',
      'svc.d.li4': 'Manuals de marca i guies d’ús',
      'svc.d.li5': 'Rebranding estratègic',
      'svc.d.thesis': 'Una identitat clara no només es reconeix.<br>S’hi confia.',

      /* cifras */
      'cifras.title': 'La <em class="accent">confiança</em>, en xifres',
      'cifras.l1': 'Anys d’experiència',
      'cifras.l2': 'Professionals confien en nosaltres',
      'cifras.l3': 'Servei personalitzat',

      /* proyectos */
      'proyectos.eyebrow': 'Projectes',
      'proyectos.title': 'Experiències i espais',
      'proj.1.cat': 'Branding',
      'proj.1.title': 'Identitat visual estratègica per a marques healthcare',
      'proj.2.cat': 'Comunicació visual',
      'proj.2.title': 'Disseny de comunicació científica, publicacions i pòsters d’assajos clínics',
      'proj.3.cat': 'Packaging',
      'proj.3.title': 'Productes farmacèutics i dermocosmètics',
      'proj.4.cat': 'Estands',
      'proj.4.title': 'Disseny, producció i muntatge d’espais per a congressos i esdeveniments',
      'proj.5.cat': 'Espais',
      'proj.5.title': 'Disseny d’espais per a clíniques, hospitals i retail healthcare',
      'proj.6.cat': 'Servei 360º',
      'proj.6.title': 'Gestió integral de la presència de la teva marca en congressos, des del concepte creatiu fins a l’execució final',

      /* metodología */
      'metodologia.eyebrow': 'Com treballem',
      'metodologia.title': 'Un procés clar, de principi a fi',
      'method.1.title': 'Briefing i anàlisi',
      'method.1.desc': 'Escoltem el repte, el context i els objectius.',
      'method.2.title': 'Conceptualització',
      'method.2.desc': 'Definim la idea i l’estratègia visual.',
      'method.3.title': 'Disseny',
      'method.3.desc': 'Donem forma al sistema, amb precisió i detall.',
      'method.4.title': 'Producció',
      'method.4.desc': 'Portem el disseny a materials i formats reals.',
      'method.5.title': 'Implementació',
      'method.5.desc': 'Despleguem la solució a cada punt de contacte.',
      'method.6.title': 'Seguiment',
      'method.6.desc': 'Mesurem, ajustem i acompanyem el resultat.',

      /* contacto */
      'contacto.eyebrow': 'Contacte',
      'contacto.title': 'Parlem del teu projecte?',
      'contacto.sub': 'Si necessites comunicar millor, t’ajudem a convertir la teva idea en una solució real.',
      'form.nombre': 'Nom',
      'form.empresa': 'Empresa',
      'form.email': 'Email',
      'form.telefono': 'Telèfon',
      'form.tipo': 'Tipus de projecte',
      'form.tipoPlaceholder': 'Selecciona una opció',
      'form.opt1': 'Comunicació visual',
      'form.opt2': 'Espais i estands',
      'form.opt3': 'Branding',
      'form.opt4': 'Altres',
      'form.descripcion': 'Descripció del projecte',
      'form.timing': 'Timing aproximat <span class="field__opt">(opcional)</span>',
      'form.timingPlaceholder': 'Ex. pròxim trimestre',
      'form.submit': 'Demanar proposta',
      'contactinfo.write': 'Escriu-nos',
      'contactinfo.where': 'On som',
      'contactinfo.follow': 'Segueix-nos',

      /* footer */
      'footer.tagline': 'Comunicació visual per a healthcare.',
      'footer.explora': 'Explora',
      'footer.estudios': 'Estudis',
      'footer.social': 'Social',
      'footer.legal': 'Comunicació visual per a healthcare',

      /* about page */
      'about.eyebrow': 'Sobre nosaltres',
      'about.title': 'La nostra història',
      'about.lead': 'VitalEdge Lab neix en detectar una mancança clara: el sector salut necessita comunicar millor. La comunicació mèdica sol ser complexa, freda o poc diferenciada. Treballem per canviar-ho: marques healthcare més clares, més humanes i més rellevants.',
      'about.mision.label': 'Missió',
      'about.mision.text': 'Resoldre reptes de comunicació en healthcare mitjançant solucions visuals estratègiques, clares i centrades en les persones.',
      'about.vision.label': 'Visió',
      'about.vision.text': 'Convertir-nos en el partner de referència en comunicació visual per a healthcare, elevant l’estàndard del sector a través del disseny amb propòsit.',
      'about.valores.eyebrow': 'Valors',
      'about.valores.title': 'En què creiem',
      'about.val.1.label': 'Especialització',
      'about.val.1.text': 'Només healthcare.',
      'about.val.2.label': 'Escolta activa',
      'about.val.2.text': 'Cada projecte comença per entendre les persones.',
      'about.val.3.label': 'Tailor-made',
      'about.val.3.text': 'No creiem en solucions genèriques.',
      'about.val.4.label': 'Rigor i claredat',
      'about.val.4.text': 'Simplifiquem allò complex sense perdre precisió.',
      'about.val.5.label': 'Humanització',
      'about.val.5.text': 'Dissenyem per a persones, no per a patologies.',
      'about.val.6.label': 'Impacte real',
      'about.val.6.text': 'L’èxit es mesura en comprensió, confiança i resultat.',
      'about.cta.title': 'Parlem del teu projecte?',
      'about.cta.sub': 'Convertim la teva idea en una solució real.',
      'about.cta.btn': 'Demana una proposta'
    },
    fr: {
      /* meta */
      'meta.index.title': 'VitalEdge Lab — Communication visuelle pour le healthcare',
      'meta.index.description': 'Agence de communication visuelle et de design stratégique spécialisée dans le healthcare : cliniques, pharma et startups de santé. Nous rendons le complexe clair.',
      'meta.index.ogDescription': 'Design stratégique pour cliniques, pharma et startups de santé. Nous transformons l’information complexe en systèmes visuels clairs.',
      'meta.index.twDescription': 'Design stratégique pour cliniques, pharma et startups de santé.',
      'meta.about.title': 'VitalEdge Lab — À propos',
      'meta.about.description': 'À propos de VitalEdge Lab : nous sommes nés pour que le secteur de la santé communique mieux. Notre histoire, mission, vision et valeurs en communication visuelle pour le healthcare.',
      'meta.about.ogDescription': 'Nous sommes nés pour que le secteur de la santé communique mieux. Notre histoire, mission, vision et valeurs.',
      'meta.about.twDescription': 'Notre histoire, mission, vision et valeurs.',

      /* nav + shared */
      'nav.servicios': 'Services',
      'nav.proyectos': 'Projets',
      'nav.metodologia': 'Méthodologie',
      'nav.about': 'About',
      'nav.contacto': 'Contact',
      'nav.cta': 'Demander une proposition',
      'lang.aria': 'Changer de langue',

      /* hero */
      'hero.eyebrow': 'Healthcare · Communication visuelle',
      'hero.title': 'Nous transformons les matériaux<br>Nous concevons des <em class="accent">solutions</em>',
      'hero.sub': 'Nous aidons les marques du secteur de la santé à mieux communiquer, en combinant stratégie, design et production pour générer un impact réel sur les personnes.',
      'hero.cta': 'Demander une proposition',
      'hero.cta2': 'Voir les services',

      /* intro */
      'intro.eyebrow': 'Qui sommes-nous',
      'intro.title': 'Nous élevons la communication <em class="accent">en healthcare</em>',
      'intro.p1': 'VitalEdge Lab est né pour élever la communication dans le secteur du healthcare. Nous transformons l’information complexe en systèmes visuels clairs, compréhensibles et efficaces.',
      'intro.p2': 'Nous travaillons exclusivement dans la santé : cliniques, pharma, startups et environnements hospitaliers. Nous écoutons, analysons et concevons sur mesure. Sans modèles. Sans formules génériques.',
      'diff.1.label': 'Spécialisation réelle',
      'diff.1.text': 'Uniquement le healthcare. Nous ne travaillons pas d’autres secteurs.',
      'diff.2.label': 'Pensée stratégique',
      'diff.2.text': 'Nous partons du problème, du contexte et de l’objectif.',
      'diff.3.label': 'Sur mesure',
      'diff.3.text': 'Chaque projet est conçu de zéro.',
      'diff.4.label': 'Approche humaine',
      'diff.4.text': 'Nous concevons pour des personnes qui décident, pas pour des diagnostics.',
      'diff.5.label': 'Un design utile',
      'diff.5.text': 'Le design ne décore pas : il améliore la compréhension et la confiance.',

      /* servicios */
      'servicios.eyebrow': 'Services',
      'servicios.title': 'Nous ne proposons pas de services isolés. Nous proposons des <em class="accent">systèmes complets</em> de communication.',
      'svc.a.title': 'Communication visuelle et design stratégique',
      'svc.a.lead': 'Nous transformons l’information complexe en outils clairs, utiles et cohérents avec la marque.',
      'svc.a.li1': 'Architecture de l’information et narration visuelle',
      'svc.a.li2': 'Supports médicaux explicatifs (traitements, processus, formation)',
      'svc.a.li3': 'Présentations stratégiques pour les équipes médicales et commerciales',
      'svc.a.li4': 'Publications scientifiques et posters académiques',
      'svc.a.li5': 'Brochures, catalogues et dossiers corporate',
      'svc.a.li6': 'Adaptation de contenu scientifique en langage visuel accessible',
      'svc.a.thesis': 'Nous ne concevons pas des contenus.<br>Nous rendons l’information compréhensible.',
      'svc.b.title': 'Supports et systèmes corporate healthcare',
      'svc.b.lead': 'Nous étendons l’identité de marque à tous les points de contact de l’environnement clinique et pharmaceutique.',
      'svc.b.li1': 'Packaging médical et pharmaceutique',
      'svc.b.li2': 'Kits promotionnels et supports d’accompagnement clinique',
      'svc.b.li3': 'Branding appliqué aux éléments hospitaliers (textiles, boîtes, consommables…)',
      'svc.b.li4': 'Uniformes et tenues corporate',
      'svc.b.li5': 'Signalétique et éléments d’ambiance dans les cliniques et hôpitaux',
      'svc.b.thesis': 'Nous transformons l’environnement de santé en une expérience de marque cohérente.',
      'svc.c.title': 'Espaces et expériences',
      'svc.c.lead': 'Nous concevons des espaces qui communiquent, positionnent et créent de l’impact dans des environnements compétitifs.',
      'svc.c.li1': 'Conceptualisation stratégique d’espaces et de stands',
      'svc.c.li2': 'Design 3D et visualisation de l’expérience',
      'svc.c.li3': 'Production et montage complets',
      'svc.c.li4': 'Adaptation aux congrès médicaux et salons internationaux',
      'svc.c.li5': 'Activations en cliniques, pharmacies et retail santé',
      'svc.c.li6': 'Gestion et supervision sur site',
      'svc.c.thesis': 'Nous ne concevons pas des stands.<br>Nous concevons une présence de marque.',
      'svc.d.title': 'Branding et identité',
      'svc.d.lead': 'Nous construisons des marques prêtes à communiquer là où la confiance est primordiale.',
      'svc.d.li1': 'Création de marque de zéro',
      'svc.d.li2': 'Identité visuelle complète',
      'svc.d.li3': 'Systèmes graphiques cohérents',
      'svc.d.li4': 'Chartes de marque et guides d’utilisation',
      'svc.d.li5': 'Rebranding stratégique',
      'svc.d.thesis': 'Une identité claire ne se reconnaît pas seulement.<br>Elle inspire confiance.',

      /* cifras */
      'cifras.title': 'La <em class="accent">confiance</em>, en chiffres',
      'cifras.l1': 'Années d’expérience',
      'cifras.l2': 'Professionnels nous font confiance',
      'cifras.l3': 'Service personnalisé',

      /* proyectos */
      'proyectos.eyebrow': 'Projets',
      'proyectos.title': 'Expériences et espaces',
      'proj.1.cat': 'Branding',
      'proj.1.title': 'Identité visuelle stratégique pour les marques healthcare',
      'proj.2.cat': 'Communication visuelle',
      'proj.2.title': 'Design de communication scientifique, publications et posters d’essais cliniques',
      'proj.3.cat': 'Packaging',
      'proj.3.title': 'Produits pharmaceutiques et dermocosmétiques',
      'proj.4.cat': 'Stands',
      'proj.4.title': 'Conception, production et montage d’espaces pour congrès et événements',
      'proj.5.cat': 'Espaces',
      'proj.5.title': 'Conception d’espaces pour cliniques, hôpitaux et retail healthcare',
      'proj.6.cat': 'Service 360º',
      'proj.6.title': 'Gestion intégrale de la présence de votre marque dans les congrès, du concept créatif à l’exécution finale',

      /* metodología */
      'metodologia.eyebrow': 'Comment nous travaillons',
      'metodologia.title': 'Un processus clair, du début à la fin',
      'method.1.title': 'Briefing et analyse',
      'method.1.desc': 'Nous écoutons le défi, le contexte et les objectifs.',
      'method.2.title': 'Conceptualisation',
      'method.2.desc': 'Nous définissons l’idée et la stratégie visuelle.',
      'method.3.title': 'Design',
      'method.3.desc': 'Nous donnons forme au système, avec précision et souci du détail.',
      'method.4.title': 'Production',
      'method.4.desc': 'Nous concrétisons le design en matériaux et formats réels.',
      'method.5.title': 'Implémentation',
      'method.5.desc': 'Nous déployons la solution sur chaque point de contact.',
      'method.6.title': 'Suivi',
      'method.6.desc': 'Nous mesurons, ajustons et accompagnons le résultat.',

      /* contacto */
      'contacto.eyebrow': 'Contact',
      'contacto.title': 'Parlons de votre projet ?',
      'contacto.sub': 'Si vous avez besoin de mieux communiquer, nous vous aidons à transformer votre idée en une solution réelle.',
      'form.nombre': 'Nom',
      'form.empresa': 'Entreprise',
      'form.email': 'Email',
      'form.telefono': 'Téléphone',
      'form.tipo': 'Type de projet',
      'form.tipoPlaceholder': 'Sélectionnez une option',
      'form.opt1': 'Communication visuelle',
      'form.opt2': 'Espaces et stands',
      'form.opt3': 'Branding',
      'form.opt4': 'Autre',
      'form.descripcion': 'Description du projet',
      'form.timing': 'Timing approximatif <span class="field__opt">(optionnel)</span>',
      'form.timingPlaceholder': 'Ex. prochain trimestre',
      'form.submit': 'Demander une proposition',
      'contactinfo.write': 'Écrivez-nous',
      'contactinfo.where': 'Où nous sommes',
      'contactinfo.follow': 'Suivez-nous',

      /* footer */
      'footer.tagline': 'Communication visuelle pour le healthcare.',
      'footer.explora': 'Explorer',
      'footer.estudios': 'Studios',
      'footer.social': 'Social',
      'footer.legal': 'Communication visuelle pour le healthcare',

      /* about page */
      'about.eyebrow': 'À propos',
      'about.title': 'Notre histoire',
      'about.lead': 'VitalEdge Lab est né en détectant un manque clair : le secteur de la santé a besoin de mieux communiquer. La communication médicale est souvent complexe, froide ou peu différenciée. Nous travaillons pour changer cela : des marques healthcare plus claires, plus humaines et plus pertinentes.',
      'about.mision.label': 'Mission',
      'about.mision.text': 'Résoudre les défis de communication dans le healthcare grâce à des solutions visuelles stratégiques, claires et centrées sur les personnes.',
      'about.vision.label': 'Vision',
      'about.vision.text': 'Devenir le partenaire de référence en communication visuelle pour le healthcare, en élevant le standard du secteur grâce à un design porteur de sens.',
      'about.valores.eyebrow': 'Valeurs',
      'about.valores.title': 'Ce en quoi nous croyons',
      'about.val.1.label': 'Spécialisation',
      'about.val.1.text': 'Uniquement le healthcare.',
      'about.val.2.label': 'Écoute active',
      'about.val.2.text': 'Chaque projet commence par comprendre les personnes.',
      'about.val.3.label': 'Sur mesure',
      'about.val.3.text': 'Nous ne croyons pas aux solutions génériques.',
      'about.val.4.label': 'Rigueur et clarté',
      'about.val.4.text': 'Nous simplifions le complexe sans perdre en précision.',
      'about.val.5.label': 'Humanisation',
      'about.val.5.text': 'Nous concevons pour des personnes, pas pour des pathologies.',
      'about.val.6.label': 'Impact réel',
      'about.val.6.text': 'Le succès se mesure en compréhension, confiance et résultat.',
      'about.cta.title': 'Parlons de votre projet ?',
      'about.cta.sub': 'Nous transformons votre idée en une solution réelle.',
      'about.cta.btn': 'Demander une proposition'
    }
  };

  function t(lang, key) {
    var v = dict[lang] && dict[lang][key];
    if (v == null) v = dict[DEFAULT][key];
    return v == null ? null : v;
  }

  function setMetaAttr(el, attr, val) {
    if (val != null) el.setAttribute(attr, val);
  }

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = t(lang, el.getAttribute('data-i18n'));
      if (val == null) return;
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
      else el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length !== 2) return;
        setMetaAttr(el, bits[0].trim(), t(lang, bits[1].trim()));
      });
    });

    updateSwitcher(lang);
  }

  function updateSwitcher(lang) {
    var meta = LANGS.filter(function (l) { return l.code === lang; })[0] || LANGS[0];
    document.querySelectorAll('[data-lang-current]').forEach(function (el) {
      el.textContent = meta.short;
    });
    document.querySelectorAll('[data-lang]').forEach(function (opt) {
      opt.setAttribute('aria-selected', String(opt.getAttribute('data-lang') === lang));
    });
  }

  function detect() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved && CODES.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var nav = (navigator.language || DEFAULT).slice(0, 2).toLowerCase();
    return CODES.indexOf(nav) !== -1 ? nav : DEFAULT;
  }

  function setLang(lang) {
    if (CODES.indexOf(lang) === -1) return;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  function initSwitcher() {
    document.querySelectorAll('[data-lang-switch]').forEach(function (sw) {
      var btn = sw.querySelector('[data-lang-btn]');
      var menu = sw.querySelector('[data-lang-menu]');
      if (!btn || !menu) return;

      function open(state) {
        menu.hidden = !state;
        btn.setAttribute('aria-expanded', String(state));
        sw.classList.toggle('is-open', state);
      }

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        open(menu.hidden);
      });

      menu.querySelectorAll('[data-lang]').forEach(function (opt) {
        opt.addEventListener('click', function () {
          setLang(opt.getAttribute('data-lang'));
          open(false);
        });
      });

      document.addEventListener('click', function (e) {
        if (!sw.contains(e.target)) open(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') open(false);
      });
    });
  }

  apply(detect());
  initSwitcher();

  window.VELi18n = { set: setLang, apply: apply };
})();
