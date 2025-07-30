# Kaya Sushi & Wok Website

En moderne, responsiv website for Kaya Sushi & Wok restauranter i Danmark. Websitet præsenterer to lokationer: Frederiksberg og Søborg, med autentisk japansk cuisine og moderne danske elementer.

## 📁 Projektstruktur

```
kaya-sushi-website/
├── index.html                 # Hovedside med restaurantvalg
├── assets/                    # Alle statiske ressourcer
│   ├── css/                   # CSS filer
│   │   ├── common.css         # Fælles styles og navigation
│   │   ├── home.css          # Hovedside specifikke styles
│   │   └── restaurant.css    # Restaurant sider styles
│   ├── js/                    # JavaScript filer
│   │   ├── common.js          # Fælles funktionalitet
│   │   └── restaurant.js     # Restaurant specifikke funktioner
│   └── images/                # Billeder og grafik
│       ├── hero-bg.jpg
│       ├── frederiksberg-interior.jpg
│       ├── soborg-interior.jpg
│       └── ...
├── pages/                     # Restaurant specifikke sider
│   ├── frederiksberg/
│   │   └── index.html         # Frederiksberg restaurant side
│   └── soborg/
│       └── index.html         # Søborg restaurant side
└── README.md
```

## 🏠 Hovedside (index.html)

Den primære landingsside hvor brugere vælger mellem restauranter:

### Funktioner:
- **Responsiv Navigation**: Desktop og mobil-venlig navigation med collapsible menu
- **Hero Sektion**: Stor velkomst med brand logo og japansk tekst
- **Restaurant Kort**: Visuelle kort for hver lokation med baggrundsbilleder
- **Om Os Sektion**: Information om restaurantens historie og værdier
- **Funktioner Oversigt**: Highlighting af specialiteter og services

### Designelementer:
- Gradient baggrunde med sushi-relaterede billeder
- Animerede overgangseffekter
- Moderne kortdesign med hover-effekter
- Responsiv grid layout

## 🏪 Restaurant Sider

Hver restaurant har sin egen dedikerede side med komplette informationer.

### Fælles Navigation:
- **Forside**: Velkomst og oversigt
- **Take Away**: Online bestilling links og information
- **All You Can Eat**: Buffet priser og regler
- **Book Bord**: Reservation formular
- **Kontakt Os**: Kontaktinformation og Google Maps

### Særlige Funktioner:

#### 📱 Mobil-First Design
- Responsiv navigation med hamburger menu
- Optimeret til touch-interaktion
- Skalerende layouts for alle skærmstørrelser
- Adaptive billedstørrelser

#### 🎨 Forbedrede Visuelle Elementer
- **Baggrundsbilleder**: Høj kvalitet sushi og restaurant billeder
- **Flydende Elementer**: Animerede emoji-elementer for hver side-type
- **Gradients og Skygger**: Moderne visuelle effekter
- **Kortdesign**: Ensartet kortdesign med billeder og ikoner

#### 🎭 Interaktive Funktioner
- **Velkomst Modal**: Video-baseret velkomst for nye besøgende
- **Formularhåndtering**: Avanceret form validering og feedback
- **Smooth Scrolling**: Blød navigation mellem sektioner
- **Progressive Enhancement**: Funktionalitet fungerer uden JavaScript

## 🛠️ Teknisk Implementation

### CSS Arkitektur
- **Common.css**: Base styles, navigation, og generiske komponenter
- **Home.css**: Hovedside specifikke styles
- **Restaurant.css**: Restaurant sider styles og komponenter
- **Modulær tilgang**: Genanvendelige CSS klasser
- **CSS Custom Properties**: For ensartet branding

### JavaScript Funktionalitet
- **Common.js**: Navigation, scrolling, animationer
- **Restaurant.js**: Side-specifik funktionalitet som modal håndtering
- **Class-based struktur**: Objektorienteret tilgang
- **Event delegation**: Effektiv event håndtering
- **LocalStorage**: For bruger præferencer

### Responsive Design
- **Mobile-First**: Primært designet til mobile enheder
- **Breakpoints**: 768px og 480px for tablet og mobil
- **Flexible Layouts**: CSS Grid og Flexbox
- **Touch-Friendly**: Store touch targets på mobile

## 🎯 Funktioner

### 🧭 Smart Navigation
- **Desktop**: Horizontal menu med hover effekter
- **Mobil**: Collapsible hamburger menu
- **Auto-highlighting**: Aktive links baseret på scroll position
- **Smooth scrolling**: Til in-page links

### 🎬 Multimedieindhold
- **Baggrundsbilleder**: Professionelle sushi billeder fra Unsplash
- **YouTube videoer**: Indlejrede velkomst videoer
- **Lazy loading**: Optimeret billede loading
- **Responsive billeder**: Adaptive størrelser

### 📊 Forbedrede UI Komponenter
- **Animerede kort**: Hover og loading animationer
- **Progressiv loading**: Fade-in effekter for indhold
- **Custom modals**: Stilfyldte popup vinduer
- **Form validering**: Real-time feedback

### 🌟 Specielle Effekter
- **Flydende baggrundselementer**: Subtile animerede dekorationer
- **Parallax scrolling**: Depth effect på scroll
- **Particle effekter**: Mus-aktiverede partikler
- **Gradient overlays**: Moderne visuelle lag

## 📱 Mobiloptimering

### Navigation
- Hamburger menu med smooth animations
- Touch-friendly button størrelse (44px minimum)
- Swipe-venlig interaktion

### Layout
- Single-column layout på mobile
- Staklede elementer for læsbarhed
- Reducerede margins og padding

### Performance
- Optimerede billedstørrelser for mobile
- Minimal JavaScript footprint
- Efficient CSS animations

## 🎨 Designsystem

### Farvepalette
- **Primary**: #ff4444 (Rød accent)
- **Dark**: #2d2d2d (Mørk grå)
- **Light**: #f8f9fa (Lys grå)
- **White**: #ffffff

### Typografi
- **Primær font**: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif
- **Størrelse hierarki**: 3rem, 2.5rem, 1.8rem, 1.3rem, 1rem
- **Linje højde**: 1.6 for læsbarhed

### Spacing System
- **Base unit**: 1rem (16px)
- **Small**: 0.5rem, 1rem, 1.5rem
- **Medium**: 2rem, 3rem, 4rem
- **Large**: 5rem, 6rem

## 🔧 Browser Support

- **Chrome/Edge**: 90+
- **Firefox**: 90+
- **Safari**: 14+
- **Mobile Safari**: iOS 14+
- **Chrome Mobile**: 90+

## 📈 Performance Features

- **Lazy loading**: Billeder loads kun når nødvendigt
- **Efficient animations**: GPU-accelererede transforms
- **Minimal dependencies**: Kun vanilla JavaScript
- **Optimerede assets**: Komprimerede billeder og CSS

## 🚀 Installation og Setup

1. **Download projektet** til din webserver
2. **Ingen installation krævet** - ren HTML/CSS/JS
3. **Åbn index.html** i en webbrowser
4. **For udvikling**: Brug en lokal server for bedste performance

## 🔮 Fremtidige Forbedringer

- PWA (Progressive Web App) support
- Offline funktionalitet
- Push notifikationer for bestillinger
- Integration med betalingssystemer
- Multi-språk support (engelsk)
- SEO optimering med struktureret data

---

**Udviklet med ❤️ for Kaya Sushi & Wok**
*Moderne web teknologier møder traditionel japansk gastronomi*