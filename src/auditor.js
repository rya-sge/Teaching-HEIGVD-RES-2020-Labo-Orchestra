// Include Nodejs' net module.




/*class Musicians{
    "uuid": string,
    "instrument":string,
    "activeSince": string
}*/
var config = require('./config.js');
var moment = require('moment');
const dgram = require('dgram');
const Net = require('net');
const instruments = require('./config')

let musicians = new Map(); //Map(uuid)=datagram musicien
class Musicos {
    constructor(uuid, sound, activeSince, lastHeard) {
        this.uuid = uuid;
        this.sound = sound;
        this.activeSince = activeSince;
        this.lastHeard = lastHeard;
    }
}

function getKeyByValue(object, value) { //Utile pour aller chercher l'instrument joué par le son
    return Object.keys(obj)[Object.values(obj).indexOf(value)];
}

/* Multicast */

const s = dgram.createSocket('udp4');
s.bind(config.PORT_UDP, function(){
    console.log("Joining multicast group");
    s.addMembership(config.MULTICAST_ADDRESS)
});

s.on('message', function(msg,source){

    const json = JSON.parse(msg)
    const uuid = json.uuid;
    const sound = json.sound;


    if(musicians.has(uuid)==false) //Si la map ne contient pas d'entrées
    {
        const activeSince = moment().format();
        console.log("Musicians joined" + msg + ".Source IP : " + 		source.address + ". Source port : " + source.port)
        let m = new Musicos(uuid, sound, activeSince, moment().format()) //Création du nouveau musicien
        musicians.set(uuid,m); //On créé une nouvelle entrée dans la map
    }
    else
    {
        let m = musicians.get(uuid); //On récupère le musicien déjà existant
        m.lastHeard = moment().format(); //Mise à jour de la propriété lastHeard du musicien
        musicians.set(uuid,m); //Remplacement du musicien dans la map avec les nouvelles valeurs

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

    var musicos = []; //Création du JSON array qui contiendra les musiciens à envoyer
    for(const obj of musicians.values())
    {
        //La date actuelle
        var lastHeard = obj.lastHeard; //la dernière date au moment de l'envoi du musicien
        var difference = moment().diff(lastHeard); //La différence entre les deux en secondes
        if(difference > config.TIME_END ) //La différence en seconde est plus grande que 5
        {
            musicians.delete(obj.uuid); //On peut supprimer ce musicien de la map
            continue; //On poursuit l'exécution
        }
        var musician = { //Création du json du musicien
            "uuid" : obj.uuid,
            "instrument" : getKeyByValue(instruments,obj.sound),
            "activeSince" : obj.activeSince
        }
        musicos.push(musician);//Ajout du musicien dans le datagramme à envoyer
    }
    socket.write(JSON.stringify(musicos));//envoi du payload avec tous les musiciens
    socket.write("\n");
    // The server can also receive data from the client by reading from its socket.
    /* socket.on'data', function(chunk) {
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
    socket.end();
});

