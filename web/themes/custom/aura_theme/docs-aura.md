# AURA Theme – Notes d'implementació

Document per deixar constància dels canvis i criteris visuals. Actualitza'l a mesura que fem iteracions.

## Base i llibreries
- Subtema de Ruhi (`base theme: ruhi`) amb `ruhi` i `thex` desactivats via `libraries-override`.
- Només es carrega `aura_theme/global-styling` amb `css/aura-style.css`.

## Identitat visual
- Fons global: `--aura-dark-bg` aplicat al `body` (text clar sobre fons molt fosc).
- Overlays: capes blanques semitransparents (`--aura-overlay-white` 0.95, `--aura-overlay-light` 0.98) per regions principals.
- Targetes: `.section-shell` amb fons translúcid, blur (`--aura-card-blur`) i ombra per efecte glass.
- Mode fosc puntual: `.section-dark` elimina l'overlay i pinta text blanc quan cal veure directament el fons negre.

## Estructura de pàgina
- `page.html.twig` crea `page-wrapper` amb `site-header` fix, `hero-region`, `main-content` (contenidors highlighted/content above/content/content below) i `site-footer`.
- `page.html.twig` mostra `hero` i afegeix `breadcrumb` i `sidebar` a les pàgines no front.
- `region--hero.html.twig` només mostra contingut de l'hero d'AURA.

## CSS clau (aura-style.css)
- Header/Footer: overlays clars + `backdrop-filter` per deixar entreveure el fons fosc.
- Seccions principals: `main-content`, `.hero-region`, `.section-content` amb fons rgba blanc; padding via `--aura-spacing` i variant mòbil.
- Tipografia: stack del sistema, headings amb pes mitjà i espaiat lleu.
- Botons: contorn, fons transparent; hover negre/blanc.
- Responsive: menú principal passa a panell fix amb fons translúcid; toggle hamburgesa.
- Hero vídeo invertit: `.aura-video-hero` + `.aura-video-bg` amb `filter: invert(1) grayscale(1)` per mostrar el vídeo negre (punts blancs) com un positiu blanc (punts negres), overlay suau `.aura-video-overlay` i contingut `.aura-video-content`.

## Neteja de Ruhi
- S'amaguen sliders/blocks de Ruhi (`.slick-slider`, `.ruhi-slider`, etc.) i es força visibilitat dels blocs hero AURA.

## Pendents / To-dos
- [ ] Documentar qualsevol nou component o classe utilitzada fora de `aura-style.css`.
- [ ] Si s'afegeixen variants d'overlay, afegir valors i ús aquí.
- [ ] Si es canvia el comportament del menú mòbil, descriure transicions i breakpoints.

## Ruta dels fitxers rellevants
- Config tema: `web/themes/custom/aura_theme/aura_theme.info.yml`, `aura_theme.libraries.yml`.
- Estils: `web/themes/custom/aura_theme/css/aura-style.css`.
- Templates: `web/themes/custom/aura_theme/templates/page.html.twig`, `templates/region--hero.html.twig`, `templates/region--hero-video.html.twig`, `templates/template-parts/*.html.twig`.
