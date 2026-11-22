const API_URL = '/api/contactos';

const formContacto = document.getElementById('formContacto');
const listaContactos = document.getElementById('listaContactos');

// ---------- Cargar contactos (GET) ----------
async function cargarContactos() {
  const respuesta = await fetch(API_URL);
  const contactos = await respuesta.json();
  renderizarContactos(contactos);
}

// ---------- Pintar en el DOM ----------
function renderizarContactos(contactos) {
  listaContactos.innerHTML = '';

  contactos.forEach((c) => {
    const li = document.createElement('li');

    const info = document.createElement('div');
    info.textContent = `${c.nombre} ${c.apellido} · ${c.telefono} · ${c.ciudad} · ${c.direccion} · ${c.genero}`;

    const acciones = document.createElement('div');
    acciones.className = 'acciones';

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn-icono btn-editar';
    btnEditar.textContent = '✎';
    btnEditar.addEventListener('click', () => editarContacto(c));

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-icono btn-eliminar';
    btnEliminar.textContent = '✕';
    btnEliminar.addEventListener('click', () => eliminarContacto(c.id));

    acciones.append(btnEditar, btnEliminar);
    li.append(info, acciones);
    listaContactos.appendChild(li);
  });
}

// ---------- Crear contacto (POST) ----------
formContacto.addEventListener('submit', async (e) => {
  e.preventDefault();

  const genero = document.querySelector('input[name="genero"]:checked');
  const contacto = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    telefono: document.getElementById('telefono').value,
    ciudad: document.getElementById('ciudad').value,
    direccion: document.getElementById('direccion').value,
    genero: genero ? genero.value : ''
  };

  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contacto)
  });

  if (respuesta.ok) {
    formContacto.reset();
    cargarContactos();
  } else {
    alert('Completa todos los campos');
  }
});

// ---------- Editar teléfono (PUT) ----------
async function editarContacto(contacto) {
  const nuevoTelefono = prompt('Nuevo teléfono:', contacto.telefono);
  if (nuevoTelefono === null || !nuevoTelefono.trim()) return;

  await fetch(`${API_URL}/${contacto.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telefono: nuevoTelefono })
  });
  cargarContactos();
}

// ---------- Eliminar (DELETE) ----------
async function eliminarContacto(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  cargarContactos();
}

cargarContactos();
