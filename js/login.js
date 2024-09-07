const URL_API = "https://tpo-nodejs-bb.vercel.app/clientes/login"; // "https://tpo-nodejs-bb.vercel.app/clientes/login"; http://localhost:3030/clientes/login
// LOGIN CLIENTES
async function login() {
  var data = {
    EMAIL: document.getElementById("EMAIL").value,
    PASSWORD: document.getElementById("PASSWORD").value,
  };
  var url = URL_API;
  axios
    .post(
      url,
      data,
      {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://tpo-nodejs-bb.vercel.app",
      },
      { withCredentials: true }
    )
    .then((res) => {
      const ress = res.data.message;
      let mensajesdeRes = "<ul>";
      ress.forEach((ressi) => (mensajesdeRes += "<li>" + ressi.msg + "</li>"));
      mensajesdeRes += "</ul>";
      document.querySelector("#txtmsg").innerHTML = mensajesdeRes;
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        const errores = error.response.data.message;
        let mensajesdeError = "<ul>";
        errores.forEach(
          (error) => (mensajesdeError += "<li>" + error.msg + "</li>")
        );
        mensajesdeError += "</ul>";
        document.querySelector("#txtmsg").innerHTML = mensajesdeError;
      } else {
        document.querySelector("#txtmsg").innerHTML =
          "<p>" + error.message + "</p>";
      }
    });
}
