//=========================================================================
// Traitement de "req_rejouer"
// Auteur : ALL IN'TECH
// Version : 31/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var membres;
	var contenu_fichier;
	var i;

	// LECTURE DU JSON TABLE
	membres = JSON.parse(contenu_fichier);
	contenu_fichier = fs.readFileSync("./tables/"+query.table+".json" , "UTF-8");
	// DANS LE JSON DE LA TABLE, ON ENVOIE LE PREMIER "JOEURS" SUR MODELE PAGE JOUEUR
	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].joueurs === query.compte && query.compte === query.table) {
			page = fs.readFileSync ("./html/modele_page_joueur.html" , "UTF-8");
		} else 
			page = fs.readFileSync ("./html/modele_page_adversaire.html" , "UTF-8");
		}

	contenu_fichier = JSON.stringify(membres);
    fs.writeFileSync("./tables/"+query.table+".json" , contenu_fichier, 'UTF-8');

    // AFFICHAGE DE LA PAGE ADVERSAIRE
    page = fs.readFileSync('./html/?????????????.html', 'UTF-8');

    marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.table = query.table;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
