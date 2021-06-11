/*
https://nodejs.org/dist./v0.10.44/docs/api/dgram.html
*/
var mesInformations = {
    "uuid" : "aa7d8cb3-a15f-4f06-a0eb-b8feb6244a60",
    "instrument" : "piano",
    "activeSince" : "2016-04-27T05:20:50.731Z"
};
var dgram = require('dgram');
var message = new Buffer("Some bytes");
var client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 41234, "localhost", function(err, bytes) {
    client.close();
});
