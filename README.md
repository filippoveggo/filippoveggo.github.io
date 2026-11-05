# Filippo Veggo — Personal Portfolio 

<div align="center">

[![Live Website](https://img.shields.io/badge/Live%20Website-filippoveggo.github.io-0a84ff?style=for-the-badge&logo=safari&logoColor=white)](https://filippoveggo.github.io/)
[![Design Style](https://img.shields.io/badge/Design-Apple%20Liquid%20Glass%20%2F%20VisionOS-af52de?style=for-the-badge&logo=apple&logoColor=white)](https://filippoveggo.github.io/)
[![CI/CD](https://img.shields.io/badge/Deploy-GitHub%20Pages%20Actions-30d158?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/filippoveggo/filippoveggo.github.io/actions)
[![Jekyll](https://img.shields.io/badge/Engine-Jekyll%20%2B%20SCSS-ff9f0a?style=for-the-badge&logo=jekyll&logoColor=white)](https://jekyllrb.com/)

<p align="center">
  <strong>Sito portfolio personale di Filippo Veggo</strong><br>
  Front-End Developer & UI/UX Designer interessato nell'ecosistema Apple, interfacce moderne e sviluppo mobile.
</p>

</div>

---

## ✨ Panoramica & Stile "Apple Liquid Glass"

Il sito web è stato progettato adottando l'estetica **Apple Liquid Glass** (*Glassmorphism moderno / VisionOS Design System*), unendo alte prestazioni statiche con una resa visiva fluida e raffinata:

* 🪟 **Materiali Glassmorphic Traslucidi:** Superfici semi-trasparenti ed effetto rifrazione ottica.
* 💡 **Bordi Speculari & Profondità** 
* 🌌 **Sfondo Dinamico Aurora Mesh:** Sfere orbitali organiche con gradiente radiale che fluttuano dolcemente in background con animazioni CSS native.
* 🔤 **Tipografia Apple Human Interface:** Font stack di sistema San Francisco / Inter con gerarchia visiva ad alto contrasto (WCAG AA/AAA compliant) e titoli a gradiente metallico.
* ✨ **Micro-interazioni & Specular Sheen:** Riflesso speculare interattivo che segue le coordinate del cursore desktop in tempo reale e risposte tattili.
* 📱 **Navigazione Dual-Mode Completamente Responsive:**
  * **Desktop:** Navbar fluttuante Liquid Glass pill ancorata in alto con scroll-elevation.
  * **Mobile (< 640px):** Floating TabBar in stile iOS posizionata in basso, ergonomica per il pollice e compatibile con le safe-areas dell'iPhone.

---

## 🗂️ Struttura del Progetto

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD GitHub Actions per deploy automatico su Pages
├── _includes/
│   ├── head.html               # Tag viewport, meta WebApp iOS, font Inter, icone FontAwesome
│   ├── nav.html                # Barra di navigazione (Pill fluttuante desktop & TabBar iOS mobile)
│   ├── page_header.html        # Hero banner glassmorphic con status badge e social pill
│   ├── about_header.html       # Header pagina About con breadcrumbs e monogramma avatar
│   ├── post_header.html        # Header dei singoli progetti con tag e metadati
│   └── footer.html             # Footer Liquid Glass a 3 colonne e canvas Aurora Mesh
├── _layouts/
│   ├── page.html               # Base layout con contenitore fluttuante
│   ├── home.html               # Vetrina progetti a griglia CSS reattiva (1, 2 e 3 colonne)
│   ├── about.html              # Layout profilo personale con matrice competenze e progetti
│   └── post.html               # Layout case-study per i singoli articoli con framing immagini
├── _posts/                     # Articoli e casi di studio dei progetti (Markdown + Liquid)
├── _sass/
│   ├── _begin.scss             # Breakpoints responsive e mixin Liquid Glass
│   ├── _syntax.scss            # Syntax highlighting stile Apple Xcode Dark
│   └── _theme.scss             # Design System principale, variabili CSS e animazioni
├── assets/
│   ├── css/
│   │   ├── style.scss          # Entry point compilato da Jekyll su GitHub Pages
│   │   └── style.css           # CSS precompilato pronto all'uso
│   └── js/
│       └── liquid-glass.js     # Micro-interazioni vaniglia (specular sheen, scroll elevate)
├── _config.yml                 # Configurazione Jekyll (titoli, permalink, metadati SEO)
├── Gemfile                     # Dipendenze conformi a GitHub Pages (gem "github-pages")
├── index.md                    # Home page
├── about.md                    # Pagina About Me
└── 404.html                    # Pagina di errore 404 Liquid Glass
```

---

## 🔄 Deploy Automatico (CI/CD)

Il repository è configurato con **GitHub Actions**:
* Qualsiasi commit pushato sul branch `master` attiva automaticamente il workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
* Il workflow compila il sito Jekyll con le versioni ufficiali di GitHub Pages ed esegue il deploy live in pochi secondi senza richiedere alcuna configurazione manuale.

---

## 📬 Contatti & Collegamenti

* 👨‍💻 **Autore:** Filippo Veggo
* 🎓 **Percorso:** 
  * Laureando L-18: "Gestione d'Impresa"
  * Studente presso ITIS "C. Zuccante" (Mestre, Venezia)
* 🐙 **GitHub:** [@filippoveggo](https://github.com/filippoveggo)
* ✉️ **Email:** [filippoveggo@gmail.com](mailto:filippoveggo@gmail.com)
* 🌐 **Sito Web Live:** [https://filippoveggo.github.io/](https://filippoveggo.github.io/)

---

<div align="center">
  <sub>Progettato e sviluppato con ❤️</sub>
</div>
