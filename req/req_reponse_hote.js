//=========================================================================
// Traitement de "req_reponse_hote"
// Auteur :ALL IN'TECH 
// Version : 28/05/2018
//=========================================================================

"use strict";

var fs = require("fs");
var remedial = require("remedial");


var trait = function (req, res, query) {

	var contenu_fichier;
	var membres;
	var compte;
	var adversaire_trouve;
	var adversaire;
	var joueurs;
	var i;
	var a; 
	var b;
	var marqueurs;
	var page;


	// LECTURE DU JSON CONNECTE.JSON
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	membres = JSON.parse(contenu_fichier);
	

	// ON DONNE LA DISPONIBILITE DE CHAQUE JOUEURS
	adversaire_trouve = false;
	for (i = 0 ; i < membres.length; i++) {
		if (membres[i].compte === query.compte) {
			a=i;
			compte = membres[a].compte;
			if (membres[a].connecte === "attente") {
				adversaire = membres[a].adversaire;
				adversaire_trouve = true;
			}
		}
	}

	// ENVOI VERS LES DIFFERENTES PAS HTML EN FONCTION DU STATUT
	if (adversaire_trouve === false) {
		page = fs.readFileSync ("./html/modele_salon_multi.html","UTF-8");
	} else if (adversaire_trouve === true) {
		page = fs.readFileSync ("./html/modele_reponse_defi.html", "UTF-8");
	} else {
		console.log("ERREUR");
	     page = fs.readFileSync ("./html/modele_error.html" , "UTF-8");
	}

	// CREATION DU MARQUEUR JOUEURS POUR AFFICHAGE DANS SALON MULTI
	joueurs = "";
	for (i = 0; i < membres.length; i++) {
		// SI LE JOUEUR EST CONNECTE ET ATTEND UN ADVERSAIRE DANS LE SALON MULTI
		if (membres[i].compte !== query.compte && membres[i].connecte === true && membres[i].libre === true) {
			// ON PEUT LE PASSER EN <a href == ?
			joueurs = joueurs + "<form action = '/req_defier' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type='submit' name='adversaire' value='"+ membres[i].compte +"'></form>";
		}
	}

	// MARQUEURS
	marqueurs = {};
	marqueurs.joueurs = joueurs;
	marqueurs.compte = query.compte;
	marqueurs.adversaire = adversaire;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};
//==================================================

module.exports = trait;
