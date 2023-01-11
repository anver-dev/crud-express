const btnBuscar = document.getElementById("buscar");
const btnEliminar = document.getElementById("eliminar");
const btnEditar = document.getElementById("editar");
const btnAlta = document.getElementById("alta");
const alerta = document.getElementById("alerta");
const btnEnviarFormularioEdicion = document.getElementById(
  "enviarFormularioEdicion"
);
const btnEnviarFormularioAlta = document.getElementById("enviarFormularioAlta");

const tarjetaResultado = document.getElementById("tarjetaResultado");
const formulario = document.getElementById("formulario");
let id = document.getElementById("idAccount");
const divResultado = document.getElementById("resultado");

btnBuscar.onclick = buscar;
btnEliminar.onclick = eliminar;
btnEditar.onclick = editar;
btnAlta.onclick = alta;
btnEnviarFormularioEdicion.onclick = enviarFormularioEdicion;
btnEnviarFormularioAlta.onclick = enviarFormularioAlta;

function enviarFormularioAlta() {
  const idFormulario = document.getElementById("idFormulario");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");
  if (
    idFormulario.value ||
    nombre.value ||
    correo.value ||
    telefono.value ||
    direccion.value
  ) {
    fetch(`http://localhost:3000/account/`, {
      method: "POST",
      body: JSON.stringify({
        _id: idFormulario.value,
        name: nombre.value,
        email: correo.value,
        phone: telefono.value,
        address: direccion.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("lo guarde");
      });
  }
}

function alta() {
  tarjetaResultado.hidden = true;
  formulario.hidden = false;
  btnEnviarFormularioAlta.hidden = false;
  btnEnviarFormularioEdicion.hidden = true;

  const idFormulario = document.getElementById("idFormulario");
  const spanIdFormulario = document.getElementById("spanIdFormulario");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");

  idFormulario.hidden = false;
  spanIdFormulario.hidden = false;

  idFormulario.value = "";
  nombre.value = "";
  correo.value = "";
  telefono.value = "";
  direccion.value = "";
}

function enviarFormularioEdicion() {
  const idAccountEncontrado = document.getElementById("idAccountEncontrado");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");

  fetch(`http://localhost:3000/account/${idAccountEncontrado.value}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: nombre.value,
      email: correo.value,
      phone: telefono.value,
      address: direccion.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("lo actualice");
    });
}

function editar() {
  console.log("entre a editar");
  formulario.hidden = false;
  btnEnviarFormularioEdicion.hidden = false;
  const idAccountEncontrado = document.getElementById("idAccountEncontrado");
  if (idAccountEncontrado) {
    const nameEncontrado = document.getElementById("nameEncontrado");
    const emailEncontrado = document.getElementById("emailEncontrado");
    const phoneEncontrado = document.getElementById("phoneEncontrado");
    const addressEncontrado = document.getElementById("addressEncontrado");

    const idFormulario = document.getElementById("idFormulario");
    const spanIdFormulario = document.getElementById("spanIdFormulario");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");

    idFormulario.hidden = true;
    spanIdFormulario.hidden = true;
    nombre.value = nameEncontrado.value;
    correo.value = emailEncontrado.value;
    telefono.value = phoneEncontrado.value;
    direccion.value = addressEncontrado.value;
  }
}

function eliminar() {
  console.log("entre a eliminar");
  const idAccountEncontrado = document.getElementById("idAccountEncontrado");

  if (idAccountEncontrado) {
    fetch(`http://localhost:3000/account/${idAccountEncontrado.value}`, {
      method: "DELETE",
    }).then((data) => {
      console.log("lo elimine");
      divResultado.innerHTML = ``;
      tarjetaResultado.hidden = true;
    });
  }
}

function buscar() {
  formulario.hidden = true;
  console.log("🚀 ~ file: crud.js:8 ~ buscarElemento ~ id", id.value);
  if (id.value) {
    fetch(`http://localhost:3000/account/${id.value}`)
      .then((response) => {
        console.log("🚀 ~ file: crud.js:151 ~ .then ~ response", response);
        let { status } = response;
        if (status == 404) {
          alerta.hidden = false;
        }
        return response.json();
      })
      .then((data) => {
        alerta.hidden = true;
        console.log("🚀 ~ file: crud.js:152 ~ .then ~ data", data);
        let { _id, name, email, phone, address } = data;
        console.log("🚀 ~ file: crud.js:67 ~ .then ~ address", address);
        console.log("🚀 ~ file: crud.js:67 ~ .then ~ phone", phone);

        tarjetaResultado.hidden = false;

        divResultado.innerHTML = `
                <input id="idAccountEncontrado" value=${_id} hidden>
                <input id="nameEncontrado" value=${name} hidden>
                <input id="emailEncontrado" value=${email} hidden>
                <input id="phoneEncontrado" type="text" value="${phone}" hidden>
                <input id="addressEncontrado" type="text" value="${address}" hidden>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">${name}</th>
                            <td>${email}</td>
                            <td>${phone}</td>
                            <td>${address}</td>
                        </tr>
                    </tbody>
                </table>
        `;
        console.log(data);
      });
  }
}
