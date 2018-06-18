//====================================================================
// Traitement de "IA_req_miser"
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
	var miseJoueurNombre = Number(miseJoueur);
	var miseAdversaireNombre = Number(miseAdversaire);

	// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
	contenu_partie = fs.readFileSync("./tables/" + query.compte +"_VS_IA.json" , "UTF-8");
	membres = JSON.parse(contenu_partie);



	nouvellePartie.pot = Number(nouvellePartie.pot);
	console.log(nouvellePartie.pot);
	// JOUEURS 1
	if(query.compte === nouvellePartie.joueurs[0]){
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		miseJoueur = nouvellePartie.mise[0];
		miseAdversaire = nouvellePartie.mise[1];
		soldeJoueur = nouvellePartie.solde[0];
		soldeAdversaire = nouvellePartie.solde[1];
		nouvellePartie.attendre[0] = true;
	}




	miseJoueurNombre = Number(query.miseJoueur);
	pot = nouvellePartie.pot;
	nouvellePartie.pot += miseJoueurNombre;
	soldeJoueur -= miseJoueurNombre;

	//FONCTIONNEMENT MISE 
	carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur; 
	carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur;
	carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur; 
	carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur; 
	carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur; 
	console.log(nouvellePartie.pot);

	// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/" + query.compte +"_VS_IA.json", contenu_partie, "UTF-8");


	// AFFICHAGE DE LA PAGE RESULTAT
	page = fs.readFileSync("./html/modele_page_attendre.html", "UTF-8");
	console.log(miseJoueur);
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
	marqueurs.miseJoueur = miseJoueurNombre;
	marqueurs.miseAdversaire = miseAdversaireNombre;
	marqueurs.choix = choix;
	//	marqueurs.table = query.table;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
