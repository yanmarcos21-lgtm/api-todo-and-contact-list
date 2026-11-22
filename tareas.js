const API_URL = '/api/tareas';

const entradaTarea = document.getElementById('entradaTarea');
const btnAnadir = document.getElementById('btnAnadir');
const listaTareas = document.getElementById('listaTareas');

// ---------- Cargar tareas (GET) ----------
async function cargarTareas() {
  const respuesta = await fetch(API_URL);
  const tareas = await respuesta.json();
  renderizarTareas(tareas);
}

// ---------- Pintar en el DOM ----------
function renderizarTareas(tareas) {
  listaTareas.innerHTML = '';

  tareas.forEach((tarea) => {
    const li = document.createElement('li');
    if (tarea.completada) li.classList.add('completada');

    const texto = document.createElement('span');
    texto.className = 'texto';
    texto.textContent = tarea.texto;

    const acciones = document.createElement('div');
    acciones.className = 'acciones';

    const btnCompletar = document.createElement('button');
    btnCompletar.className = 'btn-icono btn-completar';
    btnCompletar.textContent = '✓';
    btnCompletar.addEventListener('click', () => completarTarea(tarea));

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn-icono btn-editar';
    btnEditar.textContent = '✎';
    btnEditar.addEventListener('click', () => editarTarea(tarea));

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-icono btn-eliminar';
    btnEliminar.textContent = '✕';
    btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

    acciones.append(btnCompletar, btnEditar, btnEliminar);
    li.append(texto, acciones);
    listaTareas.appendChild(li);
  });
}

// ---------- Crear tarea (POST) ----------
async function anadirTarea() {
  const texto = entradaTarea.value.trim();
  if (!texto) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto })
  });

  entradaTarea.value = '';
  cargarTareas();
}

// ---------- Marcar como completada (PUT) ----------
async function completarTarea(tarea) {
  await fetch(`${API_URL}/${tarea.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completada: !tarea.completada })
  });
  cargarTareas();
}

// ---------- Editar texto (PUT) ----------
async function editarTarea(tarea) {
  const nuevoTexto = prompt('Edita tu tarea:', tarea.texto);
  if (nuevoTexto === null || !nuevoTexto.trim()) return;

  await fetch(`${API_URL}/${tarea.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto: nuevoTexto })
  });
  cargarTareas();
}

// ---------- Eliminar (DELETE) ----------
async function eliminarTarea(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  cargarTareas();
}

// ---------- Eventos ----------
btnAnadir.addEventListener('click', anadirTarea);
entradaTarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') anadirTarea();
});

cargarTareas();
