# 🎬 MovieRadar

**MovieRadar** es una aplicación web moderna para la exploración de cine y televisión. Construida con **React** y **Tailwind CSS**, utiliza la potencia de la **TMDb API** para datos globales y la **MyMemory Translation API** para romper barreras de idioma en las reseñas de la comunidad.

**[Ver el proyecto en vivo 🚀](https://proyecto-final-js-movie-radar.vercel.app/)**

---

## ✨ Características Principales

### 🌍 Traducción en Tiempo Real
* **Reseñas Multilingües:** Integra la API de **MyMemory** para traducir instantáneamente las opiniones de la comunidad (originalmente en inglés, francés, etc.) al español con un solo clic, sin recargar la página.

### 🔍 Búsqueda y Descubrimiento
* **Búsqueda Híbrida:** Sistema inteligente que alterna entre búsqueda por texto y modo "Descubrimiento" por categorías automáticamente.
* **Filtros Avanzados:** Facetas de búsqueda por **Categoría** (Cine/TV), **Género** y **Año**.
* **Paginación Pro:** Navegación completa con input de "Salto Rápido" para navegar eficientemente entre miles de resultados.

### 📱 Experiencia de Usuario (UX/UI)
* **Diseño Responsive:** Adaptación fluida a móviles, tablets y escritorio.
* **UI Personalizada:** Estética cuidada con scrollbars personalizados, transiciones suaves y skeleton loaders.
* **Navegación Optimizada:** Enrutamiento semántico (`/movie` vs `/tv`) y scroll automático.

### 🎞️ Detalle de Contenido (Rich Media)
* **Trailers Integrados:** Reproductor de YouTube incrustado para ver avances sin salir de la app.
* **Elenco Visual:** Carrusel interactivo con el reparto principal.
* **Recomendaciones Inteligentes:** Sistema de sugerencias con *fallback* algorítmico: si la API no recomienda nada, nuestra lógica busca títulos similares por género y popularidad.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React 19 (Hooks, Context API)
* **Build Tool:** Vite 7
* **Estilos:** Tailwind CSS 4
* **Routing:** React Router 7
* **Datos:** TMDb API v3
* **Traducción:** MyMemory Translation API (REST)
* **Despliegue:** Vercel

---

## 🚀 Instalación y Configuración Local

Si deseas correr este proyecto en tu máquina:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/EdhuMS/Proyecto-Final-JS-MovieRadar.git
    cd Proyecto-Final-JS-MovieRadar
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade tus claves:
    
    ```env
    # API Key de The Movie Database (Gratuita en themoviedb.org)
    VITE_TMDB_API_KEY=tu_api_key_de_tmdb
    
    # URL Base para las imágenes
    VITE_TMDB_BS_IMG=https://image.tmdb.org/t/p/w500
    
    # Email para aumentar la cuota de traducción (Opcional, recomendado)
    VITE_TRANSLATION_EMAIL=tu_email@ejemplo.com
    ```

4.  **Corre el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

¡Listo! Abre `http://localhost:5173` en tu navegador.

---

## 📂 Estructura del Proyecto

El código sigue una arquitectura limpia y modular, facilitando la escalabilidad:

```text
src/
├── components/   # Piezas de UI (MovieCard, Pagination, ReviewCard...)
├── hooks/        # Lógica reutilizable (useMovies, useDebounce...)
├── layout/       # Layouts principales
├── pages/        # Vistas (Home, Search, Details...)
├── router/       # Configuración de rutas
├── services/     # Adaptadores de API (tmdb.js, translation.js)
└── styles/       # Estilos globales y custom scrollbars
```

## Alcance, APIs y uso responsable

Este repositorio es un proyecto de aprendizaje. Para ejecutarlo, configura tus propias credenciales de las APIs que correspondan y revisa las condiciones, cuotas y atribuciones de [TMDb](https://www.themoviedb.org/) y [MyMemory](https://mymemory.translated.net/). Los pósteres, imágenes, tráileres, títulos y marcas provenientes de servicios externos **no se consideran licenciados por este repositorio**.

## Licencia y contenido de terceros

El **código original** de MovieRadar está disponible bajo **[MIT](LICENSE)**. Esta licencia permite utilizarlo y modificarlo, incluso comercialmente, conservando el aviso de copyright y la licencia.

**Quedan fuera de esa concesión los materiales de terceros**: datos, imágenes, carteles, clips, marcas y otros contenidos entregados por TMDb, YouTube, MyMemory u otros proveedores, conforme a sus propias condiciones. La distribución de código bajo MIT no implica derechos de explotación sobre obras audiovisuales externas. Para el uso de sus APIs consulta su documentación oficial.

