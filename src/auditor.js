// Include Nodejs' net module.




/*class Musician{
    "uuid": string,
    "instrument":string,
    "activeSince": string
}*/
var config = require('./config.js');
var musician = new Array();







/*
TP serveur sur l'auditeur
Renvoie la liste des musciciens
https://riptutorial.com/node-js/example/22405/a-simple-tcp-server
 */
const Net = require('net');

//Créer un nouveau serveur tcp
exports.tcp_server = new Net.Server();


//En attente de connexion
tcp_server.listen(config.PORT_TCP, function() {
    console.log('Server listening for connection requests on socket localhost:${port}.');
});

//A chaque requête de connexion de la part d'un client, le serveur créer un nouveau socket dédié au client
tcp_server.on('connection', function(socket) {
    console.log('Une nouvelle connection a ét établie');


    //Envoie des données en écrivant dans le socket
    socket.write('Hello, client.');
    socket.write(JSON.stringify(musician));
    // The server can also receive data from the client by reading from its socket.
    /* socket.on('data', function(chunk) {
         console.log(`Data received from client: ${chunk.toString()`.});
     });*/


    //Le client demande à mettre fin à la connexion.
    //le serveur met alors fin à la connexion
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    //On catch les erreurs
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
