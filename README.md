# 🎬 MovieRadar

**MovieRadar** es una aplicación web moderna y robusta para la exploración de cine y televisión. Construida con el ecosistema de **React** y estilizada con **Tailwind CSS**, utiliza la potente API de **The Movie Database (TMDb)** para ofrecer información actualizada, trailers, reseñas y recomendaciones inteligentes.

**[Ver el proyecto en vivo 🚀](https://proyecto-final-js-movie-radar.vercel.app/)**

---

## ✨ Características Principales

### 🔍 Búsqueda y Descubrimiento Avanzado
* **Búsqueda Híbrida:** Sistema inteligente que alterna entre búsqueda por texto y modo "Descubrimiento" por categorías.
* **Filtros Facetados:** Filtra contenido por **Categoría** (Cine/TV), **Género** (Acción, Comedia, etc.) y **Año**.
* **Paginación Inteligente:** Navegación completa con botones de anterior/siguiente y un input de "Salto Rápido" para navegar entre miles de resultados.

### 📱 Experiencia de Usuario (UX/UI)
* **Diseño Responsive:** Interfaz adaptativa que funciona perfecto en móviles y escritorio.
* **UI Personalizada:** Barras de desplazamiento estéticas (Custom Scrollbars), transiciones suaves y efectos hover.
* **Navegación Rápida:** Scroll automático al cambiar de página y feedback visual de carga (Spinners).

### 🎞️ Detalle de Contenido (Rich Media)
* **Fichas Completas:** Información detallada de Películas y Series separadas por rutas semánticas (`/movie/:id` y `/tv/:id`).
* **Trailers Integrados:** Reproductor de YouTube incrustado para ver avances sin salir de la app.
* **Elenco Visual:** Carrusel con fotos y nombres de los actores principales.
* **Reseñas de Usuarios:** Sección de críticas y opiniones reales de la comunidad.
* **Recomendaciones:** Sugerencias automáticas basadas en el título que estás viendo.

---

## 🛠️ Stack Tecnológico

* **Core:** React 18+ (Hooks personalizados & Context)
* **Build Tool:** Vite (Rendimiento extremo)
* **Estilos:** Tailwind CSS v4 (Diseño atómico y responsive)
* **Routing:** React Router DOM v6+ (Rutas dinámicas y anidadas)
* **Datos:** TMDb API (The Movie Database)
* **Despliegue:** Vercel

---

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular y limpia:

```text
src/
├── components/   # Piezas de UI reutilizables (Cards, Pagination, Filters...)
├── hooks/        # Lógica de negocio (useMovies, useMovieDetail...)
├── layout/       # Estructura base (Header, Footer, MainLayout)
├── pages/        # Vistas principales (Home, Search, Details...)
├── router/       # Configuración de rutas
├── services/     # Adaptador de API (tmdb.js)
└── styles/       # CSS global y configuraciones