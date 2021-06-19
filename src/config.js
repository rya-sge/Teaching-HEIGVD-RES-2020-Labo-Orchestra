/*
Sources : https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
exports permet d'exporter les variables
 */


//Copier du code de validation

exports.instruments = new Map();
// définir les valeurs
var instruments = new Map();
instruments.set("piano", "ti-ta-ti");
instruments.set("trumpet", "pouet");
instruments.set("flute", "trulu");
instruments.set("violin", "gzi-gzi");
instruments.set("drum", "boum-boum");


exports.PORT_TCP = 2205;
exports.PORT_UDP = 9907; //slide 53 UDP

exports.TIME_END = 5; //secondes
exports.TIME_PLAY = 1000; //mili
exports.MULTICAST_ADDRESS="239.252.10.10";
