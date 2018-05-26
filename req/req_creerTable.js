//========================================================================
// Traitement de "req_creerTable"
// Auteur : ALL'INTECH 
// Version : 16/05/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var partie = [];
	var contenu_partie;
	var contenu_fichier;
	var connecte;
	var i;
	var nouvellePartie;

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
	
	for (i = 0 ; i < connecte.length; i++) {
		if (query.compte === connecte[i].compte) { 
			connecte[i].table = query.compte;
		}
	}
	
	contenu_fichier = JSON.stringify (connecte);
	fs.writeFileSync ('./json/connecte.json' , contenu_fichier , 'utf-8');


	// ECRITURE DU JSON DE PARTIE

	nouvellePartie = {};
	nouvellePartie.admin = query.compte;
	nouvellePartie.en_jeu = false;
	
	nouvellePartie.joueurs = [];
	nouvellePartie.joueurs[0] = query.compte;
	//nouvellePartie.joueurs[1] = "titi";
	//nouvellePartie.joueurs[2] = "toto"

	nouvellePartie.river = [];
	nouvellePartie.river[0] = {"valeur" : 0 , "couleur" : "k"};
	nouvellePartie.river[1] = {"valeur" : 0 , "couleur" : "p"};
	nouvellePartie.river[2] = {"valeur" : 0 , "couleur" : "c"};
	nouvellePartie.river[3] = {"valeur" : 0 , "couleur" : "t"};
	nouvellePartie.river[4] = {"valeur" : 0 , "couleur" : "k"};

	nouvellePartie.main = [];
	nouvellePartie.main[0] = [];
	nouvellePartie.main[0][0] = {"valeur" : 0 , "couleur" : "p"};
	nouvellePartie.main[0][1] = {"valeur" : 0 , "couleur" : "k"}; 

	nouvellePartie.main[1] = [];
	nouvellePartie.main[1][0] = {"valeur" : 0 ,"couleur" : "p"};
	nouvellePartie.main[1][1] = {"valeur" : 0 ,"couleur" : "t"};

	nouvellePartie.main[2] = [];
	nouvellePartie.main[2][0] = {"valeur" : 0 , "couleur": "t"};
	nouvellePartie.main[2][1] = {"valeur" : 0 , "couleur" : "k"};

	nouvellePartie.mise = [];
	nouvellePartie.mise[0] = 0 ;
	nouvellePartie.mise[1] = 0 ;
	nouvellePartie.mise[2] = 0 ;
	
	for (var i = 0 ; i < nouvellePartie.mise[i] ; i++) {
		nouvellePartie.solde += nouvellePartie.mise[i];
	}

	nouvellePartie.solde = [];
	nouvellePartie.solde[0] = "44";
	nouvellePartie.solde[1] = "33";
	nouvellePartie.solde[2] = "2408";


	//listeConnecte[listeConnecte.length] = nouvellePartie;

	contenu_partie = JSON.stringify(nouvellePartie);

	fs.writeFileSync("./tables/"+query.compte+".json", contenu_partie, 'utf-8');


	// AFFICHAGE DE LA PAGE

    page = fs.readFileSync('./html/modele_page_table.html' , 'utf-8');

    marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.tables = query.compte;
    page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
