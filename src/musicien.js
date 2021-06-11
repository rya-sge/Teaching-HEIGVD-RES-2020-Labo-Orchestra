/*
https://www.npmjs.com/package/uuid

*/
import { v4 as uuidv4 } from 'uuid';

var config = require('./config.js');


var mesInformations = {
    "uuid" : uuidv4(),
    "sound" : config.myMap.get("piano"),
    "activeSince" : "2016-04-27T05:20:50.731Z"
};

//Fournir une implémentation des sockets UDP
//https://nodejs.org/api/dgram.html
//https://nodejs.org/dist./v0.10.44/docs/api/dgram.html
const dgram = require('dgram');

const server = dgram.createSocket("udp4");
const playload = JSON.stringify(mesInformations);

//Peut-on le faier ???
const message = new Buffer(playload);

//Pas correct => envoyer en multicast
server.send(message, config.PORT_UDP,test);
/*server.send(message, 0, message.length, 41234, "localhost", function(err, bytes) {
    server.close();
});*/



console.log("Le musicien comment à jouer...")
