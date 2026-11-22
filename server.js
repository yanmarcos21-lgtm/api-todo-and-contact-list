const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------------
// Datos en memoria
// ---------------------------------------------------------------
let tareas = [];
let contactos = [];
let siguienteIdTarea = 1;
let siguienteIdContacto = 1;

// ---------------------------------------------------------------
// API TAREAS  ->  /api/tareas
// ---------------------------------------------------------------

// GET: obtener todas las tareas
app.get('/api/tareas', (req, res) => {
  res.json(tareas);
});

// POST: crear una tarea
app.post('/api/tareas', (req, res) => {
  const texto = (req.body.texto || '').trim();
  if (!texto) {
    return res.status(400).json({ error: 'El campo "texto" es obligatorio' });
  }
  const nueva = { id: siguienteIdTarea++, texto, completada: false };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

// PUT: actualizar una tarea (texto y/o completada)
app.put('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  if (typeof req.body.texto === 'string') {
    const texto = req.body.texto.trim();
    if (!texto) {
      return res.status(400).json({ error: 'El texto no puede estar vacío' });
    }
    tarea.texto = texto;
  }
  if (typeof req.body.completada === 'boolean') {
    tarea.completada = req.body.completada;
  }
  res.json(tarea);
});

// DELETE: eliminar una tarea
app.delete('/api/tareas/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = tareas.findIndex((t) => t.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  const eliminada = tareas.splice(indice, 1)[0];
  res.json(eliminada);
});

// ---------------------------------------------------------------
// API CONTACTOS  ->  /api/contactos
// ---------------------------------------------------------------
const CAMPOS_CONTACTO = ['nombre', 'apellido', 'telefono', 'ciudad', 'direccion', 'genero'];

// GET: obtener todos los contactos
app.get('/api/contactos', (req, res) => {
  res.json(contactos);
});

// POST: crear un contacto
app.post('/api/contactos', (req, res) => {
  const faltantes = CAMPOS_CONTACTO.filter(
    (campo) => !req.body[campo] || !String(req.body[campo]).trim()
  );
  if (faltantes.length > 0) {
    return res
      .status(400)
      .json({ error: 'Faltan campos obligatorios', campos: faltantes });
  }
  const nuevo = { id: siguienteIdContacto++ };
  CAMPOS_CONTACTO.forEach((campo) => {
    nuevo[campo] = String(req.body[campo]).trim();
  });
  contactos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT: actualizar un contacto
app.put('/api/contactos/:id', (req, res) => {
  const id = Number(req.params.id);
  const contacto = contactos.find((c) => c.id === id);
  if (!contacto) {
    return res.status(404).json({ error: 'Contacto no encontrado' });
  }
  CAMPOS_CONTACTO.forEach((campo) => {
    if (typeof req.body[campo] === 'string' && req.body[campo].trim()) {
      contacto[campo] = req.body[campo].trim();
    }
  });
  res.json(contacto);
});

// DELETE: eliminar un contacto
app.delete('/api/contactos/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = contactos.findIndex((c) => c.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: 'Contacto no encontrado' });
  }
  const eliminado = contactos.splice(indice, 1)[0];
  res.json(eliminado);
});

// ---------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
