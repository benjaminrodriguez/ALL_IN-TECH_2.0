//=========================================================================
// Traitement de "function_distribution_cartes"
// Auteur : ALL IN'TECH
// Version : 29/04/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require("fs"); 

// DEBUT DE LA FONCTION

var function_distribution_cartes = function (joueurs, riviere) {

	// VARIABLE  JSON
	//var contenuJoueur;
	var contenuCarte;
	//var contenuRiviere;
	// UTILE ?
	//var joueurs;
	var cartes;
	//var riviere;

	// VARIABLE
	var i;
	var x;
	var y;

	// LECTURE DU JSON

//	contenuJoueur = fs.readFileSync("./json/table1.json", "UTF-8");
//	joueurs = JSON.parse(contenuJoueur);

	contenuCarte = fs.readFileSync("./json/testcartes.json", "UTF-8");
	cartes = JSON.parse(contenuCarte);

//	contenuRiviere = fs.readFileSync("./json/riviere.json", "UTF-8");
//	riviere = JSON.parse(contenuRiviere);

	// DISTRIBUTION DES CARTES AUX JOUEURS

		x = 0;
	for(i = 0; i < joueurs.length ; i++){
		joueurs.main[0][i].push(cartes[x]);
		x++;
		joueurs.main.Carte2.push(cartes[x]);
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
