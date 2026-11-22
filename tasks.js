const express = require('express');
const router = express.Router();

let tasks = [];
let nextId = 1;

// GET /api/tasks -> lista todas las tareas
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id -> obtiene una tarea
router.get('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
});

// POST /api/tasks -> crea una tarea
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title || !String(title).trim()) {
    return res.status(400).json({ error: 'El campo title es obligatorio' });
  }
  const task = { id: nextId++, title: String(title).trim(), completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /api/tasks/:id -> actualiza una tarea
router.put('/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

  const { title, completed } = req.body;
  if (title !== undefined) {
    if (!String(title).trim()) {
      return res.status(400).json({ error: 'El campo title no puede estar vacío' });
    }
    task.title = String(title).trim();
  }
  if (completed !== undefined) task.completed = Boolean(completed);
  res.json(task);
});

// DELETE /api/tasks/:id -> elimina una tarea
router.delete('/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });
  const [removed] = tasks.splice(index, 1);
  res.json(removed);
});

module.exports = router;
