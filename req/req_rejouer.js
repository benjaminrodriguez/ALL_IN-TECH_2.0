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
	var contenu_partie;
	var partie;
	var i;
	var a;
	var b;
	var connecte;
	var nouvellePartie;
	var distribution;
	var melange;
	var mains;
	var river;
	var table;
	var carteJoueurs;
	var carte2Joueurs;
	var carte1Riviere;
	var carte2Riviere;
	var carte3Riviere;
	var carte4Riviere;
	var carte5Riviere;
	var soldeJoueur;
	var soldeAdversaire;
	var miseJoueur;
	var miseAdversaire;
	var attendre;
	var pot;
	var resultat;
	var tour_partie;
	var contenu_partie;

	// VARIABLES DES COMBINAISONS
	var x;
	var valeurMainJoueur;
	var carte1Joueur;
	var carte2Joueur;
	var couleur1Joueur;
	var couleur2Joueur;
	var riviere;

	// VARIABLE QUI APPELLE LA FONCTION
	var carteHaute = require("../fonctions/function_carte_haute.js");
	var paire = require("../fonctions/function_paire.js");
	var doublePaire = require("../fonctions/function_double_paire.js");
	var brelan = require("../fonctions/function_brelan.js");
	var quinte = require("../fonctions/function_quinte.js");
	var couleur = require("../fonctions/function_couleur.js");
	var full = require("../fonctions/function_full.js");
	var carre = require("../fonctions/function_carre.js");
	var quinteFlush = require("../fonctions/function_quinte_flush.js");
	var quinteFlushRoyale = require("../fonctions/function_quinte_flush_royale.js");

	// LECTURE DU JSON DES MEMBRES
	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	// LECTURE DU JSON PARTIE
	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}
	}

	// LANCEMENT DU TOUR

	// LECTURE DU JSON TABLE
	//contenu_partie = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");
	//tour_partie = JSON.parse(contenu_partie);
	contenu_partie = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");
	nouvellePartie = JSON.parse (contenu_partie);

	// TANT QUE LES SOLDES !== 0 ON CONTINUE A JOUER
	if (nouvellePartie.solde[0] !== 0 && nouvellePartie.solde[1] !== 0) { 
		// DANS LE JSON DE LA TABLE, ON ENVOIE LE PREMIER "JOEURS" SUR MODELE PAGE JOUEUR
		if (nouvellePartie.admin === query.compte) {
			page = fs.readFileSync ("./html/modele_page_joueur.html" , "UTF-8");
		} else {
			page = fs.readFileSync ("./html/modele_page_adversaire.html" , "UTF-8");
		}
		


		// CODE JEU

		// APPEL DES MODULES MELANGER ET LES COMBINAISONS
		melange = require("../fonctions/function_melange_cartes.js");
		distribution = require("../fonctions/function_distribution_cartes.js");

		// APPEL DES FONCTIONS
		melange();

		// ECRITURE DU JSON DE PARTIE
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

		// CARTES EN MAIN
		nouvellePartie.main = [];
		nouvellePartie.main[0] = [];
		nouvellePartie.main[1] = [];

		// MISE DE CHAQUE JOUERS
		nouvellePartie.mise = [];
		nouvellePartie.mise[0] = 0;
		nouvellePartie.mise[1] = 0;

		// POT
		//nouvellePartie.pot = Number(nouvellePartie.pot);
		nouvellePartie.pot = Number(0);

		for (i = 0 ; i < nouvellePartie.mise[i] ; i++) {
			nouvellePartie.solde += nouvellePartie.mise[i];
		}
		// SOLDE DE CHAQUE JOUEURS, SOLDE DE DEPART DE 100
		//nouvellePartie.solde = [];
		//nouvellePartie.solde[0] = 1000;
		//nouvellePartie.solde[1] = 1000;

		// DISTRIBUTION DES CARTES DANS LA MAIN ET DANS LA RIVIERE
		mains = nouvellePartie.main;
		river = nouvellePartie.river;

		// ATTENDRE TRUE OU FALSE
		nouvellePartie.attendre = [false,false];

		// VALEUR DES MAINS
		nouvellePartie.valeurMain = [0,0];

		distribution(mains, river);

		// ECRITURE DANS LE JSON DE PARTIE AVEC LES NOUVELLES DONNEES
		contenu_partie = JSON.stringify(nouvellePartie);
		fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

		// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
		contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
		nouvellePartie = JSON.parse(contenu_partie);

		// JOUEURS 1
		if(query.compte === nouvellePartie.joueurs[0]){
			carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
			carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
			miseJoueur = nouvellePartie.mise[0];
			miseAdversaire = nouvellePartie.mise[1];
			soldeJoueur = nouvellePartie.solde[0];
			soldeAdversaire = nouvellePartie.solde[1];
		}

		// JOUEUR 2
		if(query.compte === nouvellePartie.joueurs[1]){
			carteJoueurs = nouvellePartie.main[0][2].couleur + nouvellePartie.main[0][2].valeur;
			carte2Joueurs = nouvellePartie.main[0][3].couleur + nouvellePartie.main[0][3].valeur;
			miseJoueur = nouvellePartie.mise[1];
			miseAdversaire = nouvellePartie.mise[0];
			soldeJoueur = nouvellePartie.solde[1];
			soldeAdversaire = nouvellePartie.solde[0];
		}

		pot = nouvellePartie.pot;


		carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur;
		carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur;
		carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
		carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur;
		carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur;

		// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
		contenu_partie = JSON.stringify(nouvellePartie);
		fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

		// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
		contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
		nouvellePartie = JSON.parse(contenu_partie);

		// CALCUL DES MAINS
		partie = query.compte;
		riviere = nouvellePartie.river;

		for(x = 0; x < nouvellePartie.joueurs.length; x++){

			carte1Joueur = nouvellePartie.main[x][0].valeur;
			carte2Joueur = nouvellePartie.main[x][1].valeur;
			couleur1Joueur = nouvellePartie.main[x][0].couleur;
			couleur2Joueur = nouvellePartie.main[x][1].couleur;

			carteHaute(carte1Joueur, carte2Joueur, riviere, x, partie);
			paire(carte1Joueur, carte2Joueur, riviere, x, partie);
			doublePaire(carte1Joueur, carte2Joueur, riviere, x, partie);
			brelan(carte1Joueur, carte2Joueur, riviere, x, partie);
			quinte(carte1Joueur, carte2Joueur, riviere, x, partie);
			//      couleur(couleur1Joueur, couleur2Joueur, riviere, x, partie);
			full(carte1Joueur, carte2Joueur, riviere, x, partie);
			carre(carte1Joueur, carte2Joueur, riviere, x, partie);
			quinteFlush(carte1Joueur, carte2Joueur, riviere, x, partie);
			//quinteFlushRoyale(carte1Joueur, carte2Joueur, riviere, x, partie);
		}
	} else if (tour_partie.solde[0] === 0 || tour_partie.solde[1] === 0) {
		for (i = 0 ; i < membres.length ; i++) {
			if (membres[i].compte === query.compte) {
					partie = membres[i].table;
			}
		}
		if (partie.solde[0] === 0) {
			resultat = "Bravo " +partie.joueurs[1]+ " vous avez gagné, cliquez sur le bouton ci-dessous pour faire une nouvelle partie";
			page = fs.readFileSync ("./html/modele_page_resultat.html" , "UTF-8");
		} else if (partie.solde[1] === 0) {
			resultat = "Bravo " +partie.joueurs[0]+ " vous avez gagné, cliquez sur le bouton ci-dessous pour faire une nouvelle partie";
			page = fs.readFileSync ("./html/modele_page_resultat.html" , "UTF-8");
		} else {
			console.log ("ERREUR");
			page = fs.readFileSync ("./html/modele_error.html" , "UTF-8");
		}
	} else {
			console.log ("ERREUR : req_rejouer");
			page = fs.readFileSync ("./html/modele_error.html" , "UTF-8");
	}

		marqueurs = {};
		// MARQUEURS HTML

		// MARQUEURS CARTE JOUEUR
		marqueurs.carte2Joueurs = carte2Joueurs;
		marqueurs.carteJoueurs = carteJoueurs;

		// MARQUEURS CARTE DE LA RIVIERE
		marqueurs.carte1Riviere = carte1Riviere;
		marqueurs.carte2Riviere = carte2Riviere;
		marqueurs.carte3Riviere = carte3Riviere;
		marqueurs.carte4Riviere = carte4Riviere;
		marqueurs.carte5Riviere = carte5Riviere;

		marqueurs.soldeJoueur = soldeJoueur;
		marqueurs.soldeAdversaire = soldeAdversaire;
		marqueurs.pot = pot;
		marqueurs.miseJoueur = miseJoueur;
		marqueurs.miseAdversaire = miseAdversaire;
		marqueurs.resultat = resultat;

		marqueurs.compte = query.compte;
		marqueurs.adversaire = query.adversaire;
		page = page.supplant(marqueurs);

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();

};
//--------------------------------------------------------------------------

module.exports = trait;
