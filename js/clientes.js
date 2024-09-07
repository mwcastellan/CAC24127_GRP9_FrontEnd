const URL_API = "http://localhost:3030/clientes"; // "https://tpo-nodejs-bb.vercel.app/clientes";
// ALTA CLIENTES
async function save() {
  var data = {
    EMAIL: document.getElementById("EMAIL").value,
    APELLIDO: document.getElementById("APELLIDO").value,
    NOMBRE: document.getElementById("NOMBRE").value,
    DIRECCION: document.getElementById("DIRECCION").value,
    PASSWORD: document.getElementById("PASSWORD").value,
  };
  var url = URL_API + "/";
  axios
    .post(url, data)
    .then((respuesta) => {
      document.querySelector("#txtmsg").innerHTML = "<p>Cliente agregado</p>";
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.message);
        const errores = error.response.data.message;
        let mensajesdeError = "<ul>";
        errores.forEach(
          (error) => (mensajesdeError += "<li>" + error.msg + "</li>")
        );
        mensajesdeError += "</ul>";
        document.querySelector("#txtmsg").innerHTML = mensajesdeError;
      } else {
        console.log(`Error en la solicitud "${error.message}`);
      }
    });
}
