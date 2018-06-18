"use strict";

var fs = require ("fs");

var cartes = {};

var contenu;
var main;
var river;

contenu = fs.readFileSync("cartes.json", "utf8");
cartes = JSON.parses(contenu);

var tri_cartes = function (cartes) {
	
};
