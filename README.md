# 🎬 MovieRadar

¡Bienvenido a MovieRadar! Una aplicación web moderna construida con React, Vite y Tailwind CSS para explorar, buscar y descubrir tus películas y series favoritas usando la OMDb API.

**[Ver el proyecto en vivo 🚀](https://proyecto-final-js-movie-radar.vercel.app/)**

---

## ✨ Características Principales

* **Búsqueda Rápida en el Header:** Un buscador "en vivo" con *debounce* que muestra resultados instantáneos mientras escribes.
* **Páginas Dedicadas:** Secciones separadas y optimizadas para Películas, Series y una Home page dinámica.
* **Carruseles Dinámicos:** La página de inicio utiliza búsquedas múltiples y aleatorias para mostrar contenido fresco en cada visita.
* **Diseño 100% Responsivo:** Interfaz moderna creada con Tailwind CSS que se adapta perfectamente a móviles, tablets y escritorio.
* **Navegación Fluida:** Creado como una SPA (Single Page Application) usando React Router, con scroll automático al inicio en cada cambio de ruta.
* **Manejo de Errores:** Incluye páginas 404 personalizadas y manejo de errores de API y de imágenes rotas.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 18+ (con Hooks)
* **Build Tool:** Vite
* **Estilos:** Tailwind CSS
* **Routing:** React Router DOM v6
* **API:** OMDb API
* **Despliegue:** Vercel

---

## 🚀 Cómo Empezar (Localmente)

Si quieres correr este proyecto en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/EdhuMS/Proyecto-Final-JS-MovieRadar.git](https://github.com/EdhuMS/Proyecto-Final-JS-MovieRadar.git)
    cd Proyecto-Final-JS-MovieRadar
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Crea tu archivo de entorno:**
    En la raíz del proyecto, crea un archivo llamado `.env` y añade tu API Key de OMDb:
    ```
    VITE_OMDB_API_KEY=tu_api_key_aqui
    ```

4.  **Corre el proyecto:**
    ```bash
    npm run dev
    ```

¡Y listo! La aplicación estará corriendo en `http://localhost:5173`.