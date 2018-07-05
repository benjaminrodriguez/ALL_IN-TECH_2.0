//====================================================================
// Traitement de "req_miser"
// Auteur : ALL IN'TECH
// Version : 28/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var i;
	var partie;
	var contenu_fichier;
	var contenu_partie;
	var nouvellePartie;
	var membres;
	var carteJoueurs;
	var carte2Joueurs;
	var carte1Riviere;
	var carte2Riviere;
	var carte3Riviere;
	var carte4Riviere;
	var carte5Riviere;
	var soldeJoueur;
	var soldeAdversaire;
	var choix;
	var pot;
	var compteJoueur;
	var miseAdversaire;
	var miseJoueur;
	var x;

	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;

		}
	}

	// PASSAGE DE JOUEUR ACTIF A PASSIF
	contenu_partie = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	membres.tour = query.adversaire;


	nouvellePartie.pot = Number(query.pot);


	// JOUEURS 1
	if (query.compte === nouvellePartie.joueurs[0]) {
		miseJoueur = soldeJoueur;
		nouvellePartie.mise[0] = miseJoueur;
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		nouvellePartie.mise[0] = miseJoueur;
		nouvellePartie.tour = nouvellePartie.joueurs[1];
		nouvellePartie.solde[0] -= nouvellePartie.mise[0];
		nouvellePartie.pot += miseJoueur;
		soldeJoueur = nouvellePartie.solde[0];
		soldeAdversaire = nouvellePartie.solde[1];
		miseAdversaire = nouvellePartie.mise[1];
		x = 0;

	}

	// JOUEUR 2

	if (query.compte === nouvellePartie.joueurs[1]) {
		miseJoueur = soldeJoueur;
		nouvellePartie.mise[1] = miseJoueur;
		carteJoueurs = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
		carte2Joueurs = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;
		nouvellePartie.tour = nouvellePartie.joueurs[0];
		nouvellePartie.solde[1] -= nouvellePartie.mise[1];
		nouvellePartie.pot += miseJoueur;
		soldeJoueur = nouvellePartie.solde[1];
		soldeAdversaire = nouvellePartie.solde[0];
		miseAdversaire = nouvellePartie.mise[0];
		x = 1;
	}

	pot = nouvellePartie.pot;

	nouvellePartie.phase += 1;

	nouvellePartie.attendre[x] = true;


	carte1Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>";
	carte2Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
	carte3Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>";
	carte4Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[3].couleur+nouvellePartie.river[3].valeur+".png'>";
	carte5Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[4].couleur+nouvellePartie.river[4].valeur+".png'>";


	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

	page = fs.readFileSync("./html/modele_page_attendre.html", "UTF-8");
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
marqueurs.soldeJoueur = soldeJoueur;
marqueurs.soldeAdversaire = soldeAdversaire;
marqueurs.pot = pot;
marqueurs.compte = query.compte;
marqueurs.adversaire = query.adversaire;
marqueurs.miseJoueur = miseJoueur;
if (miseAdversaire === null) {
	marqueurs.miseAdversaire = 0;
} else {
	marqueurs.miseAdversaire = miseAdversaire;
}
page = page.supplant(marqueurs);

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
