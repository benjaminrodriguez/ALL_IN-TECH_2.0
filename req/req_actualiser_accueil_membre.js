//=========================================================================
// Traitement de "req_actualiser_accueil_membre"
// Auteur : ALL IN'TECH
// Version : 26/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var connecte;
	var partie_en_attente;
	var contenu_fichier;

// AFFICHAGE DES PARTIES EN ATTENTE
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
	connecte = JSON.parse (contenu_fichier);

	partie_en_attente = "";

	for (var i = 0 ; i < connecte.length ; i++) {
		if (connecte[i].table !== "" && connecte[i].compte !== query.compte) {
			partie_en_attente += "<form action = 'req_attendre_tour' method='GET'><input type='submit' name='compte' value='"+ connecte[i].compte +"'></form>";
		}			
	
	}

	
// AFFICHAGE DE LA PAGE D'ACCUEIL
    page = fs.readFileSync('html/modele_accueil_membre.html', 'utf-8');
	
	marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.partie_en_attente = partie_en_attente;
	marqueurs.table = query.table
    page = page.supplant(marqueurs);


    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
