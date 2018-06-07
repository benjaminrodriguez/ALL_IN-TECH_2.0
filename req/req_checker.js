//=========================================================================
// Traitement de "req_checker"
// Auteur : ALL IN'TECH
// Version : 27/05/2018
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

    var marqueurs;
    var page;
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

// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS
	contenu_partie = fs.readFileSync("./tables/"+query.compte+".json", "UTF-8");
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
		carteJoueurs = nouvellePartie.main[0][2].couleur + nouvellePartie.main[0][2].valeur;
		carte2Joueurs = nouvellePartie.main[0][3].couleur + nouvellePartie.main[0][3].valeur;
		soldesJoueur = nouvellePartie.solde[1];
		soldesAdversaire = nouvellePartie.solde[0];
	}

	pot = nouvellePartie.pot;

	carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur 
	carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur 
	carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur 
	carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur 
	carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur 
	
	// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
	contenu_partie = JSON.stringify(nouvellePartie);
	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie, "UTF-8");


    // AFFICHAGE DE LA PAGE ATTENDRE
	page = fs.readFileSync("./html/modele_page_attendre.html", "UTF-8");

	// Marqueurs HTML
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

	marqueurs.soldesJoueur = soldesJoueur;
	marqueurs.soldesAdversaire = soldesAdversaire;
	marqueurs.pot = pot;

	// Autres marqueurs
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
