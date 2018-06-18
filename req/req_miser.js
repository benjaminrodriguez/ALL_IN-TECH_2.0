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
	var miseJoueur = Number(query.miseJoueur);
	//var miseAdversaire = Number(query.miseAdversaire);
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

	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+partie+".json" , contenu_partie, "UTF-8");

	// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	nouvellePartie.pot = Number(nouvellePartie.pot);

	// JOUEURS 1
	if(query.compte === nouvellePartie.joueurs[0]){
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		nouvellePartie.mise[0] = miseJoueur;
		nouvellePartie.mise[1] = miseAdversaire;
		//		nouvellePartie.attendre[0] = true;
		nouvellePartie.tour = nouvellePartie.joueurs[1];
		nouvellePartie.solde[0] -= nouvellePartie.mise[0];
		nouvellePartie.pot += nouvellePartie.mise[0];
		soldeJoueur = nouvellePartie.solde[0];
		soldeAdversaire = nouvellePartie.solde[1];
		miseAdversaire = nouvellePartie.mise[1];
		x = 0;

	}


	// JOUEUR 2

	if(query.compte === nouvellePartie.joueurs[1]){
		carteJoueurs = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
		carte2Joueurs = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;
		//		nouvellePartie.attendre[1] = true;
		nouvellePartie.tour = nouvellePartie.joueurs[0];
		nouvellePartie.solde[1] -= nouvellePartie.mise[1];
		nouvellePartie.pot += nouvellePartie.mise[1];
		nouvellePartie.mise[1] = miseJoueur;
		miseAdversaire = nouvellePartie.mise[0];
		x = 1;

	}

	pot = nouvellePartie.pot;
	console.log(miseJoueur + "mise");
	console.log(pot + "pot");


		//FONCTIONNEMENT MISE 
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

	// AFFICHAGE DE LA PAGE RESULTAT
	if( nouvellePartie.phase < 6){
		nouvellePartie.phase += 1;

		if( nouvellePartie.phase >= 2 && nouvellePartie.phase < 4){
			carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur;
			carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur;
			carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
			carte4Riviere = "";
			carte5Riviere = "";
			
		}else if( nouvellePartie.phase >= 4 && nouvellePartie.phase < 6){
			carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur;
			carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur;
			carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
			carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur;
			carte5Riviere = "";
		}

		// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
		contenu_partie = JSON.stringify(nouvellePartie);
		fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

		page = fs.readFileSync("./html/modele_page_adversaire.html", "UTF-8");

	}else if (nouvellePartie.phase === 6){

			carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur;
			carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur;
			carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
			carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur;
			carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur;

		nouvellePartie.attendre[x] = true;

		contenu_partie = JSON.stringify(nouvellePartie);
		fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

		page = fs.readFileSync("./html/modele_page_attendre.html", "UTF-8");

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
	marqueurs.soldeJoueur = soldeJoueur;
	marqueurs.soldeAdversaire = soldeAdversaire;
	marqueurs.pot = pot;
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.miseJoueur = miseJoueur;
	marqueurs.miseAdversaire = miseAdversaire;
	//	marqueurs.table = query.table;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
