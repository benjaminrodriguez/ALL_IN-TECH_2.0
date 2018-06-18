//=========================================================================
// Traitement de "function_melange_carte"
// Auteur : ALL IN'TECH
// Version : 29/04/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require("fs"); 

// DEBUT DE LA FONCTION

var function_melange_cartes = function () {

// VARIABLES

	var cartes;
	var contenuCarte;
	var i;
	var tmp;
	var nb1;
	var nb2;

// LECTURE DU JSON

	contenuCarte = fs.readFileSync("./json/testcartes.json", "UTF-8");
	cartes = JSON.parse(contenuCarte);

// MELANGE

	tmp = 0;

	for (i = 0; i < 52; i++) {
		nb1 = Math.floor(Math.random() * 52) + 0;
		nb2 = Math.floor(Math.random() * 52) + 0;

		tmp = cartes[nb1];
		cartes[nb1] = cartes[nb2];
		cartes[nb2] = tmp;
	}

// ECRITURE DU JSON

	contenuCarte = JSON.stringify(cartes);
	fs.writeFileSync("./json/testcartes.json", contenuCarte, "UTF-8");
};
//--------------------------------------------------------------------------

module.exports = function_melange_cartes;
