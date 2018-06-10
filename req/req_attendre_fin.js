//=========================================================================
// Traitement de "req_attendre_fin"
// Auteur : ALL IN'TECH
// Version : 07/06/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	// VARIABLES DES MARQUEURS ET JSON
	var marqueurs;
	var page;
	var membres;
	var contenu_fichier;
	var i;
	var contenu_partie;
	var nouvellePartie;
	var carteJoueurs;
	var carte2Joueurs;
	var carte1Riviere;
	var carte2Riviere;
	var carte3Riviere;
	var carte4Riviere;
	var carte5Riviere;
	var soldesJoueur;
	var soldesAdversaire;
	var pot;
	var contenuConnecte;
	var connecte;
	var partie;
	var resultat;

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

	contenuConnecte = fs.readFileSync("./json/connecte.json" , "UTF-8");
	connecte = JSON.parse (contenuConnecte);

	for (i = 0 ; i < connecte.length ; i++) {
		if (connecte[i].compte === query.compte) {
			partie = connecte[i].table;
		}
	}


	// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	// JOUEURS 1
	if(query.compte === nouvellePartie.joueurs[0]){
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		soldesJoueur = nouvellePartie.solde[0];
		soldesAdversaire = nouvellePartie.solde[1];
	}

	// JOUEUR 2
	if(query.compte === nouvellePartie.joueurs[1]){
		carteJoueurs = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
		carte2Joueurs = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;
		soldesJoueur = nouvellePartie.solde[1];
		soldesAdversaire = nouvellePartie.solde[0];
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

	contenu_fichier = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");
	membres = JSON.parse(contenu_fichier);

	// ON VERIFIE SI TOUS LES JOUEURS SONT SUR PAGE ATTENDRE
	// SI OUI ON LES REDIRIGE VERS PAGE RESULTAT
	if (membres.attendre[0] === true && membres.attendre[1] === true) {


		// JOUEURS 1
		if(query.compte === membres.joueurs[0]){
			x = 0;
			carte1Joueur = membres.main[0][0].valeur;
			carte2Joueur = membres.main[0][1].valeur;
			couleur1Joueur = membres.main[0][0].couleur;
			couleur2Joueur = membres.main[0][1].couleur;
		// JOUEUR 2
		} else if(query.compte === membres.joueurs[1]){
			x = 1;
			carte1Joueur = membres.main[1][0].valeur;
			carte2Joueur = membres.main[1][1].valeur;
			couleur1Joueur = membres.main[1][0].couleur;
			couleur2Joueur = membres.main[1][1].couleur;		
		}

		riviere = membres.river;

		//		carteHaute(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
		paire(carte1Joueur, carte2Joueur, riviere, x, partie);
		doublePaire(carte1Joueur, carte2Joueur, riviere, x, partie);
		brelan(carte1Joueur, carte2Joueur, riviere, x, partie);
		//		quinte(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
		couleur(couleur1Joueur, couleur2Joueur, riviere, x, partie);
		//		full(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
		carre(carte1Joueur, carte2Joueur, riviere, x, partie);
		//		quinteFlush(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
		//		quinteFlushRoyale(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);

		// MARQUEUR VALEURMAIN
		resultat = "";
		if(membres.valeurMain[0] > membres.valeurMain[1]){
			resultat += "<p>"+membres.joueurs[0]+" a gagné!</p>";
		}else if(membres.valeurMain[0] < membres.valeurMain[1]){
			resultat += "<p>"+membres.joueurs[1]+" a gagné!</p>";
		}else if(membres.valeurMain[0] === membres.valeurMain[1]){
			resultat += "<p>Egalité!</p>";	
		}


		page = fs.readFileSync ("./html/modele_page_resultat.html" , "UTF-8");
		// SI UN DES DEUX JOUEURS N'EST PAS SUR PAGE ATTENDRE
	} else if (membres.attendre[0] === false && membres.attendre[1] === true)  {
		page = fs.readFileSync ("./html/modele_page_attendre.html" , "UTF-8");		
	} else if (membres.attendre[0] === true && membres.attendre[1] === false)  {
		page = fs.readFileSync ("./html/modele_page_attendre.html" , "UTF-8");
	} else {
		console.log("ERREUR");
		page = fs.readFileSync ("./html/modele_error.html" , "UTF-8");
	}

	// MARQUEURS HTML
	marqueurs = {};

	// MARQUEURS CARTE JOUEUR
	marqueurs.carte2Joueurs = carte2Joueurs;
	marqueurs.carteJoueurs = carteJoueurs;

	// MARQUEURS CARTE DE LA RIVIERE
	marqueurs.carte1Riviere = carte1Riviere;
	marqueurs.carte2Riviere = carte2Riviere;
	marqueurs.carte3Riviere = carte3Riviere;
	marqueurs.carte4Riviere = carte4Riviere;
	marqueurs.carte5Riviere = carte5Riviere;

	//AUTRES MARQUEURS
	marqueurs.soldesJoueur = soldesJoueur;
	marqueurs.soldesAdversaire = soldesAdversaire;
	marqueurs.pot = pot;
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.resultat = resultat;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};
//--------------------------------------------------------------------------

module.exports = trait;
