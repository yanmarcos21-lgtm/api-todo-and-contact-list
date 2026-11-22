const express = require('express');
const router = express.Router();

let contacts = [];
let nextId = 1;

const FIELDS = ['name', 'lastname', 'phone', 'city', 'address', 'gender'];

function clean(body) {
  const data = {};
  FIELDS.forEach((f) => {
    if (body[f] !== undefined) data[f] = String(body[f]).trim();
  });
  return data;
}

// GET /api/contacts -> lista todos los contactos
router.get('/', (req, res) => {
  res.json(contacts);
});

// GET /api/contacts/:id -> obtiene un contacto
router.get('/:id', (req, res) => {
  const contact = contacts.find((c) => c.id === Number(req.params.id));
  if (!contact) return res.status(404).json({ error: 'Contacto no encontrado' });
  res.json(contact);
});

// POST /api/contacts -> crea un contacto
router.post('/', (req, res) => {
  const data = clean(req.body);
  const missing = FIELDS.filter((f) => !data[f]);
  if (missing.length) {
    return res.status(400).json({ error: `Faltan campos: ${missing.join(', ')}` });
  }
  const contact = { id: nextId++, ...data };
  contacts.push(contact);
  res.status(201).json(contact);
});

// PUT /api/contacts/:id -> actualiza un contacto
router.put('/:id', (req, res) => {
  const contact = contacts.find((c) => c.id === Number(req.params.id));
  if (!contact) return res.status(404).json({ error: 'Contacto no encontrado' });

  const data = clean(req.body);
  const empty = Object.keys(data).filter((f) => !data[f]);
  if (empty.length) {
    return res.status(400).json({ error: `Campos vacíos: ${empty.join(', ')}` });
  }
  Object.assign(contact, data);
  res.json(contact);
});

// DELETE /api/contacts/:id -> elimina un contacto
router.delete('/:id', (req, res) => {
  const index = contacts.findIndex((c) => c.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Contacto no encontrado' });
  const [removed] = contacts.splice(index, 1);
  res.json(removed);
});

module.exports = router;
