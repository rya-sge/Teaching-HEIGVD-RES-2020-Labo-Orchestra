/*
https://www.npmjs.com/package/uuid

*/
import { v4 as uuidv4 } from 'uuid';

var config = require('./config.js');
var dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()

//Class représentn les informations d'un muscien
class mesInformations {
    constructor(sound) {
        this.uuid = uuidv4();
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
    const message = new Buffer(playload);

//Pas correct => envoyer en multicast
    server.send(message, config.PORT_UDP,test);
    server.send(message, 0, message.length, config.PORT_UDP,config, config.MULTICAST_ADDRESS, function(err, bytes) {
        console.log("Erreur : " + playload + server.address().port);
        server.close();
    });

}



console.log("Le musicien comment à jouer...")
if(config.instruments.get(process.argv[2]) == 'undefined'){
    console.log("Erreur" + process.argv[2] )
}else{
    console.log(process.argv[2])
    const mesInformations =  new mesInformations(config.instruments.get(process.argv[2]))
    setInterval(play(mesInformations), config.TIME_PLAY);
}
