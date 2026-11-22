# Taller DOM + API con Node JS y Express

**Autor:** Marco Obregón
**Curso:** G611 – Semestre 2 de 2026
**Entrega:** Taller DOM + API con Node JS y Express

Aplicación web con un servidor **Node.js + Express** que expone una API REST (GET, POST, PUT y DELETE) y dos interfaces que manipulan el **DOM** y consumen esa API:

1. **Lista de tareas** (`/`)
2. **Lista de contactos** (`/contactos.html`)

## Estructura del proyecto

```
├── server.js              # Servidor Express y rutas de la API
├── package.json
├── .gitignore
├── README.md
└── public/
    ├── index.html         # Lista de tareas
    ├── contactos.html     # Lista de contactos
    ├── css/styles.css
    └── js/
        ├── tareas.js      # DOM + fetch a /api/tareas
        └── contactos.js   # DOM + fetch a /api/contactos
```

## Cómo ejecutarlo

```bash
npm install
npm start
```

Abrir en el navegador: <http://localhost:3000>

## API

### Tareas – `/api/tareas`

| Método | Ruta              | Descripción                    | Body (JSON)                        |
|--------|-------------------|--------------------------------|------------------------------------|
| GET    | `/api/tareas`     | Lista todas las tareas         | –                                  |
| POST   | `/api/tareas`     | Crea una tarea                 | `{ "texto": "Estudiar Express" }`  |
| PUT    | `/api/tareas/:id` | Edita texto y/o completada     | `{ "texto": "...", "completada": true }` |
| DELETE | `/api/tareas/:id` | Elimina una tarea              | –                                  |

### Contactos – `/api/contactos`

| Método | Ruta                 | Descripción                  | Body (JSON)                                                                 |
|--------|----------------------|------------------------------|------------------------------------------------------------------------------|
| GET    | `/api/contactos`     | Lista todos los contactos    | –                                                                            |
| POST   | `/api/contactos`     | Crea un contacto             | `{ "nombre", "apellido", "telefono", "ciudad", "direccion", "genero" }`      |
| PUT    | `/api/contactos/:id` | Actualiza campos del contacto| Cualquiera de los campos anteriores                                          |
| DELETE | `/api/contactos/:id` | Elimina un contacto          | –                                                                            |

Los datos se guardan **en memoria**: se reinician al apagar el servidor.

## Aprendizajes

- Crear un servidor con **Express** y servir archivos estáticos con `express.static`.
- Usar `express.json()` para leer el cuerpo de las peticiones.
- Implementar los métodos **GET, POST, PUT y DELETE** y devolver códigos HTTP adecuados (200, 201, 400, 404).
- Consumir la API desde el navegador con `fetch` y `async/await`.
- Manipular el **DOM** con `createElement`, `textContent`, `append` y `addEventListener` para pintar las listas sin recargar la página.
- Validar datos tanto en el cliente como en el servidor.
- Organizar un proyecto con carpeta `public` para el front-end y `server.js` para el back-end.

## Uso de AI

Usé **Claude (Anthropic)** como apoyo para:

- Estructurar el proyecto y generar la primera versión del código del servidor, las páginas y los scripts.
- Obtener explicaciones de cómo funcionan las rutas de Express y `fetch`.

Todo el código fue revisado, probado y entendido por mí antes de entregarlo; las referencias visuales (lista de tareas morada y lista de contactos amarilla) las tomé de las imágenes de ejemplo del curso.
