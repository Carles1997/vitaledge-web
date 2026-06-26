# BRIEFING — VitalEdge Lab
### Document de construcció de la pàgina web · v1.0

---

## 0. Com usar aquest document (llegir primer, Claude Code)

Aquest fitxer és l'especificació completa de la web de **VitalEdge Lab**. Conté la direcció d'art, els tokens de disseny, el contingut definitiu, les animacions i les interaccions de cada secció.

**Instruccions de treball:**

1. Llegeix també `.claude/skills/frontend-design.md` abans de començar i aplica'n els principis.
2. Segueix la direcció d'art de la **secció 4 al peu de la lletra**: cada color i cada tipografia ha de derivar dels tokens definits, no de valors per defecte.
3. L'estètica és *warm minimalism / quiet luxury* aplicat a healthcare. La qualitat es juga en la **precisió** (espaiat, ritme, tipografia), no en la decoració. Davant del dubte, treu un element abans d'afegir-ne un.
4. Construeix per fases segons l'**ordre de la secció 11**. No ho facis tot d'un cop sense revisar.
5. Stack: **HTML + CSS + JavaScript vanilla**, amb **GSAP + ScrollTrigger** per a animació i **Lenis** per a scroll suau. Res de frameworks pesats.
6. El formulari de contacte ha de funcionar amb **Netlify Forms** (secció 7.8).
7. Idioma del lloc: **espanyol** (`<html lang="es">`). Tots els textos definitius són a la secció 7.

---

## 1. El projecte en una frase

> VitalEdge Lab és una agència de **comunicació visual i disseny estratègic especialitzada exclusivament en el sector healthcare** (clíniques, pharma, startups de salut i entorns hospitalaris). La web és un **escaparat de credibilitat i un canal de contacte**: ha de transmetre rigor, claredat i confiança, i convidar a sol·licitar una proposta.

**Públic objectiu:** responsables de marca, màrqueting i direcció de pharma, clíniques i startups de salut. Persones que prenen decisions i que valoren la professionalitat i el detall.

**Objectiu principal de la web (la seva única feina):** que un visitant qualificat entengui en menys d'un minut què fa VitalEdge i acabi omplint el formulari de contacte.

---

## 2. Marca, posicionament i to de veu

**Posicionament:** No són un proveïdor de "peces de disseny". Són un partner estratègic que converteix informació mèdica complexa en sistemes de comunicació clars, humans i funcionals.

**Personalitat de marca:** sofisticada, serena, precisa, humana. Premium però accessible. Editorial però rigorosa.

**To de veu (per a tots els textos i microcopy):**
- Frases curtes, afirmatives, amb ritme. El document de contingut ja té aquest estil: respecta'l.
- Veu activa. Concret abans que enginyós.
- Estructura de "tesi": una afirmació breu i contundent que tanca cada bloc (ex: *"No diseñamos stands. Diseñamos presencia de marca."*). Aquestes frases són un actiu de marca: tracta-les com a element de disseny, amb pes tipogràfic propi.
- Res de farciment ni de llenguatge corporatiu buit.

---

## 3. Stack tècnic i estructura de fitxers

```
vitaledge-web/
├── index.html              # Home (one-page amb àncores) + secció serveis ampliada
├── about.html              # About Us (pàgina secundària)
├── css/
│   ├── style.css           # Estils globals + tokens (CSS variables)
│   └── (opcional) sections.css
├── js/
│   ├── main.js             # Inicialització, Lenis, nav, formulari
│   └── animations.js       # GSAP + ScrollTrigger
├── assets/
│   ├── img/                # Imatges (placeholders de moment)
│   └── favicon.svg
├── .claude/skills/         # Skills (ja instal·lat: frontend-design)
└── netlify.toml            # (opcional) config de build/redireccions
```

**Llibreries (via CDN, sense build):**
- GSAP 3 + ScrollTrigger
- Lenis (scroll suau)
- Google Fonts (veure secció 4.4)

**Hosting:** Netlify (ja connectat amb el repo `Carles1997/vitaledge-web`, desplegament automàtic a cada push).

---

## 4. Direcció d'art (Design Tokens)

### 4.1 Concepte

**"Claredat a partir de la complexitat."** Tot el llenguatge visual ha de comunicar el que fa VitalEdge: agafar el complex (medicina, ciència) i tornar-lo clar, ordenat i confiable. Es tradueix en: molt espai en blanc, jerarquia tipogràfica nítida, ritme pausat, cap soroll visual.

### 4.2 Element signatura (el que farà memorable la web)

El **marc circular tipus "lent de laboratori / placa de Petri"**. VitalEdge *Lab* + healthcare → cercles com a sistema visual recurrent:
- Les imatges de projecte i d'equip es presenten dins de **cercles o càpsules** (no rectangles convencionals).
- Un **sistema subtil de punts/cercles** com a textura de fons en seccions clau (eco de les imatges de referència: paret de cercles de la recepció, plaques de Petri amb llavors, campanes de vidre).
- Aquest motiu és l'únic lloc on "gastem audàcia". La resta es manté quiet i disciplinat.

> Nota per Claude Code: aquest signature substitueix el típic accent terracota sobre crema. **No usar terracota.** L'accent és verd sàlvia/eucaliptus (sota), que connecta amb healthcare i diferencia la web del default beix.

### 4.3 Paleta de color

Definir-la com a CSS variables a `:root`. Base càlida neutra + accent sàlvia clínic + text espresso.

| Token | HEX | Ús |
|---|---|---|
| `--bone` | `#F4F0E8` | Fons principal (warm neutral) |
| `--ivory` | `#FBF8F2` | Seccions/targetes elevades |
| `--linen` | `#E7E3D8` | Targetes, divisòries, fons secundari |
| `--clay` | `#BBAE9C` | Detalls, captions, estats inactius |
| `--sage` | `#7C8A78` | **Accent** (CTAs, hover, detalls, signature) |
| `--sage-deep` | `#5C6A58` | Hover de l'accent |
| `--espresso` | `#2B2722` | Text principal i titulars |

Regles: fons sempre càlid, mai blanc pur. Text sempre `--espresso` (no negre pur). L'accent `--sage` s'usa amb **molta restricció**: CTAs, una paraula destacada, fletxes, línies de detall.

### 4.4 Tipografia

Carregar de Google Fonts. Parella deliberadament poc "default":

- **Display (titulars):** `Fraunces` — serif amb caràcter i calidesa, amb cursiva editorial per a paraules destacades. Pesos 300–500. Optical sizing activat.
- **Body (text corrent):** `Hanken Grotesk` — sans humanista, càlida i molt llegible. Pesos 400/500.
- **Utility (eyebrows, labels, dades):** `Jost` — geomètrica, en MAJÚSCULES amb tracking ample (`letter-spacing: 0.18em`) per als petits títols de secció.

**Escala tipogràfica (desktop, ajustar amb `clamp()` per a fluïdesa):**

| Rol | Família | Mida | Pes | Notes |
|---|---|---|---|---|
| Hero H1 | Fraunces | `clamp(2.8rem, 6vw, 5.5rem)` | 300–400 | line-height 1.05, alguna paraula en *cursiva* |
| H2 secció | Fraunces | `clamp(2rem, 4vw, 3.25rem)` | 400 | |
| H3 | Fraunces | `1.5rem` | 400 | |
| Eyebrow / label | Jost | `0.8rem` | 500 | UPPERCASE, tracking 0.18em, color `--clay` o `--sage` |
| Body | Hanken Grotesk | `clamp(1rem, 1.1vw, 1.125rem)` | 400 | line-height 1.65, max-width ~62ch |
| Frase-tesi | Fraunces | `1.6rem` | 400 | cursiva, color `--espresso`, destacada |
| Caption/meta | Jost | `0.8rem` | 400 | `--clay` |

### 4.5 Espaiat, grid i radius

- **Ritme vertical generós:** seccions amb `padding-block: clamp(6rem, 12vh, 10rem)`. L'espai en blanc és part del missatge.
- **Grid:** contenidor màx. `1280px`, gutters amples. Layouts editorials **asimètrics** (no tot centrat): text a una columna estreta, imatge desplaçada.
- **Radius:** suau però present. `--radius: 14px` per a targetes; cercles complets per al signature.
- **Línies:** divisòries hairline (`1px`, `--linen` o `--clay` al 40%).

### 4.6 Imatgeria

- Fotografia càlida, llum natural, muted/desaturada. Tons que casin amb la paleta.
- De moment **placeholders** amb el color `--linen`/`--clay` i ràtios definits (els reemplaçarà el client). Marca clarament cada placeholder amb la mida recomanada.
- Recurs preferent: imatges dins de **cercles/càpsules** (signature).

---

## 5. Sistema d'animació i interacció (global)

**Filosofia:** moviment orquestrat i discret. Massa animació fa que sembli generat per IA. Un bon reveal val més que deu efectes dispersos.

- **Scroll suau:** Lenis a tota la pàgina.
- **Reveal d'entrada (scroll):** elements pugen `translateY(28px)` + `opacity 0→1`, durada ~0.9s, `ease: power3.out`, amb `stagger` de 0.08s entre fills. Via ScrollTrigger (`start: "top 80%"`).
- **Hero (page-load):** seqüència orquestrada una sola vegada — l'eyebrow apareix, després el H1 es revela línia per línia (clip/mask), després subtítol i CTA. Ritme lent i segur.
- **Imatges:** reveal amb `clip-path` (wipe vertical) o `scale(1.06)→1` + opacity.
- **Números (stats/metodologia):** comptador animat de 0 al valor quan entra a viewport.
- **Navbar:** transparent sobre el hero → fons `--ivory` amb hairline inferior en fer scroll cap avall (canvi suau).
- **Hover (microinteraccions):**
  - CTAs: la fletxa `→` es desplaça lleugerament; fons passa a `--sage-deep`.
  - Enllaços de menú: subratllat que es dibuixa d'esquerra a dreta.
  - Targetes de servei/projecte: elevació subtil + la imatge fa zoom lent dins del seu marc.
- **Signature en moviment:** els cercles de fons poden tenir un parallax molt lleu en fer scroll.
- **Obligatori:** respectar `prefers-reduced-motion: reduce` → desactivar transforms i deixar només fades instantanis. Focus de teclat sempre visible.

---

## 6. Arquitectura de la web (sitemap)

Web essencialment **one-page** (Home) amb navegació per àncores, més una pàgina secundària **About Us**.

```
Home (index.html)
 ├─ [Navbar fixa]
 ├─ #hero            Hero
 ├─ #intro           Qui som (intro) + diferencial
 ├─ #servicios       Serveis (4 blocs A–D)
 ├─ #proyectos       Projectes / Portfoli
 ├─ #metodologia     Metodologia (6 fases)
 ├─ #contacto        Contacte + formulari
 └─ [Footer]

About Us (about.html)
 ├─ Historia
 ├─ Misión
 ├─ Visión
 └─ Valores
```

**Menú de navegació (ordre):** `Servicios · Proyectos · Metodología · About · Contacto`
A la dreta, CTA destacat: **"Solicita una propuesta"** (ancla a `#contacto`).
Logo a l'esquerra: **VitalEdge** *Lab* (Lab en cursiva Fraunces o en `--sage`).

---

## 7. Especificació secció per secció (amb textos definitius)

> Els textos següents són definitius però **es poden retallar/ajustar lleugerament** per ritme i neteja visual. Mantén sempre les frases-tesi.

### 7.1 Navbar

- Fixa a dalt, translúcida sobre el hero.
- Esquerra: logotip `VitalEdge Lab`. Centre/dreta: enllaços d'àncora. Extrem dret: botó `Solicita una propuesta`.
- En mobile: menú hamburguesa → overlay a pantalla completa amb fons `--bone` i enllaços en Fraunces grans.

### 7.2 Hero (`#hero`)

**Objectiu:** thesi de marca immediata. Cap imatge de stock genèrica protagonista; el protagonista és la **tipografia** + el signature de cercles subtils de fons.

- Eyebrow (Jost, `--sage`): `COMUNICACIÓN VISUAL · HEALTHCARE`
- H1 (Fraunces, gran): 
  > No diseñamos piezas. Diseñamos *soluciones*.

  *("soluciones" en cursiva i, opcionalment, en `--sage`)*
- Subtítol (Hanken Grotesk, màx ~60ch):
  > Ayudamos a las marcas del sector salud a comunicar mejor, combinando estrategia, diseño y producción para generar impacto real en las personas.
- CTA primari: `Solicita una propuesta` → `#contacto`
- CTA secundari (text + fletxa): `Ver servicios` → `#servicios`
- Fons: textura de cercles/punts molt subtil (signature), parallax lleu.

### 7.3 Intro — Qui som + Diferencial (`#intro`)

**Objectiu:** generar confiança ràpidament. Layout editorial asimètric.

Eyebrow: `QUIÉNES SOMOS`

Text d'intro (es pot condensar):
> VitalEdge Lab nace para elevar la comunicación en el sector healthcare. Transformamos información compleja en sistemas visuales claros, comprensibles y efectivos.
>
> Trabajamos exclusivamente en salud: clínicas, pharma, startups y entornos hospitalarios. Escuchamos, analizamos y diseñamos a medida. Sin plantillas. Sin fórmulas genéricas.

**Diferencial** — presentar com a **5 punts** (no com a "01/02/03" decoratiu; aquí l'ordre no és seqüència, així que usar etiquetes curtes, no números). Cada punt: títol curt (Fraunces) + 1 línia (Hanken):

1. **Especialización real** — Solo healthcare. No trabajamos otros sectores.
2. **Pensamiento estratégico** — Partimos del problema, el contexto y el objetivo.
3. **Tailor-made** — Cada proyecto se diseña desde cero.
4. **Enfoque humano** — Diseñamos para personas que deciden, no para diagnósticos.
5. **Diseño con función** — El diseño no decora: mejora comprensión y confianza.

Layout suggerit: graella de 5 (ex. 2+3 o columna lateral) amb hairlines entre punts. Reveal amb stagger.

### 7.4 Serveis (`#servicios`)

**Objectiu:** demostrar abast i profunditat. Frase d'obertura potent:

Eyebrow: `SERVICIOS`
H2:
> No ofrecemos servicios aislados. Ofrecemos *sistemas completos* de comunicación.

Quatre blocs (A–D). Cada bloc: número/lletra discret + títol (Fraunces) + descripció + llista de prestacions + frase-tesi de tancament. Alternar el costat de la imatge (zig-zag editorial). Imatges dins de marcs circulars/càpsula (signature).

**A · Comunicación visual y diseño estratégico**
> Transformamos información compleja en herramientas claras, útiles y coherentes con la marca.
- Arquitectura de información y narrativa visual
- Materiales médicos explicativos (tratamientos, procesos, formación)
- Presentaciones estratégicas para equipos médicos y comerciales
- Publicaciones científicas y pósters académicos
- Folletos, catálogos y dossiers corporativos
- Adaptación de contenido científico a lenguaje visual accesible

*Tesi:* **No diseñamos documentos. Hacemos que la información se entienda.**

**B · Materiales y sistemas corporativos healthcare**
> Extendemos la identidad de marca a todos los puntos de contacto del entorno clínico y farmacéutico.
- Packaging médico y farmacéutico
- Kits promocionales y materiales de soporte clínico
- Branding aplicado a elementos hospitalarios (textiles, cajas, material fungible…)
- Uniformes y vestuario corporativo
- Señalética y elementos ambientales en clínicas y hospitales

*Tesi:* **Convertimos el entorno sanitario en una experiencia coherente de marca.**

**C · Espacios y experiencias**
> Diseñamos espacios que comunican, posicionan y generan impacto en entornos competitivos.
- Conceptualización estratégica de espacios y stands
- Diseño 3D y visualización de experiencia
- Producción y montaje completo
- Adaptación a congresos médicos y ferias internacionales
- Activaciones en clínicas, farmacias y retail health
- Gestión y supervisión on-site

*Tesi:* **No diseñamos stands. Diseñamos presencia de marca.**

**D · Branding e identidad**
> Construimos marcas preparadas para comunicar donde la confianza lo es todo.
- Creación de marca desde cero
- Identidad visual completa
- Sistemas gráficos coherentes
- Manuales de marca y guías de uso
- Rebranding estratégico

*Tesi:* **Una identidad clara no solo se reconoce. Se confía.**

### 7.5 Projectes / Portfoli (`#proyectos`)

**Objectiu:** credibilitat. De moment amb placeholders (el client aportarà casos reals).

Eyebrow: `PROYECTOS`
H2: `Experiencias y espacios`

- Graella de **6 projectes placeholder**, presentats dins del signature (càpsules/cercles o targetes amb cantonada suau).
- Cada targeta: imatge (placeholder `--linen`), categoria (Jost, `--clay`), títol del projecte (Fraunces), hover amb zoom suau de la imatge i aparició d'un `→`.
- Categories d'exemple per als placeholders: *Branding · Espacios · Packaging · Comunicación científica*.
- Reveal amb stagger en entrar a viewport.

### 7.6 Metodologia (`#metodologia`)

**Objectiu:** explicar el procés. **Aquí SÍ que té sentit la numeració** (és una seqüència real). Timeline vertical o horitzontal amb 6 fases numerades `01–06`.

Eyebrow: `CÓMO TRABAJAMOS`
H2: `Un proceso claro, de principio a fin`

1. **Briefing y análisis**
2. **Conceptualización**
3. **Diseño**
4. **Producción**
5. **Implementación**
6. **Seguimiento**

Cada fase: número gran (Fraunces o Jost), títol i 1 línia breu de descripció (pots redactar-la curta i clara). Línia connectora que es "dibuixa" amb ScrollTrigger a mesura que es fa scroll.

### 7.7 (Opcional) Stats de confiança

Si es vol reforçar credibilitat a la Home (estil referència Oura & Co.), una franja amb 2–3 xifres amb comptador animat. **De moment placeholders** (ex.: *anys d'experiència · proyectos · clientes*). Marcar com a editables. Si no hi ha dades reals, ometre per no inflar — millor honest que fals.

### 7.8 Contacte (`#contacto`)

**Objectiu:** conversió. To directe i càlid.

Eyebrow: `CONTACTO`
H2:
> ¿Hablamos de tu proyecto?
Subtext:
> Si necesitas comunicar mejor, te ayudamos a convertir tu idea en una solución real.

**Formulari (Netlify Forms — important per al stack):**

Camps:
- Nombre
- Empresa
- Email
- Tipo de proyecto (select: *Comunicación visual · Materiales corporativos · Espacios y stands · Branding · Otro*)
- Descripción del proyecto (textarea)
- Timing aproximado (opcional)

Botó: **`Solicitar propuesta`** (no "Enviar"). En èxit, mostrar missatge en la veu de marca: *"Gracias. Te responderemos en breve."*

**Implementació tècnica obligatòria (Netlify):**
```html
<form name="contacto" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contacto" />
  <p hidden><label>No llenar: <input name="bot-field" /></label></p>
  <!-- camps reals aquí -->
</form>
```
Després del desplegament, els enviaments apareixen a Netlify → pestanya **Forms**. Configurar notificació per email a Netlify.

**Contacte directe (al costat del formulari):**
- Email · Teléfono
- Ubicación: **San Francisco · París · Barcelona**
- LinkedIn · Instagram

### 7.9 Footer

- Fons `--espresso` (o `--bone` fosc) amb text clar.
- Logotip `VitalEdge Lab` + tagline curt: *"Comunicación visual para healthcare."*
- Mini-navegació (mateixes àncores) + xarxes + ubicacions.
- Línia legal: `© 2026 VitalEdge Lab`.

### 7.10 About Us (`about.html`)

Pàgina secundària, mateix sistema visual, més pausada.

Eyebrow: `SOBRE NOSOTROS`
H2: `Nuestra historia`
> VitalEdge Lab nace al detectar una carencia clara: el sector salud necesita comunicar mejor. La comunicación médica suele ser compleja, fría o poco diferenciada. Trabajamos para cambiar eso: marcas healthcare más claras, más humanas y más relevantes.

**Misión**
> Resolver retos de comunicación en healthcare mediante soluciones visuales estratégicas, claras y centradas en las personas.

**Visión**
> Convertirnos en el partner de referencia en comunicación visual para healthcare, elevando el estándar del sector a través de diseño con propósito.

**Valores** (graella, mateix tractament que el diferencial):
- **Especialización** — Solo healthcare.
- **Escucha activa** — Cada proyecto empieza por entender a las personas.
- **Tailor-made** — No creemos en soluciones genéricas.
- **Rigor y claridad** — Simplificamos lo complejo sin perder precisión.
- **Humanización** — Diseñamos para personas, no para patologías.
- **Impacto real** — El éxito se mide en comprensión, confianza y resultado.

Tancar amb CTA a `#contacto`.

---

## 8. Responsive

- Mobile-first en l'execució del CSS.
- Breakpoints orientatius: `≥768px` (tablet), `≥1024px` (desktop), `≥1280px` (contenidor màx).
- Hero: H1 amb `clamp()`, sense desbordaments. CTAs apilats en mobile.
- Layouts zig-zag de serveis → es converteixen en una columna en mobile (imatge a dalt, text a sota).
- Menú → hamburguesa + overlay complet.
- Provar que cap línia de text superi ~66ch i que els marcs circulars escalin bé.

---

## 9. Accessibilitat i rendiment

- Contrast AA mínim (`--espresso` sobre `--bone` compleix; vigilar `--clay` sobre clar → només per a text gran/decoratiu).
- `prefers-reduced-motion` respectat (secció 5).
- Focus de teclat visible a tots els enllaços, botons i camps.
- `alt` descriptius (placeholders inclosos).
- HTML semàntic: `<header> <nav> <main> <section> <footer>`, una sola `<h1>` per pàgina.
- Imatges amb `loading="lazy"` i dimensions definides (evitar CLS).
- Fonts amb `font-display: swap`.

---

## 10. SEO i metadades

- `<title>`: `VitalEdge Lab — Comunicación visual para healthcare`
- `<meta name="description">`: ~155 car. amb la proposta de valor.
- Open Graph (`og:title`, `og:description`, `og:image`) per a compartició.
- `lang="es"`, `<meta charset>`, viewport.
- Favicon SVG (un cercle/lent del signature funciona bé com a marca).
- Dades estructurades `Organization` (JSON-LD) amb nom, ubicacions i xarxes.

---

## 11. Ordre de construcció recomanat (per Claude Code)

Construeix i fes push per fases, revisant cada una:

1. **Fase 0 — Fonaments:** `style.css` amb tots els tokens (secció 4), reset, tipografies carregades, contenidor i sistema d'espaiat. Estructura HTML buida amb totes les seccions i navbar/footer.
2. **Fase 1 — Hero + Navbar** (incloent estat scroll de la nav).
3. **Fase 2 — Intro + Diferencial.**
4. **Fase 3 — Serveis (4 blocs).**
5. **Fase 4 — Proyectos + Metodología.**
6. **Fase 5 — Contacto (formulari Netlify) + Footer.**
7. **Fase 6 — About Us.**
8. **Fase 7 — Animacions** (GSAP/ScrollTrigger/Lenis) sobre tot l'anterior.
9. **Fase 8 — Responsive, accessibilitat, SEO i polish final.**

A cada fase: codi net, comentat, i commit amb missatge clar. Després de la fase, revisa visualment abans de continuar.

---

## 12. Annex — Referències d'inspiració

**Estètica de referència:** *warm minimalism / soft minimalism / quiet luxury / beige aesthetic*, amb serif editorial + sans minimal + molt espai en blanc.

**Webs clau:**
- Norm Architects — https://normcph.com/ *(soft minimalism, llum natural, quiet luxury)*
- Oura & Co. — https://www.behance.net/gallery/230193503/Oura-Co-Interior-design-agency-Landing-page *(stats + combinació serif/sans)*
- Studio Bressi — https://bressidesign.com/ *(la més propera a les referències: crema + serif/script editorial)*
- Asha Glenn Design — https://ashaglenn.design/ *(paleta de neutres documentada)*
- Loeven Morcel — https://www.loevenmorcel.com/en *(serif majúscula gran sobre beix)*
- Antara Studio — https://antara.design/ *(color juganer sobre neutre)*
- 52 Beige Websites — https://qodeinteractive.com/magazine/examples-of-beige-websites/ *(recull de referència)*

**Síntesi visual:**
| Element | Direcció |
|---|---|
| Paleta | Bone/crema/linen/clay + accent **sàlvia** + text espresso |
| Tipografia | Fraunces (display) · Hanken Grotesk (body) · Jost (labels) |
| Fotografia | Càlida, llum natural, muted; dins de cercles/càpsules |
| Layout | Espai en blanc generós, asimètric, editorial |
| Moviment | Orquestrat i discret; un bon reveal > deu efectes |
| Signature | Marc circular "lent de laboratori" + textura de cercles |

---

*Fi del briefing. Qualsevol text es pot adaptar lleugerament per neteja i ritme visual, mantenint sempre les frases-tesi i la direcció d'art.*
