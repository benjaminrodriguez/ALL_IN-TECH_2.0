//=========================================================================
// Traitement de "req_modele_table_rejointe"
// Auteur : ALL IN'TECH 
// Version : 23/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var contenu;
	var joueurs;
	var connecte;
	var table;
	var adversaire;
	var nouvellePartie;
	var i;

// ON LIT LE FICHIER DES JOUEURS CONNECTÉS
	contenu = fs.readFileSync("./json/connecte.json", "UTF-8");
	joueurs = JSON.parse(contenu);

/*
	
// ON REGARDE SI L'ADMIN A LANCÉ LA PARTIE
	connecte = {};
		
	for (i = 0; i < connecte.length; i++) {
		if (connecte[i].table === "") {
			page = fs.readFileSync ('./html/modele_page_adversaire.html');
		} else {
			page = fs.readFileSync ('./html/modele_table_rejointe.html');
		}
	}

*/
	contenu = fs.readFileSync ("./tables/a.json" , "utf-8");
	table = JSON.parse(contenu);
	 

	



// AFFICHAGE DE LA PAGE D'ACCUEIL
    page = fs.readFileSync('./html/modele_page_adversaire.html', 'utf-8');

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.table = query.table;
	marqueurs.adversaire = adversaire;
	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
