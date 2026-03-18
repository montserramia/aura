# Desplegament i manteniment en producció

**Servidor**: Hetzner VPS (Ubuntu 22.04) · CyberPanel · LiteSpeed  
**Domini**: aura-ai.eu  
**Drupal**: 11.x · PHP 8.3 · MySQL  
**Docroot**: `/home/aura-ai.eu/public_html/web`

---

## Connexió al servidor

```bash
ssh auraa1998@65.109.231.124
cd ~/public_html
```

Per operacions amb sudo (instal·lar paquets, reiniciar serveis):
```bash
su montserramia   # contrasenya del sistema
sudo <comanda>
exit              # torna a auraa1998
```

---

## Drush en producció

El servidor té PHP 8.1 com a CLI per defecte, però Drupal 11 requereix PHP 8.3.  
**Sempre cal cridar Drush explícitament amb PHP 8.3:**

```bash
php8.3 ~/public_html/vendor/drush/drush/drush.php <comanda>
```

### Alias permanent (afegit a ~/.bashrc)

```bash
alias drush83='php8.3 ~/public_html/vendor/drush/drush/drush.php'
```

Per activar-lo en sessions noves ja està al `~/.bashrc`. En la sessió actual:
```bash
source ~/.bashrc
```

### Comandes habituals

```bash
# Verificar estat del site
drush83 status

# Neteja de caches
drush83 cr

# Actualitzar esquema de BD (després de git pull)
drush83 updb -y

# Importar configuració del repositori
drush83 cim -y

# Exportar configuració (si has fet canvis via UI)
drush83 cex -y

# Actualitzar traduccions
drush83 locale:update

# Reindexar cerca
drush83 search:index

# Generar URL de login d'emergència
drush83 uli

# Verificar requisits del sistema
drush83 core:requirements
```

---

## Desplegament d'actualitzacions (git pull)

```bash
cd ~/public_html
git pull origin master
php8.3 vendor/drush/drush/drush.php updb -y
php8.3 vendor/drush/drush/drush.php cim -y
php8.3 vendor/drush/drush/drush.php cr
```

---

## Estructura de fitxers importants

| Fitxer | Descripció |
|--------|------------|
| `web/sites/default/settings.php` | Config base (al git) |
| `web/sites/default/settings.local.php` | Config producció: BD, hash_salt, trusted_hosts (NO al git) |
| `~/private/` | Fitxers privats Drupal (fora webroot) |
| `~/tmp/` | Fitxers temporals |
| `~/config/sync/` | Sincronització de configuració Drupal |
| `~/public_html/backup-db-*.sql` | Còpies de seguretat BD |

---

## Base de dades

```bash
# Importar backup
mysql -u aura_Admin -p aura_drupal < backup-db-20260316.sql

# Exportar backup
mysqldump -u aura_Admin -p aura_drupal | gzip > ~/public_html/backup-db-$(date +%Y%m%d).sql.gz

# Accés directe MySQL
mysql -u aura_Admin -p aura_drupal
```

---

## Servidor web (LiteSpeed + CyberPanel)

El domini usa **PHP 8.3 via LiteSpeed** configurat des del panell CyberPanel.  
Per reiniciar LiteSpeed (des de `montserramia`):

```bash
su montserramia
sudo systemctl restart lsws     # LiteSpeed
sudo systemctl status lsws      # verificar estat
```

Canvis de versió PHP del domini → **CyberPanel > Websites > List Websites > PHP version**.

---

## Permisos correctes

```bash
# Si cal restablir permisos
find web/sites/default/files -type d -exec chmod 755 {} \;
find web/sites/default/files -type f -exec chmod 644 {} \;
chmod 440 web/sites/default/settings.local.php
chmod 444 web/sites/default/settings.php
```

---

## Extensions PHP 8.3 instal·lades

Instal·lades via `sudo apt install php8.3-mysql` (i dependències):  
`pdo_mysql`, `mysqlnd`, `mysqli`, `mbstring`, `xml`, `opcache`, `gd`, `curl`, `intl`, `zip`
