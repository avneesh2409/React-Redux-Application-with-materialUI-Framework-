var pg = require("pg");
var helper = require('./../helpers/helper');
var conString = helper.ConnectionString.server;
var client = new pg.Client(conString);
client.connect();
module.exports = client;

//-------------------Arham--------------------------------------------------//