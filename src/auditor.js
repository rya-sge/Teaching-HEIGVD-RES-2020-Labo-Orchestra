/ Include Nodejs' net module.
const Net = require('net');
// The port on which the server is listening.
/*

TCP serveur sur l'auditeur
Renvoie la liste des musciciens
https://riptutorial.com/node-js/example/22405/a-simple-tcp-server
 */

const port = 2205;
/*class Musician{
    "uuid": string,
    "instrument":string,
    "activeSince": string
}*/
var musician = new Array();

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const auditor = new Net.Server();
// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
auditor.listen(port, function() {
    console.log('Server listening for connection requests on socket localhost:${port}.');
});

// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
auditor.on('connection', function(socket) {
    console.log('Une nouvelle connection a ét établie');

    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.
    socket.write('Hello, client.');
    socket.write(JSON.stringify(musician));
    // The server can also receive data from the client by reading from its socket.
   /* socket.on('data', function(chunk) {
        console.log(`Data received from client: ${chunk.toString()`.});
    });*/

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});
