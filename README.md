# AzurIT Academy

> **Plateforme d'apprentissage interactif des algorithmes | Interactive algorithm learning platform**

---

## 🇫🇷 Français

- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Algorithmes disponibles](#-algorithmes-disponibles)
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet)
- [Installation & lancement](#-installation--lancement)
- [Architecture](#-architecture)
- [Ajouter un algorithme](#-ajouter-un-algorithme)

## 🇬🇧 English

- [Overview](#-overview)
- [Features](#-features)
- [Available Algorithms](#-available-algorithms)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Architecture](#-architecture-1)
- [Adding an Algorithm](#-adding-an-algorithm)

---

---

# 🇫🇷 Documentation Française

## 📖 Présentation

**AzurIT Academy** est une application web éducative qui permet de visualiser et d'apprendre les algorithmes fondamentaux de manière interactive. Chaque algorithme est accompagné d'une animation pas-à-pas, d'un éditeur de code exécutable, d'un quiz de validation et d'exercices à compléter.

La plateforme met un fort accent sur la pédagogie : chaque concept est expliqué depuis zéro, visualisé en temps réel, puis pratiqué activement.

---

## ✨ Fonctionnalités

- **Visualisation pas-à-pas** — Animez chaque algorithme étape par étape, avec contrôles lecture/pause/suivant/précédent et vitesse réglable
- **Journal d'exécution** — Chaque étape est listée et cliquable pour naviguer directement à n'importe quel moment de l'algorithme
- **Éditeur de code TypeScript** — Code annoté, modifiable et exécutable directement dans le navigateur (sandbox JS)
- **Quiz interactifs** — Questions à choix multiples avec correction immédiate et score final
- **Exercices codes à trou** — Compléter des implémentations partielles avec guide, correction et analyse des erreurs
- **Cours structurés** — Chaque algorithme dispose de sections pédagogiques (concept, usages, complexité, récapitulatif)
- **Analyse de complexité** — Tableaux comparatifs Big O, explications détaillées des cas meilleur/moyen/pire
- **Thème clair / sombre** — Persisté dans localStorage
- **Bilingue FR / EN** — Interface et tout le contenu disponibles en français et en anglais
- **Animations GSAP** — Transitions fluides sur les entrées de page (SplitText, ScrollTrigger)
- **Responsive** — Adapté aux écrans larges et aux tablettes

---

## 🗂 Algorithmes disponibles

| Algorithme | Catégorie | Complexité | Onglets |
|---|---|---|---|
| **Dijkstra** | Graphe | O((V+E) log V) | Viz · Code · Interactif · Quiz · Exercices · Complexité |
| **Quicksort** | Tri | O(n log n) moy. | Viz · Code · Quiz · Exercices · Complexité |
| **Mergesort** | Tri | O(n log n) | Viz · Code · Quiz · Exercices · Complexité |
| **Arbre Binaire de Recherche (ABR)** | Structure | O(log n) moy. | Viz · Code · Quiz · Exercices · Complexité |
| **Recherche Binaire** | Recherche | O(log n) | Viz · Code · Quiz · Exercices · Complexité |
| **BFS & DFS** | Graphe | O(V + E) | Viz · Code · Quiz · Exercices · Complexité |
| **Complexité algorithmique** | Fondamentaux | Big O | Guide interactif |

---

## 🛠 Stack technique

| Outil | Version | Rôle |
|---|---|---|
| **React** | 18.3 | Framework UI (composants, hooks, état) |
| **Vite** | 5.4 | Bundler & serveur de développement |
| **Tailwind CSS** | 3.4 | Styles utilitaires + variables CSS thémées |
| **GSAP** | 3.12 | Animations (SplitText, ScrollTrigger) |
| **JavaScript / JSX** | ES2022 | Langage principal |

> Le code affiché dans l'éditeur est en TypeScript, mais l'application elle-même est en JavaScript/JSX.

---

## 📁 Structure du projet

```
azurit-academy/
├── public/                    # Fichiers statiques
├── src/
│   ├── App.jsx                # Routeur principal (state-based routing)
│   ├── components/
│   │   ├── array/             # Visualisation de tableaux
│   │   │   ├── ArrayViz.jsx
│   │   │   └── BinarySearchArrayViz.jsx
│   │   ├── bst/               # Arbre binaire de recherche (SVG)
│   │   │   └── TreeViz.jsx
│   │   ├── code/              # Éditeur de code
│   │   │   └── CodeEditor.jsx
│   │   ├── complexity/        # Graphes de complexité
│   │   │   └── ComplexityChart.jsx
│   │   ├── course/            # Onglets de sections de cours
│   │   │   ├── CourseSectionTabs.jsx
│   │   │   └── SectionContent.jsx
│   │   ├── exercise/          # Questions d'exercices
│   │   │   ├── ExerciseQuestion.jsx
│   │   │   └── TpQuestion.jsx
│   │   ├── graph/             # Visualisation de graphes (SVG)
│   │   │   ├── GraphViz.jsx         # Pour Dijkstra (orienté, pondéré)
│   │   │   └── GraphVizBfsDfs.jsx   # Pour BFS/DFS (non orienté)
│   │   ├── interactive/       # Constructeur de graphe interactif
│   │   │   └── GraphBuilder.jsx
│   │   ├── layout/            # En-tête & pied de page
│   │   │   ├── Footer.jsx
│   │   │   └── TopNav.jsx
│   │   ├── quiz/              # Composants de quiz
│   │   │   ├── QuizQuestion.jsx
│   │   │   └── QuizScore.jsx
│   │   └── visualization/     # Contrôles & affichages partagés
│   │       ├── Controls.jsx        # Boutons lecture/pause/navigation
│   │       ├── DistanceTable.jsx   # Tableau des distances (Dijkstra)
│   │       ├── HeapViz.jsx         # Visualisation du MinHeap
│   │       └── StepLog.jsx         # Journal d'exécution cliquable
│   ├── data/                  # Données statiques par algorithme
│   │   ├── bfsDfsCode.js
│   │   ├── bfsDfsExercises.js
│   │   ├── bfsDfsGraphs.js
│   │   ├── bfsDfsQuestions.js
│   │   ├── bfsDfsSections.js
│   │   ├── binarySearchArrays.js
│   │   ├── binarySearchCode.js
│   │   ├── binarySearchExercises.js
│   │   ├── binarySearchQuestions.js
│   │   ├── binarySearchSections.js
│   │   ├── bstCode.js
│   │   ├── bstExercises.js
│   │   ├── bstQuestions.js
│   │   ├── bstSections.js
│   │   ├── courseSections.js       # Sections Dijkstra
│   │   ├── dijkstraCode.js
│   │   ├── dijkstraExercises.js
│   │   ├── graphs.js               # Graphes Dijkstra
│   │   ├── mergesortArrays.js
│   │   ├── mergesortCode.js
│   │   ├── mergesortExercises.js
│   │   ├── mergesortQuestions.js
│   │   ├── mergesortSections.js
│   │   ├── quicksortArrays.js
│   │   ├── quicksortCode.js
│   │   ├── quicksortExercises.js
│   │   ├── quicksortQuestions.js
│   │   └── quicksortSections.js
│   ├── hooks/                 # Hooks d'animation par algorithme
│   │   ├── useBfsDfsAnimation.js
│   │   ├── useBinarySearchAnimation.js
│   │   ├── useBstAnimation.js
│   │   ├── useCustomGraph.js
│   │   ├── useDijkstraAnimation.js
│   │   ├── useGsap.js
│   │   ├── useMergesortAnimation.js
│   │   └── useQuicksortAnimation.js
│   ├── i18n/                  # Internationalisation (FR / EN)
│   │   ├── LangContext.jsx
│   │   ├── en.js
│   │   └── fr.js
│   ├── pages/                 # Pages principales
│   │   ├── BfsDfsPage.jsx
│   │   ├── BinarySearchPage.jsx
│   │   ├── BstPage.jsx
│   │   ├── ComplexityGuidePage.jsx
│   │   ├── CoursePage.jsx          # Page Dijkstra
│   │   ├── HomePage.jsx
│   │   ├── MergesortPage.jsx
│   │   ├── QuicksortPage.jsx
│   │   └── tabs/              # Onglets de chaque page
│   │       ├── BfsDfsCodeTab.jsx
│   │       ├── BfsDfsComplexityTab.jsx
│   │       ├── BfsDfsQuizTab.jsx
│   │       ├── BfsDfsVizTab.jsx
│   │       ├── BinarySearchCodeTab.jsx
│   │       ├── BinarySearchComplexityTab.jsx
│   │       ├── BinarySearchQuizTab.jsx
│   │       ├── BinarySearchVizTab.jsx
│   │       ├── ComplexityTab.jsx
│   │       ├── ExerciseTab.jsx     # Générique (codes à trou)
│   │       ├── InteractiveTab.jsx
│   │       ├── MergesortCodeTab.jsx
│   │       ├── MergesortComplexityTab.jsx
│   │       ├── MergesortQuizTab.jsx
│   │       ├── MergesortVizTab.jsx
│   │       ├── QuicksortCodeTab.jsx
│   │       ├── QuicksortComplexityTab.jsx
│   │       ├── QuicksortQuizTab.jsx
│   │       ├── QuicksortVizTab.jsx
│   │       ├── QuizTab.jsx
│   │       └── VizTab.jsx
│   └── utils/                 # Générateurs de traces & utilitaires
│       ├── animations.js
│       ├── bfsDfsTrace.js
│       ├── binarySearchTrace.js
│       ├── bstTrace.js
│       ├── dijkstraTrace.js
│       ├── formatContent.jsx   # Rendu Markdown simplifié
│       ├── mergesortTrace.js
│       └── quicksortTrace.js
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🚀 Installation & lancement

### Prérequis

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd azurit-academy

# Installer les dépendances
npm install
```

### Lancement en développement

```bash
npm run dev
# → http://localhost:5173
```

### Build de production

```bash
npm run build
# Les fichiers sont générés dans dist/

npm run preview
# → Prévisualisation locale du build
```

---

## 🏗 Architecture

### Routage

La plateforme utilise un **routage basé sur l'état React** (pas de React Router). La variable `page` dans `App.jsx` détermine quelle page est affichée :

```jsx
// App.jsx
const [page, setPage] = useState("home");
// Valeurs : "home" | "course" | "quicksort" | "mergesort"
//         | "bst" | "binarysearch" | "bfsdfs" | "complexity-guide"
```

### Pattern d'un algorithme

Chaque algorithme suit une architecture en 5 couches :

```
[données]        data/{algo}*.js
     ↓
[trace]          utils/{algo}Trace.js    ← exécute l'algo, retourne les étapes
     ↓
[hook]           hooks/use{Algo}Animation.js  ← gère l'état, l'autoplay, la vitesse
     ↓
[onglets]        pages/tabs/{Algo}VizTab.jsx, CodeTab, QuizTab…
     ↓
[page]           pages/{Algo}Page.jsx    ← assemble tout + animations GSAP
```

### Format d'une étape de trace

Chaque générateur de trace retourne un tableau d'objets `step` :

```javascript
// Exemple pour BFS/DFS
{
  type: "visit" | "enqueue" | "explore" | "skip" | "backtrack" | "done",
  desc: "Description textuelle de l'étape",
  visited: [0, 1, 3],          // ids des nœuds visités
  frontier: [2, 4],            // file (BFS) ou pile (DFS)
  current: 1,                  // nœud en cours de traitement
  highlightEdge: { from: 1, to: 3 }  // arête mise en évidence
}
```

### Internationalisation

```javascript
// LangContext.jsx expose :
const { lang, setLang, t } = useLang();
// lang: "fr" | "en"
// t("clé.traduction") → string localisée

// Les données bilingues suivent le pattern :
export const ALGO_SECTIONS = { fr: [...], en: [...] };
```

### Thème

Le thème est contrôlé via l'attribut `data-theme` sur `<html>` et des variables CSS :

```css
[data-theme="dark"]  { --bg-deep: #0a0a0f; --text-primary: #f0f0f5; ... }
[data-theme="light"] { --bg-deep: #ffffff; --text-primary: #0f0f14; ... }
```

---

## ➕ Ajouter un algorithme

Pour ajouter un nouvel algorithme, créer les fichiers suivants :

1. **`src/data/{algo}Code.js`** — Code TypeScript à afficher
2. **`src/data/{algo}Sections.js`** — Sections de cours `{ fr: [], en: [] }`
3. **`src/data/{algo}Questions.js`** — Questions de quiz `{ fr: [], en: [] }`
4. **`src/data/{algo}Exercises.js`** — Exercices `{ fr: [], en: [] }`
5. **`src/utils/{algo}Trace.js`** — Fonction `{algo}Trace(input)` → `step[]`
6. **`src/hooks/use{Algo}Animation.js`** — Hook avec `steps`, `stepIdx`, `isPlaying`, contrôles
7. **`src/pages/tabs/{Algo}VizTab.jsx`** — Visualisation
8. **`src/pages/tabs/{Algo}CodeTab.jsx`** — Éditeur de code
9. **`src/pages/tabs/{Algo}QuizTab.jsx`** — Quiz
10. **`src/pages/{Algo}Page.jsx`** — Page principale

Puis modifier :
- **`src/App.jsx`** — Ajouter la page dans `ALGO_PAGES` et le `{page === "…"}` conditionnel
- **`src/pages/HomePage.jsx`** — Ajouter la carte sur la page d'accueil
- **`src/i18n/fr.js`** et **`src/i18n/en.js`** — Ajouter les clés de traduction

---

---

# 🇬🇧 English Documentation

## 📖 Overview

**AzurIT Academy** is an educational web application for visualizing and learning fundamental algorithms interactively. Each algorithm comes with a step-by-step animation, an executable code editor, a validation quiz, and fill-in-the-blank exercises.

The platform has a strong focus on pedagogy: every concept is explained from scratch, visualized in real time, then actively practiced.

---

## ✨ Features

- **Step-by-step visualization** — Animate each algorithm step by step, with play/pause/next/previous controls and adjustable speed
- **Execution log** — Every step is listed and clickable, letting you jump directly to any point in the algorithm
- **TypeScript code editor** — Annotated code, editable and executable directly in the browser (JS sandbox)
- **Interactive quizzes** — Multiple-choice questions with instant feedback and a final score
- **Fill-in-the-blank exercises** — Complete partial implementations with a guide, solution, and error analysis
- **Structured courses** — Every algorithm has pedagogical sections (concept, use cases, complexity, summary)
- **Complexity analysis** — Comparative Big O tables, detailed best/average/worst-case explanations
- **Light / dark theme** — Persisted in localStorage
- **Bilingual FR / EN** — Full interface and all content available in both French and English
- **GSAP animations** — Smooth page entry transitions (SplitText, ScrollTrigger)
- **Responsive** — Designed for wide screens and tablets

---

## 🗂 Available Algorithms

| Algorithm | Category | Complexity | Tabs |
|---|---|---|---|
| **Dijkstra** | Graph | O((V+E) log V) | Viz · Code · Interactive · Quiz · Exercises · Complexity |
| **Quicksort** | Sort | O(n log n) avg. | Viz · Code · Quiz · Exercises · Complexity |
| **Mergesort** | Sort | O(n log n) | Viz · Code · Quiz · Exercises · Complexity |
| **Binary Search Tree (BST)** | Structure | O(log n) avg. | Viz · Code · Quiz · Exercises · Complexity |
| **Binary Search** | Search | O(log n) | Viz · Code · Quiz · Exercises · Complexity |
| **BFS & DFS** | Graph | O(V + E) | Viz · Code · Quiz · Exercises · Complexity |
| **Algorithm Complexity** | Fundamentals | Big O | Interactive guide |

---

## 🛠 Tech Stack

| Tool | Version | Role |
|---|---|---|
| **React** | 18.3 | UI framework (components, hooks, state) |
| **Vite** | 5.4 | Bundler & development server |
| **Tailwind CSS** | 3.4 | Utility-first styles + themed CSS variables |
| **GSAP** | 3.12 | Animations (SplitText, ScrollTrigger) |
| **JavaScript / JSX** | ES2022 | Primary language |

> Code displayed in the editor is TypeScript, but the application itself is written in JavaScript/JSX.

---

## 📁 Project Structure

```
azurit-academy/
├── public/                    # Static assets
├── src/
│   ├── App.jsx                # Main router (state-based routing)
│   ├── components/
│   │   ├── array/             # Array visualizations
│   │   │   ├── ArrayViz.jsx
│   │   │   └── BinarySearchArrayViz.jsx
│   │   ├── bst/               # Binary search tree (SVG)
│   │   │   └── TreeViz.jsx
│   │   ├── code/              # Code editor
│   │   │   └── CodeEditor.jsx
│   │   ├── complexity/        # Complexity charts
│   │   │   └── ComplexityChart.jsx
│   │   ├── course/            # Course section tabs
│   │   │   ├── CourseSectionTabs.jsx
│   │   │   └── SectionContent.jsx
│   │   ├── exercise/          # Exercise question components
│   │   │   ├── ExerciseQuestion.jsx
│   │   │   └── TpQuestion.jsx
│   │   ├── graph/             # Graph visualizations (SVG)
│   │   │   ├── GraphViz.jsx         # Dijkstra (directed, weighted)
│   │   │   └── GraphVizBfsDfs.jsx   # BFS/DFS (undirected)
│   │   ├── interactive/       # Interactive graph builder
│   │   │   └── GraphBuilder.jsx
│   │   ├── layout/            # Header & footer
│   │   │   ├── Footer.jsx
│   │   │   └── TopNav.jsx
│   │   ├── quiz/              # Quiz components
│   │   │   ├── QuizQuestion.jsx
│   │   │   └── QuizScore.jsx
│   │   └── visualization/     # Shared controls & displays
│   │       ├── Controls.jsx        # Play/pause/navigation buttons
│   │       ├── DistanceTable.jsx   # Distance table (Dijkstra)
│   │       ├── HeapViz.jsx         # MinHeap visualization
│   │       └── StepLog.jsx         # Clickable execution log
│   ├── data/                  # Static data per algorithm
│   │   ├── bfsDfsCode.js
│   │   ├── bfsDfsExercises.js
│   │   ├── bfsDfsGraphs.js
│   │   ├── bfsDfsQuestions.js
│   │   ├── bfsDfsSections.js
│   │   ├── binarySearch*.js
│   │   ├── bst*.js
│   │   ├── courseSections.js       # Dijkstra sections
│   │   ├── dijkstra*.js
│   │   ├── graphs.js               # Dijkstra graphs
│   │   ├── mergesort*.js
│   │   └── quicksort*.js
│   ├── hooks/                 # Animation hooks per algorithm
│   │   ├── useBfsDfsAnimation.js
│   │   ├── useBinarySearchAnimation.js
│   │   ├── useBstAnimation.js
│   │   ├── useCustomGraph.js
│   │   ├── useDijkstraAnimation.js
│   │   ├── useGsap.js
│   │   ├── useMergesortAnimation.js
│   │   └── useQuicksortAnimation.js
│   ├── i18n/                  # Internationalization (FR / EN)
│   │   ├── LangContext.jsx
│   │   ├── en.js
│   │   └── fr.js
│   ├── pages/                 # Main pages
│   │   ├── BfsDfsPage.jsx
│   │   ├── BinarySearchPage.jsx
│   │   ├── BstPage.jsx
│   │   ├── ComplexityGuidePage.jsx
│   │   ├── CoursePage.jsx          # Dijkstra page
│   │   ├── HomePage.jsx
│   │   ├── MergesortPage.jsx
│   │   ├── QuicksortPage.jsx
│   │   └── tabs/              # Per-page tab components
│   │       ├── BfsDfsCodeTab.jsx
│   │       ├── BfsDfsComplexityTab.jsx
│   │       ├── BfsDfsQuizTab.jsx
│   │       ├── BfsDfsVizTab.jsx
│   │       ├── ExerciseTab.jsx     # Generic fill-in-the-blank
│   │       ├── InteractiveTab.jsx
│   │       └── ...
│   └── utils/                 # Trace generators & utilities
│       ├── animations.js
│       ├── bfsDfsTrace.js
│       ├── binarySearchTrace.js
│       ├── bstTrace.js
│       ├── dijkstraTrace.js
│       ├── formatContent.jsx   # Lightweight Markdown renderer
│       ├── mergesortTrace.js
│       └── quicksortTrace.js
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install

```bash
# Clone the repository
git clone <repo-url>
cd azurit-academy

# Install dependencies
npm install
```

### Start development server

```bash
npm run dev
# → http://localhost:5173
```

### Production build

```bash
npm run build
# Output files are generated in dist/

npm run preview
# → Local preview of the production build
```

---

## 🏗 Architecture

### Routing

The platform uses **React state-based routing** (no React Router). The `page` variable in `App.jsx` determines which page is shown:

```jsx
// App.jsx
const [page, setPage] = useState("home");
// Values: "home" | "course" | "quicksort" | "mergesort"
//       | "bst" | "binarysearch" | "bfsdfs" | "complexity-guide"
```

### Algorithm Pattern

Each algorithm follows a 5-layer architecture:

```
[data]           data/{algo}*.js
     ↓
[trace]          utils/{algo}Trace.js    ← runs the algo, returns step array
     ↓
[hook]           hooks/use{Algo}Animation.js  ← manages state, autoplay, speed
     ↓
[tabs]           pages/tabs/{Algo}VizTab.jsx, CodeTab, QuizTab…
     ↓
[page]           pages/{Algo}Page.jsx    ← assembles everything + GSAP animations
```

### Trace Step Format

Each trace generator returns an array of `step` objects:

```javascript
// Example for BFS/DFS
{
  type: "visit" | "enqueue" | "explore" | "skip" | "backtrack" | "done",
  desc: "Human-readable step description",
  visited: [0, 1, 3],          // ids of visited nodes
  frontier: [2, 4],            // queue (BFS) or stack (DFS)
  current: 1,                  // node currently being processed
  highlightEdge: { from: 1, to: 3 }  // edge to highlight
}
```

### Internationalization

```javascript
// LangContext.jsx exposes:
const { lang, setLang, t } = useLang();
// lang: "fr" | "en"
// t("translation.key") → localized string

// Bilingual data files follow the pattern:
export const ALGO_SECTIONS = { fr: [...], en: [...] };
```

### Theming

The theme is controlled via a `data-theme` attribute on `<html>` and CSS custom properties:

```css
[data-theme="dark"]  { --bg-deep: #0a0a0f; --text-primary: #f0f0f5; ... }
[data-theme="light"] { --bg-deep: #ffffff; --text-primary: #0f0f14; ... }
```

---

## ➕ Adding an Algorithm

To add a new algorithm, create the following files:

1. **`src/data/{algo}Code.js`** — TypeScript code to display
2. **`src/data/{algo}Sections.js`** — Course sections `{ fr: [], en: [] }`
3. **`src/data/{algo}Questions.js`** — Quiz questions `{ fr: [], en: [] }`
4. **`src/data/{algo}Exercises.js`** — Exercises `{ fr: [], en: [] }`
5. **`src/utils/{algo}Trace.js`** — `{algo}Trace(input)` function → `step[]`
6. **`src/hooks/use{Algo}Animation.js`** — Hook with `steps`, `stepIdx`, `isPlaying`, controls
7. **`src/pages/tabs/{Algo}VizTab.jsx`** — Visualization tab
8. **`src/pages/tabs/{Algo}CodeTab.jsx`** — Code editor tab
9. **`src/pages/tabs/{Algo}QuizTab.jsx`** — Quiz tab
10. **`src/pages/{Algo}Page.jsx`** — Main page component

Then update:
- **`src/App.jsx`** — Add the page to `ALGO_PAGES` and the conditional render
- **`src/pages/HomePage.jsx`** — Add the card on the home page
- **`src/i18n/fr.js`** and **`src/i18n/en.js`** — Add translation keys

---

## 📄 License

Ce projet est open-source et distribué sous la licence **MIT**.
This project is open-source and distributed under the **MIT** license.
