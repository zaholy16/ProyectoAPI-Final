const btnRecupera = document.getElementById("btnRecuperar");
btnRecupera.addEventListener("click",(e)=>{

  var solicitud = new XMLHttpRequest();
  solicitud.open('GET', 'http://localhost:3000/artista/', true);
  solicitud.onload = function()
  {
    var resultado = document.getElementById("details");
    let datos = JSON.parse(this.response);
    if(solicitud.status >= 200 && solicitud.status < 400)
    {
        resultado.innerHTML =  ` 
        <div class="card text-white bg-primary mb-7">
        <div class="card-header"><b>Agregados</b></div>
        <div class="card-body">
          <p class="card-text"><p>${this.response}</p></p>
        </div> `
    }
    else
    {
        console.log("ERROR");
        resultado.innerHTML += "ERROR EN LA LLAMADA A LA API";
    }
  }
  solicitud.send();
});

const btnAgrega = document.getElementById("btnAgregar");
btnAgrega.addEventListener("click",(e) =>{

  let nombre = document.getElementById("nombre").value;
  let edad = parseInt(document.getElementById("edad").value);
  let sexo = document.getElementById("sexo").value;
  let banda = document.getElementById("banda").value;
  let genero = document.getElementById("genero").value;

  var xhttR = new XMLHttpRequest();
  xhttR.open('POST', 'http://localhost:3000/artista/', true);
  xhttR.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

  xhttR.onreadystatechange = function()
  {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200)
    {
      var Detalles = document.getElementById("details");
      Detalles.innerHTML =  ` 
      <div class="card text-white bg-success mb-7">
        <div class="card-body">
         <h5 class="card-title"><b>Agregados</b></h5>
          <p class="card-text"><p>${this.response}</p></p>
        </div>
      </div>`;
    }
  }

  xhttR.send("Nombre="+nombre+ "&Edad="+edad + "&Sexo="+sexo + "&Banda=" + banda + "&Genero="+genero);
});

const btnModifica = document.getElementById("btnModificar");
btnModifica.addEventListener("click",(e)=>{

  let nombre = document.getElementById("nombre").value;
  let edad = parseInt(document.getElementById("edad").value);
  let sexo = document.getElementById("sexo").value;
  let banda = document.getElementById("banda").value;
  let genero = document.getElementById("genero").value;

  var xhttRA = new XMLHttpRequest();
  xhttRA.open('PUT', 'http://localhost:3000/artista/', true);
  xhttRA.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

  xhttRA.onreadystatechange = function()
  {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200)
    {
      var Detalles = document.getElementById("details");
      Detalles.innerHTML =  ` 
      <div class="card text-white bg-dark mb-7">
        <div class="card-body">
         <h5 class="card-title"><b>Modificado</b></h5>
          <p class="card-text"><p>${this.response}</p></p>
        </div>
      </div>`;
    }
  }

  xhttRA.send("Nombre="+nombre+ "&Edad="+edad + "&Sexo="+sexo + "&Banda=" + banda + "&Genero="+genero);

});

const btnElimina = document.getElementById("btnEliminar");
btnElimina.addEventListener("click",(e)=>{

  var nombre = document.getElementById("nombre").value;
  var xhttRE = new XMLHttpRequest();
  xhttRE.open('DELETE', 'http://localhost:3000/artista/', true);
  xhttRE.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

  xhttRE.onreadystatechange = function()
  {
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200)
    {
      var Detalles = document.getElementById("details");
      Detalles.innerHTML =  ` 
      <div class="card text-white bg-danger mb-7">
        <div class="card-body">
         <h5 class="card-title"><b>Eliminado</b></h5>
          <p class="card-text"><p>${this.response}</p></p>
        </div>
      </div>`;
    }
  }

  xhttRE.send("Nombre="+nombre);

});