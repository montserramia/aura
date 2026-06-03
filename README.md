# Config: Content Type `servei` — AURA AI

Configuració completa del content type `servei` per a aura-ai.eu.

## Fitxers inclosos

### Tipus de contingut
- `node.type.servei.yml` — Definició del content type

### Taxonomia
- `taxonomy.vocabulary.grup_servei.yml` — Vocabulari de grups (Descobreix / Capacita / Implementa / Evoluciona)

### Emmagatzematge de camps (field.storage)
- `field.storage.node.field_grup.yml` — Entity reference → taxonomy term
- `field.storage.node.field_ganxo.yml` — String (text curt)
- `field.storage.node.field_resum.yml` — Text long (per a cards)
- `field.storage.node.field_inclou.yml` — String, cardinality il·limitada
- `field.storage.node.field_destinataris.yml` — Text long
- `field.storage.node.field_cta_text.yml` — String
- `field.storage.node.field_cta_url.yml` — Link
- `field.storage.node.field_serveis_relacionats.yml` — Entity reference → node (servei)
- `field.storage.node.field_icona.yml` — String

### Instàncies de camps (field.field)
Un fitxer per cada camp, tots lligats al bundle `servei`.

### Displays
- `core.entity_form_display.node.servei.default.yml` — Formulari d'edició
- `core.entity_view_display.node.servei.default.yml` — Pàgina completa del servei
- `core.entity_view_display.node.servei.teaser.yml` — Card (per a llistats i relacionats)

---

## Com importar

### Opció A — Config sync (recomanat per a DDEV)

```bash
# Copia els fitxers al directori de config sync del teu lloc
cp config/install/*.yml /path/to/drupal/config/sync/

# Importa (des del contenidor DDEV)
ddev drush cim --partial -y

# Buida la caché
ddev drush cr
```

### Opció B — Mòdul personalitzat

1. Crea un mòdul `aura_servei` a `/modules/custom/aura_servei/`
2. Afegeix un fitxer `aura_servei.info.yml`:
   ```yaml
   name: 'AURA Servei'
   type: module
   description: 'Content type Servei per a AURA AI'
   core_version_requirement: ^10
   package: AURA AI
   ```
3. Copia la carpeta `config/install/` al mòdul
4. Activa el mòdul: `ddev drush en aura_servei -y`

---

## Passos post-importació

1. **Crear els termes de taxonomia** (contingut, no configuració):
   - Descobreix (pes: 0)
   - Capacita (pes: 1)
   - Implementa (pes: 2)
   - Evoluciona (pes: 3)
   
   ```bash
   ddev drush ev "
   \$terms = ['Descobreix', 'Capacita', 'Implementa', 'Evoluciona'];
   foreach (\$terms as \$w => \$name) {
     \$term = \Drupal\taxonomy\Entity\Term::create([
       'vid' => 'grup_servei',
       'name' => \$name,
       'weight' => \$w,
     ]);
     \$term->save();
     echo 'Creat: ' . \$name . PHP_EOL;
   }
   "
   ```

2. **Crear la Vista** `/serveis` amb les cards agrupades per `field_grup` (taxonomy term) en mode teaser.

3. **Mòdul recomanat per a relacions simètriques:** `corresponding_entity_references` (Drupal.org).

4. **Path aliases** suggerits per a cada node:
   - `/serveis/auditoria-ia-express`
   - `/serveis/auditoria-eu-ai-act`
   - `/serveis/taller-aura-starter`
   - `/serveis/formacio-corporativa`
   - `/serveis/pack-sobirania-digital`
   - `/serveis/pack-drupal-ia`
   - `/serveis/implementacio-aura-completa`
   - `/serveis/aura-essencial`
   - `/serveis/aura-pro`

---

## Camps resum

| Camp | Tipus | Cardinality | Obligatori | Traducible |
|---|---|---|---|---|
| `field_grup` | entity_reference (taxonomy) | 1 | Sí | No |
| `field_ganxo` | string | 1 | Sí | Sí |
| `field_resum` | text_long | 1 | Sí | Sí |
| `body` | text_with_summary | 1 | No | Sí |
| `field_inclou` | string | Il·limitat | No | Sí |
| `field_destinataris` | text_long | 1 | No | Sí |
| `field_cta_text` | string | 1 | No | Sí |
| `field_cta_url` | link | 1 | No | No |
| `field_serveis_relacionats` | entity_reference (node) | Il·limitat | No | No |
| `field_icona` | string | 1 | No | No |
