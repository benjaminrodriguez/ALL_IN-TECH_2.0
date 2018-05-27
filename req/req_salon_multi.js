//=========================================================================
// Traitement de "req_salon_multi"
// Auteur :ALL IN'TECH 
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var compte;
	var page;
	var i;
	var trouve;
	var membre_connecte;
	var contenu_fichier;
	var liste_membres;
	var liste;
	var test;

	// RECUPERATION DU JSON "connecte.json"

	contenu_fichier = fs.readFileSync("./json/connecte.json", 'utf-8');
	liste_membres = JSON.parse(contenu_fichier);

	// PREMIER CAS : LE JOUEUR EST DANS LE JSON "connecte.json"
	test = false;
	for(i = 0; i < liste_membres.length; i++) {
		if(liste_membres[i].compte === query.compte) {
			test = true;
			liste_membres[i].connecte = true;
			liste_membres[i].libre = true;
			contenu_fichier = JSON.stringify(liste_membres);
			fs.writeFileSync("./json/connecte.json", contenu_fichier, 'utf-8');
		}
	}



	//SECOND CAS : LE JOUEUR N'EST PAS PRÉSENT DANS LE JSON "connecte.json" 
	

	if(test === false) {
		membre_connecte = {};
		membre_connecte.compte = query.compte;
		membre_connecte.connecte = true;
		membre_connecte.libre = true;
		membre_connecte.adversaire = false;
		liste_membres.push(membre_connecte);

		contenu_fichier = JSON.stringify(liste_membres);
		fs.writeFileSync("./json/connecte.json", contenu_fichier, 'utf-8');
	}


	contenu_fichier = fs.readFileSync("./json/connecte.json", 'utf-8');
	liste_membres = JSON.parse(contenu_fichier);

	liste= "";
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte !== query.compte && liste_membres[i].connecte === true && liste_membres[i].libre === true) {
			liste += "<form action = './req_reponse_defi' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type ='submit' name ='adversaire' value='"+ liste_membres[i].compte +"'></form>";
		}
	}

	
	// AFFICHAGE DE LA PAGE
	page = fs.readFileSync('./html/modele_salon_multi.html', 'UTF-8');

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.joueurs = liste;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;
