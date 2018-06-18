//========================================================================
// Traitement de "req_creerTable"
// Auteur : ALL'INTECH 
// Version : 16/05/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');

    var marqueurs;
    var page;
	var partie = [];
	var contenu_partie;
	var contenu_fichier;
	var connecte;
	var i;
	var nouvellePartie;
	var melange;
	var distribution;
	var mains;
	var river;

	// APPEL DU MODULE
	
	melange = require("./fonctions/function_melange_cartes.js");
	distribution = require("./fonctions/function_distribution_cartes.js");

	// ECRITURE DU JSON DE PARTIE

	melange();

	nouvellePartie = {};
	nouvellePartie.admin = "Nahel";
	nouvellePartie.en_jeu = false;
	
	nouvellePartie.joueurs = [];
	nouvellePartie.joueurs[0] = "Nahel";

	nouvellePartie.river = [];

	
	nouvellePartie.main = [];
	nouvellePartie.main[0] = [];
	nouvellePartie.main[1] = [];

	nouvellePartie.mise = [];
	nouvellePartie.mise[0] = 0 ;
	nouvellePartie.mise[1] = 0 ;
	
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

	contenu_partie = JSON.stringify(nouvellePartie);

	fs.writeFileSync("./tables/nahel.json", contenu_partie, "UTF-8");



//--------------------------------------------------------------------------


