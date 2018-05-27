//========================================================================
// Traitement de "req_creerTable"
// Auteur : ALL'INTECH 
// Version : 16/05/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var partie = [];
	var contenu_partie;
	var contenu_fichier;
	var connecte;
	var i;
	var nouvellePartie;
	var distribution;
	var melange;
	var mains;
	var river;

/*

	ON GARDE ????

	partie.joueurs = [];
	partie.enJeu = false;
	partie.tour = 0;
	partie.riviere = [];
	partie.main = [];
	partie.mise = [];
	partie.solde = [];

	contenu_partie = JSON.stringify(partie);
	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie,  "UTF-8");
*/
	// LANCEMENT PARTIE EN ATTENTE -> TRUE
	contenu_fichier = fs.readFileSync ('./json/connecte.json' , 'utf-8');
	connecte = JSON.parse(contenu_fichier);
	
	for (i = 0 ; i < connecte.length; i++) {
		if (query.compte === connecte[i].compte) { 
			connecte[i].table = query.compte;
		}
	}
	
	contenu_fichier = JSON.stringify (connecte);
	fs.writeFileSync ('./json/connecte.json' , contenu_fichier , 'utf-8');
	
	// APPEL DU MODULE

	melange = require("../fonctions/function_melange_cartes.js");
	distribution = require("../fonctions/function_distribution_cartes.js");

	// ECRITURE DU JSON DE PARTIE

	melange();

	nouvellePartie = {};
	nouvellePartie.admin = query.compte;
	nouvellePartie.en_jeu = false;
	
	nouvellePartie.joueurs = [];
	nouvellePartie.joueurs[0] = query.compte;
	//nouvellePartie.joueurs[1] = "titi";
	//nouvellePartie.joueurs[2] = "toto"

	nouvellePartie.river = [];
	
	nouvellePartie.main = [];
	nouvellePartie.main[0] = [];
	nouvellePartie.main[1] = [];
	
	nouvellePartie.mise = [];
	nouvellePartie.mise[0] = 0 ;
	nouvellePartie.mise[1] = 0 ;
//	nouvellePartie.mise[2] = 0 ;
	
	for (i = 0 ; i < nouvellePartie.mise[i] ; i++) {
		nouvellePartie.solde += nouvellePartie.mise[i];
	}

	nouvellePartie.solde = [];
	nouvellePartie.solde[0] = "44";
	nouvellePartie.solde[1] = "33";
	nouvellePartie.solde[2] = "2408";
	
	mains = nouvellePartie.main;
	river = nouvellePartie.river;

	distribution(mains, river);

	//listeConnecte[listeConnecte.length] = nouvellePartie;

	contenu_partie = JSON.stringify(nouvellePartie);

	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie, "UTF-8");


	// AFFICHAGE DE LA PAGE

    page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");

    marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.tables = query.compte;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
