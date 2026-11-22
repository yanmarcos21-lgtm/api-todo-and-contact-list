// ---------- Utilidades ----------
async function api(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Error en la petición');
  return data;
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  children.forEach((c) => node.append(c));
  return node;
}

// ---------- Contactos ----------
const contactForm = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
const contactError = document.getElementById('contact-error');
const contactSubmit = document.getElementById('contact-submit');
const contactCancel = document.getElementById('contact-cancel');
let editingContactId = null;

function readContactForm() {
  const gender = contactForm.querySelector('input[name="gender"]:checked');
  return {
    name: document.getElementById('c-name').value,
    lastname: document.getElementById('c-lastname').value,
    phone: document.getElementById('c-phone').value,
    city: document.getElementById('c-city').value,
    address: document.getElementById('c-address').value,
    gender: gender ? gender.value : '',
  };
}

function resetContactForm() {
  contactForm.reset();
  editingContactId = null;
  contactSubmit.textContent = 'ADD';
  contactCancel.hidden = true;
  contactError.textContent = '';
}

function startEditContact(contact) {
  editingContactId = contact.id;
  document.getElementById('c-name').value = contact.name;
  document.getElementById('c-lastname').value = contact.lastname;
  document.getElementById('c-phone').value = contact.phone;
  document.getElementById('c-city').value = contact.city;
  document.getElementById('c-address').value = contact.address;
  const radio = contactForm.querySelector(`input[name="gender"][value="${contact.gender}"]`);
  if (radio) radio.checked = true;
  contactSubmit.textContent = 'SAVE';
  contactCancel.hidden = false;
  document.getElementById('c-name').focus();
}

function renderContacts(contacts) {
  contactList.replaceChildren();
  if (!contacts.length) {
    contactList.append(el('li', { className: 'empty' }, 'Aún no hay contactos. Agrega el primero.'));
    return;
  }
  contacts.forEach((c) => {
    const info = el(
      'div',
      { className: 'info' },
      el('strong', {}, `${c.name} ${c.lastname}`),
      el('span', { className: 'meta' }, `${c.phone} · ${c.city} · ${c.address} · ${c.gender}`)
    );
    const editBtn = el('button', { type: 'button', className: 'btn-edit' }, 'Editar');
    editBtn.addEventListener('click', () => startEditContact(c));
    const delBtn = el('button', { type: 'button', className: 'btn-delete' }, 'Eliminar');
    delBtn.addEventListener('click', async () => {
      try {
        await api(`/api/contacts/${c.id}`, { method: 'DELETE' });
        if (editingContactId === c.id) resetContactForm();
        loadContacts();
      } catch (err) {
        contactError.textContent = err.message;
      }
    });
    contactList.append(el('li', {}, info, el('div', { className: 'row-actions' }, editBtn, delBtn)));
  });
}

async function loadContacts() {
  try {
    renderContacts(await api('/api/contacts'));
  } catch (err) {
    contactError.textContent = err.message;
  }
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  contactError.textContent = '';
  const body = JSON.stringify(readContactForm());
  try {
    if (editingContactId === null) {
      await api('/api/contacts', { method: 'POST', body });
    } else {
      await api(`/api/contacts/${editingContactId}`, { method: 'PUT', body });
    }
    resetContactForm();
    loadContacts();
  } catch (err) {
    contactError.textContent = err.message;
  }
});

contactCancel.addEventListener('click', resetContactForm);

// ---------- Tareas ----------
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');
const taskError = document.getElementById('task-error');

function renderTasks(tasks) {
  taskList.replaceChildren();
  if (!tasks.length) {
    taskList.append(el('li', { className: 'empty' }, 'No tienes tareas pendientes.'));
    return;
  }
  tasks.forEach((t) => {
    const checkbox = el('input', { type: 'checkbox', checked: t.completed });
    checkbox.addEventListener('change', async () => {
      try {
        await api(`/api/tasks/${t.id}`, {
          method: 'PUT',
          body: JSON.stringify({ completed: checkbox.checked }),
        });
        loadTasks();
      } catch (err) {
        taskError.textContent = err.message;
      }
    });
    const label = el('label', { className: 'task-label' }, checkbox, el('span', { className: 'task-text' }, t.title));

    const editBtn = el('button', { type: 'button', className: 'btn-edit' }, 'Editar');
    editBtn.addEventListener('click', async () => {
      const title = prompt('Editar tarea', t.title);
      if (title === null) return;
      try {
        await api(`/api/tasks/${t.id}`, { method: 'PUT', body: JSON.stringify({ title }) });
        taskError.textContent = '';
        loadTasks();
      } catch (err) {
        taskError.textContent = err.message;
      }
    });
    const delBtn = el('button', { type: 'button', className: 'btn-delete' }, 'Eliminar');
    delBtn.addEventListener('click', async () => {
      try {
        await api(`/api/tasks/${t.id}`, { method: 'DELETE' });
        loadTasks();
      } catch (err) {
        taskError.textContent = err.message;
      }
    });

    taskList.append(
      el('li', { className: t.completed ? 'done' : '' }, label, el('div', { className: 'row-actions' }, editBtn, delBtn))
    );
  });
}

async function loadTasks() {
  try {
    renderTasks(await api('/api/tasks'));
  } catch (err) {
    taskError.textContent = err.message;
  }
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  taskError.textContent = '';
  try {
    await api('/api/tasks', { method: 'POST', body: JSON.stringify({ title: taskInput.value }) });
    taskForm.reset();
    loadTasks();
  } catch (err) {
    taskError.textContent = err.message;
  }
});

// ---------- Inicio ----------
loadContacts();
loadTasks();
