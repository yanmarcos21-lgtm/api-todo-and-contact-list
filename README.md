# API Todo and Contact List

Taller **DOM + API con Node JS y Express**. Una sola aplicación con una API REST (Express) y una interfaz web que manipula el DOM para gestionar una **lista de tareas** y una **lista de contactos**.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución

```bash
npm install
npm start
```

Abre http://localhost:3000 en el navegador. Para recargar automáticamente al cambiar código: `npm run dev`.

## Estructura

```
├── server.js            # Servidor Express
├── routes/
│   ├── tasks.js         # API de tareas
│   └── contacts.js      # API de contactos
└── public/
    ├── index.html       # Interfaz
    ├── css/style.css
    └── js/app.js        # Manipulación del DOM + fetch a la API
```

## Endpoints

### Tareas — `/api/tasks`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tasks` | Lista todas las tareas |
| GET | `/api/tasks/:id` | Obtiene una tarea |
| POST | `/api/tasks` | Crea una tarea. Body: `{ "title": "..." }` |
| PUT | `/api/tasks/:id` | Actualiza `title` y/o `completed` |
| DELETE | `/api/tasks/:id` | Elimina una tarea |

### Contactos — `/api/contacts`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/contacts` | Lista todos los contactos |
| GET | `/api/contacts/:id` | Obtiene un contacto |
| POST | `/api/contacts` | Crea un contacto |
| PUT | `/api/contacts/:id` | Actualiza un contacto |
| DELETE | `/api/contacts/:id` | Elimina un contacto |

Body de un contacto:

```json
{
  "name": "Ana",
  "lastname": "Pérez",
  "phone": "3001234567",
  "city": "Cali",
  "address": "Calle 5 # 10-20",
  "gender": "Female"
}
```

Los datos se guardan en memoria: se reinician al reiniciar el servidor.

## Pruebas rápidas con curl

```bash
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"Estudiar Express"}'
curl http://localhost:3000/api/tasks
curl -X PUT http://localhost:3000/api/tasks/1 -H "Content-Type: application/json" -d '{"completed":true}'
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Aprendizajes

- **DOM:** crear elementos con `createElement`, usar `textContent` (evita inyectar HTML), `replaceChildren` para volver a pintar listas y `addEventListener` para eventos.
- **Express:** `express.json()` para leer el body, `express.static` para servir el front, y `express.Router()` para separar rutas por recurso.
- **Métodos HTTP:** GET lee, POST crea, PUT actualiza y DELETE elimina; cada uno con su código de estado (200, 201, 400, 404).
- **fetch + async/await:** conectar el front con la API y mostrar los errores al usuario.
- **Validación:** el servidor valida los datos aunque el front también lo haga.

## Uso de AI

Se usó **Claude (Anthropic)** como apoyo para:

- Generar la estructura inicial del proyecto, la API y la interfaz.
- Explicar cómo funciona cada parte del código.

Todo el código fue revisado, ejecutado y probado por el autor antes de la entrega.

## Autor

Marco Obregón
