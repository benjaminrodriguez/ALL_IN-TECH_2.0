//=========================================================================
// Traitement de "req_attendre_tour"
// Auteur : ALL IN'TECH
// Version : 26/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var i;
	var contenu_fichier;
	var tour;
	var table;

/*
	// REDIRECTION DEPUIS LA PAGE ADVERSAIRE
	i = 0;
	if (query.table+".tour" === i) {
		for (i = 0 ; i < query.table.length ; i++) {
			page = fs.readFileSync('./html/modele_page_joueur.html' , 'utf-8');
				// ECRITURE JSON
		contenu_fichier = JSON.stringify(tour);
		fs.writeFileSync ("./json/"+query.table+".json" , contenu_fichier , "utf-8");
	} else if (query.table+".tour" !== i) {
		page = fs.readFileSync ('./html/modele_page_adversaire.html' , "utf-8");
	} else if (// DIRIGE VERS PAGE RESULTAT) {
	}
	
*/	
	
	// AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('./html/modele_page_adversaire.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.compte = "";
	marqueurs.table = query.table;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
