//=========================================================================
// Traitement de "req_deconnexion"
// Auteur : ALL IN'TECH 
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_fichier;
	var membre;
	var i;

	 // ON LIT LES COMPTES CONNECTES
	contenu_fichier = fs.readFileSync("./json/connecte.json", 'UTF-8');
	membre = JSON.parse(contenu_fichier);
	
	// ON DECONNECTE L'UTILISATEUR
	for (i = 0 ; i < membre.length ; i++) {
		if (membre[i].compte === query.compte) {
			membre[i].connecte = false;
		}
	}

	// ON ECRIT DANS CONNECTE.JSON
	contenu_fichier = JSON.stringify(membre);
	fs.writeFileSync("./json/connecte.json", contenu_fichier, 'UTF-8');

	// AFFICHAGE DE LA PAGE D'ACCUEIL
	page = fs.readFileSync('./html/modele_accueil.html', 'UTF-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaires;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;

