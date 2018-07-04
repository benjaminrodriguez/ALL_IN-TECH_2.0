//=========================================================================
// Traitement de "req_refuser_defi"
// Auteur : ALL IN'TECH
// Version : 10/06/2018
//=========================================================================
"use strict";

var fs = require("fs");
require ("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var contenu_fichier;
	var page;
	var membres;
	var i;
	var liste_membres;

 	contenu_fichier = fs.readFileSync("./json/connecte.json", 'UTF-8');
    liste_membres = JSON.parse(contenu_fichier);

	for (i = 0 ; i < liste_membres.length ; i++) {
		liste_membres[i].connecte = true;
	}
	
	contenu_fichier = JSON.stringify(liste_membres);
	fs.writeFileSync("./json/connecte.json", contenu_fichier, 'UTF-8');

	page = fs.readFileSync ("./html/modele_salon_multi.html" , "UTF-8");	
	
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
