
var express = require('express');
var morgan = require('morgan');
//var bodyParser		= require('body-parser');
//var methodOverride	= require('method-override');
var app = express();
var nconf = require('nconf');

// Configuracion

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    // Localizacion de los ficheros estaticos
    app.use(express.static(__dirname + '/app'));
    // Muestra un log de todos los request en la consola		
    app.use(morgan('dev'));
    // Simula DELETE y PUT						
    //app.use(methodOverride()) ;	
}

/*nconf.argv()
 .env()
 .file({ file: './config.json' });*/

// Escucha en el puerto 8017 y corre el server
app.listen(8017, function () {
    console.log('App escuchando en el puerto 8017');
});


app.get('/', function (req, res) {
    res.sendFile('/app/index.html');
});
