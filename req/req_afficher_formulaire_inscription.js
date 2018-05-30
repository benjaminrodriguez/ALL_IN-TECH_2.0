//=========================================================================
// Traitement de "req_afficher_formulaire_inscription"
// Auteur : ALL IN'TECH
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;

    // AFFICHAGE DE LA modele_formulaire_inscription
    page = fs.readFileSync('./html/modele_formulaire_inscription.html', 'UTF-8');

    marqueurs = {};
    marqueurs.erreur = "";
    marqueurs.compte = query.compte;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
