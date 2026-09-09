# MovieHub  | [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=61DAFB)](#) + [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#) + [![HTML/CSS](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#) + [![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)](#)

![Project preview](../project-preview.png)

Catalogo di film costruito come esercizio di ripasso React, dall'esercizio 1 (componenti e props) all'esercizio 8 (routing completo con React Router).

### 1) Clona

```bash
git clone https://github.com/SCodreanu/ExercisesReactJS.git
cd my-app
```

### 2) Installa

```bash
npm install
```

### 3) Avvia Localmente

```bash
npm run dev
```

### 4) Build

```bash
npm run build
```

---


## Esercizi svolti

**1. I primi componenti**
`MovieCard` (props `title`, `year`, `poster`) e `Container` (layout con `children`), con 3-4 card inserite a mano in `App.jsx` e uno stile CSS di base.

**2. Dati dinamici e liste**
Dati spostati in `src/data/movies.js` (array di oggetti). `MovieList` genera le card con `.map()` e `key`. Stato "visto"/"da vedere" mostrato con ternario, genere mostrato solo se presente con `&&`.

**3. Stato ed eventi**
Array `movies` in `useState`. Pulsante "★ Preferito" in `MovieCard`, gestito in `App` (stato) e passato come prop; aggiornamento immutabile con `setMovies` + `.map()`. Classe dinamica `movie-card--favorite`.

**4. Form, filtri e stato derivato**
`SearchBar` con input controllato, stato `searchTerm` elevato al genitore. Lista filtrata e contatore preferiti calcolati come stato derivato ad ogni render, non come stato a parte.

**5. useRef e useEffect**
`useRef` per il focus automatico sulla search bar al mount. Due `useEffect`: uno salva `movies` in `localStorage` a ogni cambiamento, l'altro legge i dati salvati al mount (se presenti) come stato iniziale.

**6. Context API e Provider pattern**
`MoviesContext` + `MoviesContextProvider` (in `src/context/MoviesContext.jsx`) incapsulano stato dei film, preferiti e "visti". `MovieCard` e le pagine leggono tutto con `useContext`, eliminando il prop drilling.

**7. Dati da un'API con async/await**
Il provider fa il fetch dei film popolari (e dei generi) da [The Movie Database](https://www.themoviedb.org/) dentro `useEffect`, con una funzione async interna richiamata subito (la callback di `useEffect` non può essere `async`). Stati `isLoading` ed `error` per mostrare caricamento/errore.

**8. Routing completo con React Router**
`react-router-dom` con `createBrowserRouter`/`RouterProvider`. `Layout` con navbar e `<Outlet />`. Route: `/` (`HomePage`), `/favorites` (`FavoritesPage`), `/movies/:movieId` (`MovieDetailPage`, con `useParams`), `*` (`NotFoundPage`). Click sulla card → `<Link>` al dettaglio; "torna indietro" con `useNavigate()`. Bonus: la ricerca vive nella query string (`/?q=...`), letta con `useLocation()`, così il risultato è condivisibile via link.


