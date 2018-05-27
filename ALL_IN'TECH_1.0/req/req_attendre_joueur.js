//=========================================================================
// Traitement de "req_attendre_joueur"
// Auteur : ALL IN'TECH
// Version : 26/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var contenu_fichier;
	var connecte;
	var adversaire;



// AFFICHAGE DES JOUEURS EN ATTENTE A FINIR !!!!!!!!

    contenu_fichier = fs.readFileSync("./tables/"+query.compte+".json", "UTF-8");
    connecte = JSON.parse (contenu_fichier);


adversaire = [];

    for (var i = 0 ; i < connecte.length; i++) {
        if (connecte[i].table === query.table && connecte[i].compte !== query.compte) {
            adversaire += connecte[i].compte;
        }

    }

    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('./html/modele_page_table.html', 'utf-8');

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
