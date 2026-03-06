# Sistema de Blocs AURA - Guia d'ús

## 📦 Estructura de fitxers creats

```
web/themes/custom/
├── css/
│   └── aura-blocks.css              # Estils reutilitzables
├── templates/
│   └── blocks/
│       ├── bloc-1-que-pot-fer-aura.html # Bloc 1: Què pot fer AURA
│       ├── bloc-2-testimonis.html       # Bloc 2: Testimonis
│       └── bloc-3-formulari-contacte.html # Bloc 3: Formulari
└── README-BLOCS-AURA.md
```

## 🎨 Variables CSS configurades

Les variables CSS et permeten canviar colors fàcilment:

```css
--aura-light-bg: #E8F0F2    /* Blau clar */
--aura-dark-bg: #4A5859     /* Gris fosc */
--aura-beige-bg: #F5F3F0    /* Beix */
--aura-mint-bg: #C8E0D4     /* Verd menta */
```

## 🔧 Com utilitzar els blocs a Drupal

### Opció 1: Bloc personalitzat amb Full HTML

1. **Crear nou bloc**
   - Anar a: `Estructura > Disseny de bloc > Blocs personalitzats`
   - Clic a "Afegeix bloc personalitzat"

2. **Configuració**
   - Descripció: "AURA - Què pot fer AURA?"
   - Tipus de text: "Full HTML"
   - Copiar el contingut de `bloc-1-que-pot-fer-aura.html`

3. **Activar CSS**
   - Afegir a `yourtheme.libraries.yml`:
   ```yaml
   aura-blocks:
     css:
       theme:
         css/aura-blocks.css: {}
   ```
   - Afegir al `.info.yml`:
   ```yaml
   libraries:
     - yourtheme/aura-blocks
   ```

### Opció 2: Directament al node amb Full HTML

1. Editar el node
2. Afegir camp de text amb format "Full HTML"
3. Copiar el contingut del bloc HTML
4. Guardar

## 📐 Estructura dels blocs

### Anatomia bàsica:

```html
<div class="aura-block">
    <!-- QUADRAT ESQUERRE -->
    <div class="aura-block__left aura-block__left--light-bg">
        <!-- Contingut esquerre -->
    </div>
    
    <!-- QUADRAT DRET -->
    <div class="aura-block__right aura-block__right--beige-bg">
        <!-- Contingut dret -->
    </div>
</div>
```

## 🎯 Classes disponibles

### Colors de fons:
- `.aura-block__left--light-bg` - Blau clar
- `.aura-block__left--dark-bg` - Gris fosc
- `.aura-block__left--beige-bg` - Beix
- `.aura-block__left--mint-bg` - Verd menta

### Tipografia:
- `.aura-label` - Etiqueta petita amb fons
- `.aura-title` - Títol gran
- `.aura-subtitle` - Subtítol
- `.aura-text` - Text normal
- `.aura-list` - Llista amb punts

### Components:
- `.aura-button` - Botó principal
- `.aura-button--outline` - Botó amb vora
- `.aura-testimonial` - Contenidor de testimoni
- `.aura-quote` - Cita
- `.aura-form-*` - Elements de formulari

## 📱 Responsive

Els blocs s'adapten automàticament:
- **Desktop**: 2 columnes (50% / 50%)
- **Mòbil** (< 768px): 1 columna (100%)

## ✏️ Com personalitzar un bloc

### Exemple: Canviar colors

```html
<!-- Original -->
<div class="aura-block__left aura-block__left--light-bg">

<!-- Canviar a fons fosc -->
<div class="aura-block__left aura-block__left--dark-bg">
```

### Exemple: Centrar contingut

```html
<!-- Original -->
<div class="aura-block__left">

<!-- Centrat -->
<div class="aura-block__left aura-block__left--centered">
```

## 🖼️ Imatges i SVG

### La imatge `la-ona-logo.svg`:

1. Pujar a: `/sites/default/files/la-ona-logo.svg`
2. O configurar ruta a:
   ```html
   <img src="/themes/custom/THEME/images/la-ona-logo.svg">
   ```

## 🔄 Crear nous blocs similars

### Template bàsic:

```html
<div class="aura-block">
    <div class="aura-block__left aura-block__left--COLORS">
        <span class="aura-label">ETIQUETA</span>
        <h2 class="aura-title">Títol del bloc</h2>
        <p class="aura-text">Text descriptiu...</p>
    </div>
    
    <div class="aura-block__right aura-block__right--COLORS">
        <!-- Contingut dret -->
    </div>
</div>
```

## 🚀 Properes passes

1. **Pujar el fitxer SVG** `la-ona-logo.svg` a Drupal
2. **Activar CSS** al tema
3. **Crear blocs** a Drupal amb el HTML
4. **Personalitzar colors** a les variables CSS si cal

## 💡 Consells

- Els blocs són completament independents
- Pots combinar-los en qualsevol ordre
- Usa les variables CSS per mantenir coherència visual
- El padding és `40px` (desktop) i `20px` (mòbil)

## 📞 Suport

Si necessites més blocs o personalitzacions, només digues-me què vols fer!
