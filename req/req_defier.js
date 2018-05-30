//=========================================================================
// Traitement de "req_defier"
// Auteur : ALL IN'TECH
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
require ("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var contenu_fichier;
	var page;
	var membres;
	var a;
	var b;
	
	// LECTURE JSON
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
    membres = JSON.parse(contenu_fichier);

	for (a = 0 ; a < membres.length ; a++) {
		if (membres[a].compte === query.compte) {
			membres[a].connecte = "attente";
			membres[a].adversaire = query.adversaire;
			membres[a].table = query.compte;
		}
	}
	for (b = 0 ; b < membres.length ; b++) {
		if (membres[b].compte === query.adversaire) {
			membres[b].connecte = "attente";
			membres[b].adversaire = query.compte;
			membres[b].table = query.compte;
		}
	}
	
	contenu_fichier = JSON.stringify(membres);
	fs.writeFileSync("./json/connecte.json", contenu_fichier, 'UTF-8');

	page = fs.readFileSync ("./html/modele_attendre_reponse.html" , "UTF-8");	
	
	// MARQUEURS
	marqueurs = {};
	marqueurs.adversaire = query.adversaire;
	marqueurs.compte = query.compte;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//-------------------------------------------------------------------------//

module.exports = trait;
