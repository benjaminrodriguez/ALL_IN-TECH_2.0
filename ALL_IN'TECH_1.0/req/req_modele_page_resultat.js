//=========================================================================
// Traitement de "req_modele_page_resultat"
// Auteur : ALL IN'TECH 
// Version : 25/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('./html/modele_page_resultat.html', 'utf-8');

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
