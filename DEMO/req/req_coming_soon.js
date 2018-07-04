//=========================================================================
// Traitement de "req_coming_soon"
// Auteur : ALL IN'TECH
// Version : 24/06/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;

	// AFFICHAGE DES REGLES DU JEU
	page = fs.readFileSync('./html/modele_coming_soon.html', 'utf-8');
	
	marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
    page = page.supplant(marqueurs);


    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
