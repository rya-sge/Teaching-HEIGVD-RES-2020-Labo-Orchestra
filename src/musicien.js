/*
https://www.npmjs.com/package/uuid

*/


var config = require('./config.js');
var dayjs = require('dayjs')
var uuid = require('uuid')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

//Class représentn les informations d'un muscien
class mesInformations {
    constructor(sound) {
        this.uuid = uuid.v4();
        this.sound = sound;
        this.activeSince = dayjs();
    }
}

//Fournir une implémentation des sockets UDP
//https://nodejs.org/api/dgram.html
//https://nodejs.org/dist./v0.10.44/docs/api/dgram.html
function play(mesInfos){
    const dgram = require('dgram');

    const server = dgram.createSocket("udp4");
    const playload = JSON.stringify(mesInfos);

//Peut-on le faier ???
    const message = Buffer.from(playload);

//Pas correct => envoyer en multicast
    server.send(message, 0, message.length, config.PORT_UDP, config.MULTICAST_ADDRESS, function(err, bytes) {
        if(err){
            console.log("Erreur ", err);
            server.close();
        }
        console.log(playload + server.address().port);
    });

}




if(config.instruments.get(process.argv[2]) === 'undefined'){
    console.log("Erreur pour l'instrument" + process.argv[2] )
}else{
    console.log("Le musicien commence à jouer...")
    console.log("Instrument : ", process.argv[2])
    const infos =  new mesInformations(config.instruments.get(process.argv[2]))
    setInterval(play, config.TIME_PLAY, infos);
}
