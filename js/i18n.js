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
    en: {},
    ca: {},
    fr: {}
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
