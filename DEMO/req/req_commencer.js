//=========================================================================
// Traitement de "req_commencer"
// Auteur : ALL IN'TECH 
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;

    // AFFICHAGE DE LA PAGE D'ACCUEIL
    page = fs.readFileSync('./html/modele_accueil.html', 'utf-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.compte = "";
	marqueurs.adversaire = query.adversaires;
	marqueurs.table = query.table;
	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
