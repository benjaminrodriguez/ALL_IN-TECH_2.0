//========================================================================
// Traitement de "req_augmenter_mise"
// Auteur : ALL'INTECH 
// Version : 09/06/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var i;
	var page;
	var nouvellePartie;
	var contenu_fichier;
	var contenu_partie;
	var membres;
	var partie;
	var miseJoueur;
	var miseAdversaire;
	var soldesJoueur;
	var soldesAdversaire;
	var carteJoueurs;
	var carte2Joueurs;
	var carte1Riviere;
	var carte2Riviere;
	var carte3Riviere;
	var carte4Riviere;
	var carte5Riviere;
	var choix;
	var attendre;
	var pot;
	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	for (i = 0; i < membres.length; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}		
	}

	contenu_partie= fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

// JOUEURS 1
	if(query.compte === nouvellePartie.joueurs[0]){
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		miseJoueur = nouvellePartie.mise[0];
		miseAdversaire = nouvellePartie.mise[1];
		soldesJoueur = nouvellePartie.solde[0];
		soldesAdversaire = nouvellePartie.solde[1];
	}

	// JOUEUR 2
	if(query.compte === nouvellePartie.joueurs[1]){
		carteJoueurs = nouvellePartie.main[0][2].couleur + nouvellePartie.main[0][2].valeur;
		carte2Joueurs = nouvellePartie.main[0][3].couleur + nouvellePartie.main[0][3].valeur;
		miseJoueur = nouvellePartie.mise[1];
		miseAdversaire = nouvellePartie.mise[0];
		soldesJoueur = nouvellePartie.solde[1];
		soldesAdversaire = nouvellePartie.solde[0];
	}	
	
	pot = nouvellePartie.pot;

	if (pot === 0) {
		choix = "miser";
		miseJoueur = 100;
	} else {
		choix = "relancer";
		miseJoueur = (miseAdversaire + (miseAdversaire / 4));
	}

	if (miseJoueur > 0 ) {
			miseJoueur -= 50;
			if (miseJoueur < 0) {
				if (soldesJoueur >= 50) {
				miseJoueur = 50;
				} else {
					miseJoueur = soldesJoueur;
				}
			}
	}

contenu_partie = JSON.stringify(nouvellePartie);
fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");



	// AFFICHAGE DE LA PAGE RESULTAT
	page = fs.readFileSync("./html/modele_page_joueur.html", "UTF-8");

carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur; 
	carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur; 
	carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur; 
	carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur; 
	carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur; 
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

	marqueurs.soldesJoueur = soldesJoueur;
	marqueurs.soldesAdversaire = soldesAdversaire;
	marqueurs.pot = pot;
	marqueurs.miseJoueur = miseJoueur;
	marqueurs.miseAdversaire = miseAdversaire;
	marqueurs.choix = choix;

	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//---------------------------------------------------------------------------

module.exports = trait;
