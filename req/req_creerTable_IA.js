//=========================================================================
// Traitement de "req_creerTable_IA"
// Auteur : ALL'INTECH 
// Version : 27/05/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;
    var partie;
    var contenuPartie;
    var joueurs;

	// CREATION DU JSON PARTIE IA
    joueurs = {};
    joueurs.pseudo = query.compte;
    contenuPartie = JSON.stringify(joueurs);
    fs.writeFileSync("./tables/" + query.compte +"_VS_IA.json", contenuPartie, "UTF-8");

    // AFFICHAGE DE LA PAGE D'IA
    page = fs.readFileSync('./html/modele_IA.html' , 'utf-8');

    marqueurs = {};
    marqueurs.compte = query.compte;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
