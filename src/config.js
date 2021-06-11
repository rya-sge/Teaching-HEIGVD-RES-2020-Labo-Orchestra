/*
Sources : https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
exports permet d'exporter les variables
 */

exports.myMap = new Map();
// définir les valeurs
myMap.set("piano", "ti-ta-ti");
myMap.set("trumpet", "pouet");
myMap.set("flute", "trulu");
myMap.set("violin", "gzi-gzi");
myMap.set("drum", "boum-boum");


exports.PORT_TCP = 2205;
exports.PORT_UDP = 1200;

exports.TIME_END = 5; //secondes
exports.TIME_PLAY = 1; //Secondes
