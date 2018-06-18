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
	var soldeJoueur;
	var soldeAdversaire;
	var pot = Number(query.pot);
	var contenu_fichier;
	var membres;
	var partie;
	var resultat;
	var carte1Adversaire;
	var carte2Adversaire;
	var miseJoueur = Number(query.miseJoueur);
	var miseAdversaire;

	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);
	

	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}
	}

	// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	console.log(pot +"pot1");
	// JOUEUR 1
	if (query.compte === nouvellePartie.joueurs[0]) {
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		//nouvellePartie.mise[0] = miseJoueur;
		//miseAdversaire = nouvellePartie.mise[1];
		soldeJoueur = nouvellePartie.solde[0];
		soldeAdversaire = nouvellePartie.solde[1];
		carte1Adversaire = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
		carte2Adversaire = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;
		miseAdversaire = Number (nouvellePartie.mise[1]);
	}
	console.log(miseJoueur + "miseJoueur");
	console.log(nouvellePartie.mise[0]+"nouvellePartie.mise[0]");
	console.log(nouvellePartie.mise[1]+"nouvellePartie.miseJoueur[1]");
	// JOUEUR 2
	if (query.compte === nouvellePartie.joueurs[1]) {
		carteJoueurs = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
		carte2Joueurs = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;
		//nouvellePartie.mise[1] = miseJoueur;
		//nouvellePartie.mise[1] = miseAdversaire;
		soldeJoueur = nouvellePartie.solde[1];
		soldeAdversaire = nouvellePartie.solde[0];
		carte1Adversaire = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Adversaire = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		miseAdversaire = Number (nouvellePartie.mise[0]);
	}

	nouvellePartie.pot = pot;
	console.log(pot+"pot2");
	// CALCUL DU POT
	console.log(nouvellePartie.mise[0]+"miseJoueur");
	console.log(nouvellePartie.mise[1]+"miseAdversaire");
	pot = nouvellePartie.mise[0] + nouvellePartie.mise[1];
	console.log(pot+"pot3");


	carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur; 
	carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur; 
	carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
	carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur;
	carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur; 

	// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
//	contenu_partie = JSON.stringify(nouvellePartie);
//	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

	contenu_partie = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	// ON VERIFIE SI TOUS LES JOUEURS SONT SUR PAGE ATTENDRE
	// SI OUI ON LES REDIRIGE VERS PAGE RESULTAT
	if (nouvellePartie.attendre[0] === true && nouvellePartie.attendre[1] === true) {
		// MARQUEUR VALEURMAIN
		resultat = "";
		if (nouvellePartie.valeurMain[0] > nouvellePartie.valeurMain[1]) {
			resultat += "<p>"+nouvellePartie.joueurs[0]+" a gagné!</p>";
		} else if (nouvellePartie.valeurMain[0] < nouvellePartie.valeurMain[1]) {
			resultat += "<p>"+nouvellePartie.joueurs[1]+" a gagné!</p>";
		} else if (nouvellePartie.valeurMain[0] === nouvellePartie.valeurMain[1]) {
			resultat += "<p>Egalité!</p>";
		}

		page = fs.readFileSync ("./html/modele_page_resultat.html" , "UTF-8");

		// SI UN DES DEUX JOUEURS N'EST PAS SUR PAGE ATTENDRE
	} else if (nouvellePartie.attendre[0] === false && nouvellePartie.attendre[1] === true)  {
		page = fs.readFileSync ("./html/modele_page_attendre.html" , "UTF-8");		
	} else if (nouvellePartie.attendre[0] === true && nouvellePartie.attendre[1] === false)  {
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
	marqueurs.carte1Adversaire = carte1Adversaire;
	marqueurs.carte2Adversaire = carte2Adversaire;

	// MARQUEURS CARTE DE LA RIVIERE
	marqueurs.carte1Riviere = carte1Riviere;
	marqueurs.carte2Riviere = carte2Riviere;
	marqueurs.carte3Riviere = carte3Riviere;
	marqueurs.carte4Riviere = carte4Riviere;
	marqueurs.carte5Riviere = carte5Riviere;

	//AUTRES marqueurs
	marqueurs.miseJoueur = miseJoueur;
	marqueurs.miseAdversaire = miseAdversaire;
	marqueurs.soldeJoueur = soldeJoueur;
	marqueurs.soldeAdversaire = soldeAdversaire;
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
