// Include Nodejs' net module.




/*class Musician{
    "uuid": string,
    "instrument":string,
    "activeSince": string
}*/
var config = require('./config.js');
let musician = new Map(); //Map(uuid)=datagram musicien
var moment = require('moment');

/* Multicast */
const dgram = require('dgram');
const s = dgram.createSocket('udp4');
s.bind(config.PORT_UDP, function(){
    console.log("Joining multicast group");
    s.addMembership(config.MULTICAST_ADDRESS)
});

s.on('message', function(msg,source){
    console.log("Musician joined" + msg + ".Source IP : " + source.address + ". Source port : " + source.port)
    const json = JSON.parse(msg)
    const uuid = json.uuid;
    if(musician.has(uuid)===false)
    {
        musician.set(uuid,msg); //On créé une nouvelle entrée
    }
    else
    {
        musician.get(uuid).push(msg); //On écrit par-dessus la valeur déjà existante
    }
});


/*
TP serveur sur l'auditeur
Renvoie la liste des musciciens
https://riptutorial.com/node-js/example/22405/a-simple-tcp-server
 */
const Net = require('net');


//Créer un nouveau serveur tcp
tcp_server = new Net.Server();


//En attente de connexion
tcp_server.listen(config.PORT_TCP, function() {
    console.log('Server listening for connection requests on socket localhost:${port}.');
});

//A chaque requête de connexion de la part d'un client, le serveur créer un nouveau socket dédié au client
tcp_server.on('connection', function(socket) {
    console.log('Une nouvelle connection a ét établie');


    //Envoie des données en écrivant dans le socket
    socket.write('Hello, client.');
    var clientRequest = {}; //Création du JSON array qui contiendra les musiciens à envoyer
    for(let value of musician.values())
    {
        var difference = moment().format().diff(value.activeSince,'seconds'); //La différence entre les deux en secondes
        if(difference>5) //La différence en seconde est plus grande que 5
        {
            musician.delete(value.uuid); //On peut supprimer ce musicien de la map
        }
        else {
            clientRequest.push(value);//Ajout du musicien dans le datagramme à envoyer
        }
    }
    socket.write(JSON.stringify(clientRequest));
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

