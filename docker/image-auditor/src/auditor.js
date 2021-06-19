// Include Nodejs' net module.




/*class Musician{
    "uuid": string,
    "instrument":string,
    "activeSince": string
}*/
var config = require('./config.js');
var moment = require('moment');
const dgram = require('dgram');
const Net = require('net');
let musician = new Map(); //Map(uuid)=datagram musicien


/* Multicast */

const s = dgram.createSocket('udp4');
s.bind(config.PORT_UDP, function(){
    console.log("Joining multicast group");
    s.addMembership(config.MULTICAST_ADDRESS)
});

s.on('message', function(msg,source){
    
    const json = JSON.parse(msg)
    const uuid = json.uuid;
    if(musician.has(uuid)==false)
    {
    console.log("Musician joined" + msg + ".Source IP : " + 		source.address + ". Source port : " + source.port)
        musician.set(uuid,msg); //On créé une nouvelle entrée
    }
    else
    {
        musician.set(uuid,msg); //On écrit par-dessus la valeur déjà existante
    }
});




/*
TP serveur sur l'auditeur
Renvoie la liste des musciciens
https://riptutorial.com/node-js/example/22405/a-simple-tcp-server
 */



//Créer un nouveau serveur tcp
tcp_server = new Net.Server();


//En attente de connexion
tcp_server.listen(config.PORT_TCP, function() {
    console.log('Server listening for connection requests on socket localhost:${port}.');
});

//A chaque requête de connexion de la part d'un client, le serveur créer un nouveau socket dédié au client
tcp_server.on('connection', function(socket) {
    //Envoie des données en écrivant dans le socket
    
    var clientRequest = []; //Création du JSON array qui contiendra les musiciens à envoyer
    for(const value of musician.values())
    {
        //La date actuelle
        var lastEmitted = value.activeSince; //la dernière date au moment de l'envoi du musicien
        var difference = moment().diff(lastEmitted); //La différence entre les deux en secondes
        if(difference > config.TIME_END ) //La différence en seconde est plus grande que 5
        {
            musician.delete(value.uuid); //On peut supprimer ce musicien de la map
            continue; //On poursuit l'exécution
        }
        clientRequest.push(value);//Ajout du musicien dans le datagramme à envoyer
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

