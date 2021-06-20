/*
Musicien
 */

// Module à imporer
var config = require('./config.js');
var uuid = require('uuid') // https://www.npmjs.com/package/uuid
var moment = require('moment');

//Class représentn les informations du muscien
class mesInformations {
    constructor(sound, instrument) {
        this.uuid = uuid.v4();
        this.instrument = instrument;
        this.sound = sound;
    }
}

//Sources utilisées pour l'implémentation des sockets UDP
//https://nodejs.org/api/dgram.html
//https://nodejs.org/dist./v0.10.44/docs/api/dgram.html
function play(mesInfos){
    const dgram = require('dgram');

    const server = dgram.createSocket("udp4");

    //Création du message
    const playload = JSON.stringify(mesInfos);
    const message = Buffer.from(playload);

    server.send(message, 0, message.length, config.PORT_UDP, config.MULTICAST_ADDRESS, function(err, bytes) {
        if(err){
            console.log("Erreur ", err);
            server.close();
        }
        console.log(playload + server.address().port);
    });

}

/*
Au démarre, le proramme récupére l'instrument
Puis en fonction de l'interval défini dans config, le musicien va émettre un datagramme UDP.
 */
if(config.instruments.get(process.argv[2]) === 'undefined'){
    console.log("Erreur pour l'instrument" + process.argv[2] )
}else{
    console.log("Le musicien commence à jouer...");
    console.log("Instrument : "+ process.argv[2]);
    console.log(config.instruments.get(process.argv[2]));

    const infos =  new mesInformations( config.instruments.get(process.argv[2]), process.argv[2]);
    console.log("Son émis :" + infos.sound);
    setInterval(play, config.TIME_PLAY, infos);
}
