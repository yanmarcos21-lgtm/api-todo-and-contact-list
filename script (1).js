const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista-contactos");
const vacio = document.getElementById("vacio");
const mensaje = document.getElementById("mensaje");

const campos = ["nombre", "apellido", "telefono", "ciudad", "direccion"];
let contactos = [];

function mostrarContactos() {
  lista.innerHTML = "";

  contactos.forEach((c, i) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.textContent = `${c.nombre} ${c.apellido} · Tel: ${c.telefono} · ${c.ciudad}, ${c.direccion} · ${c.genero}`;

    const borrar = document.createElement("button");
    borrar.type = "button";
    borrar.className = "btn-borrar";
    borrar.textContent = "Eliminar";
    borrar.addEventListener("click", () => {
      contactos.splice(i, 1);
      mostrarContactos();
    });

    li.append(info, borrar);
    lista.appendChild(li);
  });

  vacio.style.display = contactos.length ? "none" : "block";
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  mensaje.textContent = "";

  let valido = true;
  const datos = {};

  campos.forEach((id) => {
    const input = document.getElementById(id);
    datos[id] = input.value.trim();
    const vacioCampo = datos[id] === "";
    input.classList.toggle("error", vacioCampo);
    if (vacioCampo) valido = false;
  });

  const genero = document.querySelector('input[name="genero"]:checked');
  if (!genero) valido = false;

  if (!valido) {
    mensaje.textContent = "Completa todos los campos y elige un género.";
    return;
  }

  if (!/^[0-9+\s-]{7,15}$/.test(datos.telefono)) {
    mensaje.textContent = "El teléfono debe tener entre 7 y 15 dígitos.";
    document.getElementById("telefono").classList.add("error");
    return;
  }

  datos.genero = genero.value;
  contactos.push(datos);
  formulario.reset();
  mostrarContactos();
});

mostrarContactos();
