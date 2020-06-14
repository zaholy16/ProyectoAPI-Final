const artista = require("./vecArtista");

function Artista(nombre,edad,sexo,banda,genero)
{
    this.nombre = nombre;
    this.banda = banda;
    this.edad = edad;
    this.genero = genero;
    this.sexo = sexo;
}
module.exports = Artista;