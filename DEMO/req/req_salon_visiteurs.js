//=========================================================================
// Traitement de "req_visiteurs"
// Auteur : ALL IN'TECH
// Version : 22/06/2018
//=========================================================================
"use strict";
var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {
/*
	var marqueurs;
	var compte;
	var page;
	var i;
	var trouve;
	var membre_connecte;
	var contenu_fichier;
	var liste_membres;
	var joueurs;
	var test;

	contenu_fichier = fs.readFileSync("./json/connecte.json", 'UTF-8');
	liste_membres = JSON.parse(contenu_fichier);

	// JOUEUR PRESENT DANS CONNECTE.JSON
	test = false;
	for (i = 0 ; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			test = true;
			liste_membres[i].connecte = true;
			liste_membres[i].libre = true;
			contenu_fichier = JSON.stringify(liste_membres);
			fs.writeFileSync("./json/connecte.json", contenu_fichier, 'UTF-8');
		}
	}

	//JOUEUR ABSENT DANS CONNECTE.JSON
	if(test === false) {
		membre_connecte = {};
		membre_connecte.compte = query.compte;
		membre_connecte.connecte = true;
		membre_connecte.libre = true;
		membre_connecte.adversaire = false;
		liste_membres.push(membre_connecte);

		// ON ECRIT LE NOUVEAU STATUT DU JOUEUR DANS CONNECTE.JSON
		contenu_fichier = JSON.stringify(liste_membres);
		fs.writeFileSync("./json/connecte.json", contenu_fichier, 'UTF-8');
	}
	// UTILE ? ON A DEJA LU PLUS HAUT !
	contenu_fichier = fs.readFileSync("./json/connecte.json", 'UTF-8');
	liste_membres = JSON.parse(contenu_fichier);

	// CREATION DU MARQUEUR JOUEUR
	joueurs = "";
	for (i = 0; i < liste_membres.length ; i++) {
		// SI LE JOUEUR EST CONNECTE ET DISPONIBLE IL EST AJOUTE DANS LA VAR JOUEUR
		if (liste_membres[i].compte !== query.compte && liste_membres[i].connecte === true && liste_membres[i].libre === true) {
			visiteurs += "<form action = '/req_req_salon_visiteurs' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type ='submit' name ='adversaire' value='"+ liste_membres[i].compte +"'></form>";
		}
	}
*/
	// AFFICHAGE DE LA PAGE SALON MULTI
	page = fs.readFileSync('html/modele_visiteur.html', 'utf-8');

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.visieurs = visiteurs;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;
