# Mindful Groter Groeien — Website

Volledige, statische website voor **Janneke Nieboer · Mindful Groter Groeien** (paardencoaching & mindfulness op de Veluwe).

Deze site is gebouwd met **vanilla HTML, CSS en JavaScript** — geen build-tools, geen frameworks. Direct te hosten op GitHub Pages, Netlify, Vercel of elke gewone webserver.

---

## Inhoud van de map

```
mindfulgrotergroeien/
├── index.html              Homepage (met Instagram gallery)
├── paardencoaching.html    Paardencoaching (overzicht)
├── almp.html               Anders Leren Met Paarden (incl. YouTube embed)
├── buitenklas.html         De Buitenklas
├── mindfulness.html        Mindfulness trainingen
├── over-janneke.html       Over Janneke + alle recensies + certificeringslogo's
├── tarieven.html           Cursussen & tarieven
├── contact.html            Contact + formulier + Google Maps
├── style.css               Gedeelde stylesheet
├── scripts.js              Gedeelde JavaScript (carousel, menu, tabs)
├── README.md               Dit bestand
└── images/                 Plaats hier al uw foto's (zie images/PLAATS-FOTOS-HIER.md)
    └── logos/              Certificeringslogo's
```

---

## ⚡ Snel aan de slag

### 1. Foto's plaatsen

Open `images/PLAATS-FOTOS-HIER.md` voor een complete lijst met exacte bestandsnamen. Sleep uw foto's met die namen in de `images/` map en ze verschijnen automatisch op de site.

Tot u foto's plaatst ziet de bezoeker mooie groene gradients als placeholder — de site werkt prima zonder ze.

### 2. Lokaal testen

Open `index.html` dubbelklikkend in uw browser. Klaar.

---

## Publiceren op GitHub Pages

### Eenmalig: GitHub account & nieuwe repository aanmaken

1. Maak een account op [github.com](https://github.com).
2. Klik rechtsboven op **+** → **New repository**.
3. **Repository name**: `mindfulgrotergroeien`.
4. Zet de repository op **Public**.
5. Klik op **Create repository**.

### Bestanden uploaden

1. Open uw nieuwe repository.
2. Klik op **uploading an existing file** ("Add file" → "Upload files").
3. Sleep alle bestanden uit deze map (inclusief de `images/` submap) naar het uploadveld.
4. Klik op **Commit changes**.

### GitHub Pages aanzetten

1. **Settings** → **Pages**.
2. Onder **Source**: kies **Deploy from a branch**.
3. Onder **Branch**: kies **main** / **/ (root)**, klik **Save**.
4. Wacht 1-2 minuten. Uw site is live op:

   ```
   https://UW-USERNAME.github.io/mindfulgrotergroeien/
   ```

### Eigen domeinnaam (mindfulgrotergroeien.nl) koppelen

Maak in de hoofdmap een bestand `CNAME` met daarin:

```
mindfulgrotergroeien.nl
```

Bij uw domeinregistrar voegt u toe:

**A-records** voor `mindfulgrotergroeien.nl`:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME-record** voor `www.mindfulgrotergroeien.nl`:
```
UW-USERNAME.github.io
```

Daarna in GitHub: **Settings → Pages → Custom domain** → `mindfulgrotergroeien.nl` invullen, **Save**, en **Enforce HTTPS** aanvinken.

---

## 📧 Contactformulier — hoe werkt het?

Het formulier op de Contact pagina werkt nu via een **mailto-fallback**: als bezoekers op "Verstuur bericht" klikken, opent hun eigen e-mailprogramma (Outlook, Gmail, Mail.app) met het bericht klaargezet aan `mindfulgrotergroeien@gmail.com`. Bezoekers moeten zelf op "Verzenden" klikken in hun mailprogramma.

**Dit werkt zonder server**, maar heeft één nadeel: op telefoons en in browsers waar geen mailprogramma is ingesteld werkt het niet altijd soepel.

### Beter: gebruik Formspree (gratis, 50 berichten per maand)

Voor automatische forwarding zonder dat de bezoeker een mailprogramma nodig heeft:

1. Maak een gratis account op [formspree.io](https://formspree.io).
2. Maak een nieuw formulier en koppel het aan `mindfulgrotergroeien@gmail.com`.
3. Formspree geeft u een URL zoals `https://formspree.io/f/xyzabc123`.
4. Open `contact.html` en zoek deze regel:
   ```html
   <form class="contact-form fade-in" id="contact-form" novalidate>
   ```
5. Vervang door:
   ```html
   <form class="contact-form fade-in" id="contact-form" action="https://formspree.io/f/UW-CODE" method="POST">
   ```
6. Verwijder of comment de mailto-fallback in `scripts.js` (zoek naar `contactForm.addEventListener`).

Alternatieven: [Netlify Forms](https://www.netlify.com/products/forms/) (gratis 100/maand, als u hosting verplaatst), [Web3Forms](https://web3forms.com) (gratis 250/maand), [Getform](https://getform.io).

---

## 📷 Instagram & Facebook integratie

### Wat is er nu?

- **Social media iconen** in de footer van elke pagina, gelinkt aan:
  - Instagram: `https://www.instagram.com/mindfulgrotergroeien/`
  - Facebook: `https://www.facebook.com/mindfulgrotergroeien/`
- **Instagram gallery** op de homepage met 6 afbeeldingen die u handmatig bijwerkt (sleep nieuwe foto's als `insta-1.jpg` t/m `insta-6.jpg` in de `images/` map).

### Wilt u een echte, automatisch updatende Instagram feed?

Dat kan niet zonder een externe service, omdat statische sites geen Instagram API kunnen aanroepen. Goede betaalbare opties:

- **[SnapWidget](https://snapwidget.com)** — gratis voor basisgebruik, eenvoudig embed-code te plakken in `index.html`. Werkt met openbare Instagram accounts.
- **[Elfsight Instagram Feed](https://elfsight.com/instagram-feed-instashow/)** — luxueuzer, vanaf ~$5/maand, mooie templates.
- **[LightWidget](https://lightwidget.com)** — gratis basis, premium voor meer foto's.

Voorbeeld voor SnapWidget: ga naar snapwidget.com → koppel uw Instagram → kopieer de embed-code → plak die in `index.html` in plaats van de huidige `<div class="instagram-grid">`.

---

## Wat is meegeleverd

### Pagina's & content

- **Homepage** met emotionele hero, doelgroep-kaarten, interactieve recensies-carousel, **Instagram gallery**, 3-stappen methode, korte over-Janneke sectie, locatie-blok en CTA banner
- **Paardencoaching** met uitleg van de methode (vluchtdier, kuddedier, spiegelen) en submenu-kaarten
- **Anders Leren Met Paarden (ALMP)** inclusief **ingebedde YouTube-video** (https://www.youtube.com/embed/wJmsW6zpXno)
- **De Buitenklas** voor thuiszitters
- **Mindfulness** met tabbladen voor 3 doelgroepen
- **Over Janneke** met persoonlijk verhaal, opleidingen-lijst, **certificeringslogo's** en alle volledige recensies
- **Tarieven** in overzichtelijke prijskaarten per leeftijdsgroep
- **Contact** met werkend formulier, **certificeringslogo's** en ingesloten Google Maps

### Interactiviteit
- Sticky navigatie met scroll-effect
- Hamburger menu op mobiel
- Reviews-carousel met auto-rotate, pijltjes, dot-indicator en touch-swipe
- Tabbladen op de mindfulness-pagina
- Fade-in animaties bij scroll (Intersection Observer)
- Formulier-validatie + mailto fallback
- Social media iconen in elke footer (Instagram + Facebook)

### Design
- Warme, organische kleuren: bosgroen, beige, terracotta
- Google Fonts: Playfair Display (headings) + Lato (body)
- Volledig responsive (mobiel, tablet, desktop)
- Toegankelijk: aria-labels, focus-states, semantische HTML
- SEO-klaar: meta-descriptions, canonical URLs, Open Graph tags

---

## Aanpassingen maken

### Tekst aanpassen
Open het HTML-bestand in een teksteditor en wijzig de tekst. Upload het nieuwe bestand naar GitHub — de wijziging gaat binnen 1-2 minuten live.

### Kleuren aanpassen
Open `style.css` en pas bovenaan de CSS-variabelen aan:

```css
:root {
  --color-primary: #2D5016;       /* groen */
  --color-secondary: #F5EDD8;     /* beige */
  --color-accent: #8B4513;        /* terracotta */
}
```

### Hero-foto van een pagina wijzigen
Elke pagina heeft bovenin een klein `<style>` blok met de eigen hero-foto:

```html
<style>
  .hero-pattern { --hero-image: url("images/hero.jpg"); }
</style>
```

Wijzig het pad naar een ander bestand uit `images/`.

### Telefoonnummer of e-mailadres wijzigen
Doe een zoek-en-vervang door alle HTML-bestanden voor:
- `+31613515278` → uw nieuwe nummer
- `mindfulgrotergroeien@gmail.com` → uw nieuwe e-mailadres

---

## Browserondersteuning

Werkt in alle moderne browsers (Chrome, Firefox, Safari, Edge — desktop én mobiel).

Veel succes met de nieuwe website! 🌿
