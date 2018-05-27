//=========================================================================
// Traitement de "req_modele_page_joueur"
// Auteur :ALL IN'TECH 
// Version : 25/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var joueurs;
	var contenuPartie;
	var contenu_fichier;
	var connecte;
	var debut;
	var mains;
	var river;

// LECTURE DES MODULES

	var distribuer = require("./fonctions/function_distribution_cartes.js");

// PARTIE DEBUTE -> ECRITURE DANS JSON
	contenu_fichier = fs.readFileSync ('./json/connecte.json' , 'utf-8');
    connecte = JSON.parse(contenu_fichier);


	for (var i = 0 ; i < connecte.length ; i++) {
		if (query.compte === connecte[i].compte) {
			connecte[i].table = query.table;
		}
	}

    contenu_fichier = JSON.stringify (connecte);
    fs.writeFileSync ('./json/connecte.json' , contenu_fichier , 'utf-8');



	// DISTRIBUTION DES CARTES
	
    
    contenuPartie = fs.readFileSync("./tables/"+query.compte+".json", contenuPartie, "UTF-8");
	partie = JSON.parse(contenuPartie);

	mains = partie.main;
	river = partie.river;

	distribuer(mains, river);

	contenuPartie = JSON.stringify(joueurs);
	fs.writeFileSync("./tables/"+query.compte+".json", contenuPartie, "UTF-8");
	
	
	// AFFICHAGE DE L'HTML

    marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.table = query.table;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();




};
//--------------------------------------------------------------------------

module.exports = trait;

