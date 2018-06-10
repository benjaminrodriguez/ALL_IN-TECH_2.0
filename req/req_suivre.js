//=========================================================================
// Traitement de "req_suivre"
// Auteur : ALL IN'TECH
// Version : 08/06/2018
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
	var soldesJoueur;
	var soldesAdversaire;
	var pot;
	var miseJoueur;

	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}
	}

	// PASSAGE DE JOUEUR ACTIF A PASSIF
	contenu_fichier = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");
	membres = JSON.parse(contenu_fichier);

	membres.tour = query.adversaire;

	contenu_fichier = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json" , contenu_fichier, "UTF-8");

	// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	// JOUEURS 1
	if(query.compte === nouvellePartie.joueurs[0]){
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		soldesJoueur = nouvellePartie.solde[0];
		soldesAdversaire = nouvellePartie.solde[1];
		miseJoueur = nouvellePartie.mise[0];
		nouvellePartie.attendre[0] = true;
		nouvellePartie.pot += nouvellePartie.mise[1];
	}

	// JOUEUR 2
	if(query.compte === nouvellePartie.joueurs[1]){
		carteJoueurs = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
		carte2Joueurs = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;
		soldesJoueur = nouvellePartie.solde[1];
		soldesAdversaire = nouvellePartie.solde[0];
		miseJoueur = nouvellePartie.mise[1];
		nouvellePartie.attendre[1] = true;
	}

	pot = nouvellePartie.pot;
	pot += miseJoueur;
	soldesJoueur -= miseJoueur;

	carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur;
	carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur;
	carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
	carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur;
	carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur;

	// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");


	// AFFICHAGE DE LA PAGE RESULTAT
	page = fs.readFileSync("./html/modele_page_attendre.html", "UTF-8");

	// MARQUEURS HTML
	marqueurs = {};

	// Marqueurs Carte Joueur
	marqueurs.carte2Joueurs = carte2Joueurs;
	marqueurs.carteJoueurs = carteJoueurs;

	// Marqueurs Carte de la riviere
	marqueurs.carte1Riviere = carte1Riviere;
	marqueurs.carte2Riviere = carte2Riviere;
	marqueurs.carte3Riviere = carte3Riviere;
	marqueurs.carte4Riviere = carte4Riviere;
	marqueurs.carte5Riviere = carte5Riviere;

	//Autres marqueurs
	marqueurs.soldesJoueur = soldesJoueur;
	marqueurs.soldesAdversaire = soldesAdversaire;
	marqueurs.pot = pot;
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
