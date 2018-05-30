//=========================================================================
// Traitement de "req_reponse_hote"
// Auteur :ALL IN'TECH 
<<<<<<< HEAD
// Version : 28/05/2018
//=========================================================================

"use strict";

var fs = require("fs");
var remedial = require("remedial");
=======
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118


var trait = function (req, res, query) {

	var contenu_fichier;
<<<<<<< HEAD
	var membres;
	var compte;
	var adversaire_trouve;
	var adversaire;
	var joueurs;
	var i;
	var a; 
	var b;
=======
	var liste_membres;
	var compte;
	var adversaire_trouve;
	var adversaire;
	var balise;
	var i;
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	var marqueurs;
	var page;


<<<<<<< HEAD
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
=======
	// LECTURE DU JSON "connecte.json"
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	liste_membres = JSON.parse(contenu_fichier);

	adversaire_trouve = false;
	for (i = 0 ; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
			compte = liste_membres[i].compte;
			if (liste_membres[i].connecte === "attente") {
				adversaire_trouve = true;
				adversaire = liste_membres[i].adversaire;
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
			}
		}
	}

<<<<<<< HEAD
	// ENVOI VERS LES DIFFERENTES PAS HTML EN FONCTION DU STATUT
=======

	// REDIRECTION VERS PAGE HTML SI JOUEUR DÉFIÉ
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	if (adversaire_trouve === false) {
		page = fs.readFileSync ("./html/modele_salon_multi.html","UTF-8");
	} else if (adversaire_trouve === true) {
		page = fs.readFileSync ("./html/modele_reponse_defi.html", "UTF-8");
	} else {
		page = fs.readFileSync ("./html/modele_accueil_membre.html" , "UTF-8");
	}

<<<<<<< HEAD
	// CREATION DU MARQUEUR JOUEURS POUR AFFICHAGE DANS SALON MULTI
	joueurs = "";
	for (i = 0; i < membres.length; i++) {
		// SI LE JOUEUR EST CONNECTE ET ATTEND UN ADVERSAIRE DANS LE SALON MULTI
		if (membres[i].compte !== query.compte && membres[i].connecte === true && membres[i].libre === true) {
			// ON PEUT LE PASSER EN <a href == ?
			joueurs = joueurs + "<form action = '/req_defier' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type='submit' name='adversaire' value='"+ membres[i].compte +"'></form>";
=======

	balise = "";
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte !== query.compte && liste_membres[i].connecte === true && liste_membres[i].libre === true) {
			balise += "<form action = './req_reponse_defi' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type='submit' name='adversaire' value='"+ liste_membres[i].compte +"'></form>";
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
		}
	}

	// MARQUEURS
	marqueurs = {};
<<<<<<< HEAD
	marqueurs.joueurs = joueurs;
=======
	marqueurs.joueurs = balise;
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	marqueurs.compte = query.compte;
	marqueurs.adversaire = adversaire;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(page);
	res.end();

};
//==================================================

module.exports = trait;
