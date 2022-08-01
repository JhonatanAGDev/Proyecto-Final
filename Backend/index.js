require('./src/config/conexionBD.js');


const express = require('express');
const port = (process.env.PORT || 3000);

const cors = require("cors");


//Express
const app = express();

//Config

app.set("port", port);

//Admitir datos

app.use(express.json());
app.use(cors());

//Rutas

app.use(require('./src/routes/rutas.js'));

//Iniciar express

app.listen(app.get('port'), (error) => {
    if(error) {
        console.log('Error al iniciar el servidor' + error);
    }else {
        console.log('Servidor iniciado en el puerto: ' + port);
    }
});

module.exports = app;