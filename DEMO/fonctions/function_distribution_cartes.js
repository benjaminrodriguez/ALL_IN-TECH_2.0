//=========================================================================
// Traitement de "function_distribution_cartes"
// Auteur : ALL IN'TECH
// Version : 29/04/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require("fs"); 

// DEBUT DE LA FONCTION

var function_distribution_cartes = function (main, riviere) {

	// VARIABLE  JSON

	var contenuCarte;
	var cartes;

	// VARIABLE
	var i;
	var x;
	var y;

	// LECTURE DU JSON

	contenuCarte = fs.readFileSync("./json/testcartes.json", "UTF-8");
	cartes = JSON.parse(contenuCarte);

	// DISTRIBUTION DES CARTES AUX JOUEURS

		x = 0;
	for(i = 0; i < 2; i++){
		main[i].push(cartes[x]);
		x++;
		main[i].push(cartes[x]);
		x++;
	}	

	// DISTRIBUTION DES CARTES A LA RIVIERE

		y = cartes.length-1;
	for(i = 0; i < 5; i++){
		riviere.push(cartes[y]);
		y--;
	}

// ECRITURE DES JSON

//	contenuJoueur = JSON.stringify(joueurs);
//	fs.writeFileSync("./json/table1.json", contenuJoueur, "UTF-8");

	contenuCarte = JSON.stringify(cartes);
	fs.writeFileSync("./json/testcartes.json", contenuCarte, "UTF-8");

//	contenuRiviere = JSON.stringify(riviere);
//	fs.writeFileSync("./json/riviere.json", contenuRiviere, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_distribution_cartes;
