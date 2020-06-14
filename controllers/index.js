const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const Estructura = require("../models/estructura");
const Artista = require("../models/artista");
var miInfo = new Estructura();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
  });

app.listen(3000,() =>{
    console.log("Puerto 3000 funcionando!!!")
});

app.get("/artista/", cors(), (req,res) => {
    respuesta = {
        miInfo
    }
    res.send(respuesta);
});

app.post("/artista/", cors(), (req,res) => {
    if(!req.body.Nombre || !req.body.Edad ||!req.body.Sexo ||!req.body.Banda || !req.body.Genero)
    {
        respuesta = {
            Tipo: "ERROR",
            Estatus: 404,
            Mensaje: "Faltan Datos :C",
        }
        res.send(respuesta);
    }
    else if(req.body.Nombre)
    {
        let nombre = (req.body.Nombre);
        let busca=-1;
        var i=0;

        while(i<miInfo.miInfo.length)
        {
            if(nombre===miInfo.miInfo[i].nombre)
            busca=i;
            i++;
        }
        
        if(busca!=-1)
        {
            respuesta = {
                Tipo: "EROR",
                Estatus: 404,
                Mensaje: "Ya existe un registro con ese nombre :C",
            }
            res.send(respuesta);
        }
        else
        {
            let artista = new Artista(req.body.Nombre,req.body.Edad,req.body.Sexo,req.body.Banda,req.body.Genero);
            miInfo.agregar(artista);
            respuesta = {
                Mensaje: "Artista agregado correctamente :D",
            }
            res.send(respuesta);
        }
    }
});

app.put("/artista/", cors(), (req,res) => {
    if(req.body.Nombre)
    {
        let nombre = (req.body.Nombre);
        let busca=-1;
        var i=0;

        while(i<miInfo.miInfo.length)
        {
            if(nombre===miInfo.miInfo[i].nombre)
            busca=i;
            i++;
        }
        
        if(busca==-1)
        {
            respuesta = {
                Tipo: "ERROR",
                Estatus: 404,
                Mensaje: "No se ha modificado nada",
            }
            res.send(respuesta);
        }
        else
        {
            miInfo.miInfo[busca] = req.body;
            respuesta = {
                Mensaje: "Artista modificado correctamente :D",
            }
            res.send(respuesta);
        }
    }
});

app.delete("/artista/", cors(), (req,res) => {
    if(!req.body.Nombre)
    {
        respuesta = {
            Tipo: "ERROR",
            Estatus: 404,
            Mensaje: "El nombre es requerido",
        }
        res.send(respuesta);
    }
    else
    {
        let nombre = (req.body.Nombre);
        let busca=-1;
        var i=0;

        while(i<miInfo.miInfo.length)
        {
            if(miInfo.miInfo[i].nombre===nombre)
            busca=i;
            i++;
        }
        
        if(busca==-1)
        {
            respuesta = {
                Tipo: "ERROR",
                Estatus: 404,
                Mensaje: "No hay un artista con ese nombre",
            }
            res.send(respuesta);
        }
        else
        {
            miInfo.miInfo.splice(busca, 1);
            respuesta = {
                Mensaje: "Artista eliminado correctamente :D",
            }
            res.send(respuesta);
        }
    }
});