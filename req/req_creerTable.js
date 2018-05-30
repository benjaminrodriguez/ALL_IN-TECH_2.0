//========================================================================
// Traitement de "req_creerTable"
// Auteur : ALL IN'TECH 
// Version : 16/05/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var partie = [];
	var contenu_partie;
	var contenu_fichier;
	var connecte;
	var i;
	var a; 
	var b;
	var nouvellePartie;
	var distribution;
	var melange;
	var mains;
	var river;
<<<<<<< HEAD
	var membres;
=======

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
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	
	contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
    membres = JSON.parse(contenu_fichier);

	// ON DONNE LA DISPONIBILITE DE CHAQUE JOUEURS
	for (a = 0 ; a < membres.length ; a++) {
		if (membres[a].compte === query.compte) {
			membres[a].connecte = "joue";
		}
	}
	for (b = 0 ; b < membres.length ; b++) {
 		if (membres[b].compte === query.adversaire) {
			membres[b].connecte = "joue";
		}
	}
	
<<<<<<< HEAD
	contenu_fichier = JSON.stringify(membres);
	fs.writeFileSync("./json/connecte.json" , contenu_fichier , "UTF-8");
	
	

// ============================================================================
// ============================================================================
=======
	contenu_fichier = JSON.stringify (connecte);
	fs.writeFileSync ('./json/connecte.json' , contenu_fichier , 'utf-8');
	
	// APPEL DU MODULE

	melange = require("../fonctions/function_melange_cartes.js");
	distribution = require("../fonctions/function_distribution_cartes.js");
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118


<<<<<<< HEAD
	// CODE JEU

	// APPEL DES MODULES MELANGER ET LES COMBINAISONS
	melange = require("../fonctions/function_melange_cartes.js");
	distribution = require("../fonctions/function_distribution_cartes.js");

	// APPEL DES FONCTIONS
	melange();

	// ECRITURE DU JSON DE PARTIE
=======
	melange();

>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	nouvellePartie = {};
	nouvellePartie.admin = query.compte;

	// JOUEURS DE LA PARTIE
	nouvellePartie.joueurs = [];
	nouvellePartie.joueurs[0] = query.compte;
	nouvellePartie.joueurs[1] = query.adversaire;

	// TOUR DE JEU
	nouvellePartie.tour = query.compte; 

	// CARTES DE LA RIVIERE
	nouvellePartie.river = [];
<<<<<<< HEAD

	// CARTES EN MAIN
	nouvellePartie.main = [];
	nouvellePartie.main[0] = [];
	nouvellePartie.main[1] = [];

	// MISE DE CHAQUE JOUERS
	nouvellePartie.mise = [];
	nouvellePartie.mise[0] = 0 ;
	nouvellePartie.mise[1] = 0 ;

=======
	
	nouvellePartie.main = [];
	nouvellePartie.main[0] = [];
	nouvellePartie.main[1] = [];
	
	nouvellePartie.mise = [];
	nouvellePartie.mise[0] = 0 ;
	nouvellePartie.mise[1] = 0 ;
//	nouvellePartie.mise[2] = 0 ;
	
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	for (i = 0 ; i < nouvellePartie.mise[i] ; i++) {
		nouvellePartie.solde += nouvellePartie.mise[i];
	}
	// SOLDE DE CHAQUE JOUEURS, SOLDE DE DEPART DE 100
	nouvellePartie.solde = [];
<<<<<<< HEAD
	nouvellePartie.solde[0] = 100;
	nouvellePartie.solde[1] = 100;

	// DISTRIBUTION DES CARTES DANS LA MAIN ET DANS LA RIVIERE
	mains = nouvellePartie.main;
	river = nouvellePartie.river;
=======
	nouvellePartie.solde[0] = "44";
	nouvellePartie.solde[1] = "33";
	nouvellePartie.solde[2] = "2408";
	
	mains = nouvellePartie.main;
	river = nouvellePartie.river;

	distribution(mains, river);
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118

	distribution(mains, river);

	// ECRITURE DANS LE JSON DE PARTIE AVEC LES NOUVELLES DONNEES
	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie, "UTF-8");

<<<<<<< HEAD

	// AFFICHAGE DE LA PAGE DE JEU
	page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");
=======
	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie, "UTF-8");


	// AFFICHAGE DE LA PAGE

    page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.tables = query.compte;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
