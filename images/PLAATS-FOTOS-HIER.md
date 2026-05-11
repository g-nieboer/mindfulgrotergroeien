# Foto's — overzicht van wat waar staat

Alle foto's en logo's zijn geplaatst, hernoemd en geoptimaliseerd. Hieronder zie je wat waar staat zodat je later eenvoudig een foto kunt vervangen.

---

## Foto's in `images/`

| Bestand | Gebruikt op | Inhoud |
|---|---|---|
| `hero.jpg` | Homepage hero | Kind met mini-pony in zandbak |
| `janneke-caressa-portret.jpg` | Over Janneke hero + sectie | Janneke met zachte glimlach naast Caressa |
| `janneke-caressa-lach.jpg` | Homepage "Over Janneke" sectie | Janneke met grote glimlach naast Caressa |
| `janneke-event.jpg` | Tarieven hero | Janneke bij ALMP-stand met banner |
| `almp-materialen.jpg` | ALMP hero + subpage-card op paardencoaching | Whiteboard met alfabet, kleurblokjes, markers |
| `caressa-wei.jpg` | Paardencoaching sectie + Mindfulness hero | Tinker grazend met gevlochten manen |
| `paardencoaching-hero.jpg` | Paardencoaching hero + Contact hero | Volwassen cliënt met Tinker in zandbak |
| `buitenklas-hero.jpg` | Buitenklas hero + subpage-card op paardencoaching | Janneke met pilates-bal + kind met Tinker op grasveld |

## Logo's in `images/logos/`

| Bestand | Gebruikt op | Logo |
|---|---|---|
| `almp.png` | Over Janneke + Contact | Anders Leren Met Paarden |
| `centrum-paardencoaching.png` | Over Janneke + Contact | Centrum Voor Paardencoaching |
| `caprilli.png` | Over Janneke + Contact | Caprilli Coaching & Training |
| `voor-door.png` | Over Janneke + Contact | VoorDoor — Beroepsvereniging Paardencoaches |

---

## Wat is er aan de foto's gedaan?

- **EXIF-rotatie toegepast** — twee foto's waren 90° gedraaid in het bestand, nu staan ze recht
- **Resized** — alle foto's terug naar maximaal 1400-1600 px breed (was tot 4032 px)
- **Geoptimaliseerd** — JPEG quality 76-85 met progressive encoding
- **Totale besparing**: van **~11 MB** naar **~3.5 MB** (≈ 70% kleiner)

Foto's openen nog steeds in hoge kwaliteit op desktop én mobiel, maar laden veel sneller. Dat is goed voor:
- Bezoekers met trage verbinding (denk aan op het platteland)
- Mobiele bezoekers met beperkte data
- Je positie in Google (Page Speed is een SEO-rankingfactor)

---

## Foto's vervangen of toevoegen

**Een bestaande foto vervangen** — upload simpelweg een nieuw bestand met *dezelfde* naam naar de juiste map. De site pakt het direct op.

**Een nieuwe foto toevoegen** — kopieer het bestand naar `images/` en gebruik in de HTML:

```html
<!-- Liggende foto (4:3) -->
<div class="photo photo-landscape">
  <img src="images/uw-nieuwe-foto.jpg" alt="Korte beschrijving" loading="lazy">
</div>

<!-- Staande foto (4:5) -->
<div class="photo photo-portrait">
  <img src="images/uw-nieuwe-foto.jpg" alt="Korte beschrijving" loading="lazy">
</div>
```

**Tip voor nieuwe foto's** — comprimeer ze eerst bij [squoosh.app](https://squoosh.app) (gratis, in je browser):
- Hero foto's: max 1600 px breed, ~300-500 KB
- Sectie foto's: max 1200 px breed, ~150-300 KB
- JPEG quality 75-85 is ideaal

Vergeet niet de Nederlandse `alt` tekst toe te voegen voor toegankelijkheid en Google.
