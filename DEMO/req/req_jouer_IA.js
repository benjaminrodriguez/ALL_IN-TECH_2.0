//=========================================================================
// Traitement de "req_jouer_IA"
// Auteur :ALL IN'TECH
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;

    // AFFICHAGE DE LA PAGE MODELE IA
    page = fs.readFileSync('./html/modele_IA.html', 'utf-8');

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
