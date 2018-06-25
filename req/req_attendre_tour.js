//========================================================================
// Traitement de "req_attendre_tour"
// Auteur : ALL'INTECH 
// Version : 27/05/18
//=========================================================================
"use strict";

var fs = require("fs");
var remedial = require("remedial");

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_partie;
	var nouvellePartie;
	var i;
	var joue;
	var partie;
	var carteJoueurs;
	var carte2Joueurs;
	var carte1Riviere;
	var carte2Riviere;
	var carte3Riviere;
	var carte4Riviere;
	var carte5Riviere;
	var soldeJoueur;
	var soldeAdversaire;
	var pot;
	var membres;
	var contenu_fichier;
	var miseAdversaire;
	var miseJoueur = Number(query.miseJoueur);
	var resultat;
	var carte1Adversaire;
	var carte2Adversaire;

	contenu_fichier = fs.readFileSync("./json/connecte.json" , "UTF-8");
	membres = JSON.parse (contenu_fichier);

	for (i = 0 ; i < membres.length ; i++) {
		if (membres[i].compte === query.compte) {
			partie = membres[i].table;
		}
	}

	// SAVOIR QUI DOIT JOUER
	contenu_partie = fs.readFileSync("./tables/"+partie+".json" , "UTF-8");
	nouvellePartie = JSON.parse(contenu_partie);

	//JOUE = "EN_ATTENTE";
	if (nouvellePartie.tour === query.compte) {
		joue = "en_jeu";
	} else if (nouvellePartie.tour !== query.compte) {
		joue = "en_attente";
	}

	// JOUEUR 1
	if (query.compte === nouvellePartie.joueurs[0]) {
		carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		carte1Adversaire = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
		carte2Adversaire = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;
		nouvellePartie.mise[0] = miseJoueur;
		//nouvellePartie.mise[1] = miseAdversaire;
		soldeJoueur = nouvellePartie.solde[0];
		soldeAdversaire = nouvellePartie.solde[1];
		miseAdversaire = Number(nouvellePartie.mise[1]);
	}

	// JOUEUR 2
	if (query.compte === nouvellePartie.joueurs[1]) {
		carteJoueurs = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
		carte2Joueurs = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;	
		carte1Adversaire = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
		carte2Adversaire = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
		nouvellePartie.mise[0] = miseJoueur;
		soldeJoueur = nouvellePartie.solde[1];
		soldeAdversaire = nouvellePartie.solde[0];
		miseAdversaire = Number(nouvellePartie.mise[0]);
	}
	pot = nouvellePartie.pot; 

	if(nouvellePartie.coucher === true){

		carte1Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>";
		carte2Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
		carte3Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>";
		carte4Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[3].couleur+nouvellePartie.river[3].valeur+".png'>";
		carte5Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[4].couleur+nouvellePartie.river[4].valeur+".png'>";

		resultat = "";
		if (nouvellePartie.valeurMain[0] > nouvellePartie.valeurMain[1]) {
			resultat += "<p>"+nouvellePartie.joueurs[0]+" a gagné!</p>";
		} else if (nouvellePartie.valeurMain[0] < nouvellePartie.valeurMain[1]) {
			resultat += "<p>"+nouvellePartie.joueurs[1]+" a gagné!</p>";
		} else if (nouvellePartie.valeurMain[0] === nouvellePartie.valeurMain[1]) {
			resultat += "<p>Egalité!</p>";
		}

		page = fs.readFileSync("./html/modele_page_resultat.html", "UTF-8");

	}else if (joue === "en_jeu" && nouvellePartie.coucher === false) {

		// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS

		contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
		nouvellePartie = JSON.parse(contenu_partie);



		if(nouvellePartie.phase < 2){
			carte1Riviere = "<img class='cartes carte1Riviere' src='../img/carte_verso_2.png'>";
			carte2Riviere = "<img class='cartes carte2Riviere' src='../img/carte_verso_2.png'>";
			carte3Riviere = "<img class='cartes carte3Riviere' src='../img/carte_verso_2.png'>";
			carte4Riviere = "<img class='cartes carte4Riviere' src='../img/carte_verso_2.png'>";
			carte5Riviere = "<img class='cartes carte5Riviere' src='../img/carte_verso_2.png'>";

			page = fs.readFileSync("./html/modele_joue_p1.html" , "UTF-8");
		}else if( nouvellePartie.phase >= 2 && nouvellePartie.phase < 4){
			carte1Riviere = "<img class='cartes carte1Riviere' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>";
			carte2Riviere = "<img class='cartes carte2Riviere' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
			carte3Riviere = "<img class='cartes carte3Riviere' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>"; 
			carte4Riviere = "<img class='cartes carte4Riviere' src='../img/carte_verso_2.png'>";
			carte5Riviere = "<img class='cartes carte5Riviere' src='../img/carte_verso_2.png'>";

			page = fs.readFileSync("./html/modele_joue_p2.html" , "UTF-8");
		}else if( nouvellePartie.phase >= 4 && nouvellePartie.phase < 6){
			carte1Riviere = "<img class='cartes carte1Riviere' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>"; 
			carte2Riviere = "<img class='cartes carte2Riviere' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
			carte3Riviere = "<img class='cartes carte3Riviere' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>";
			carte4Riviere = "<img class='cartes carte4Riviere' src='../img/cards/"+nouvellePartie.river[3].couleur+nouvellePartie.river[3].valeur+".png'>"; 
			carte5Riviere = "<img class='cartes carte5Riviere' src='../img/carte_verso_2.png'>";

			page = fs.readFileSync("./html/modele_joue_p3.html" , "UTF-8");
		}else if( nouvellePartie.phase >= 6){
			carte1Riviere = "<img class='cartes carte1Riviere' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>"; 
			carte2Riviere = "<img class='cartes carte2Riviere' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
			carte3Riviere = "<img class='cartes carte3Riviere' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>";
			carte4Riviere = "<img class='cartes carte4Riviere' src='../img/cards/"+nouvellePartie.river[3].couleur+nouvellePartie.river[3].valeur+".png'>";
			carte5Riviere = "<img class='cartes carte5Riviere' src='../img/cards/"+nouvellePartie.river[4].couleur+nouvellePartie.river[4].valeur+".png'>"; 

		page = fs.readFileSync("./html/modele_joue_p4.html" , "UTF-8");
		}	

		/*
		   carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur; 
		   carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur; 
		   carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
		   carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur; 
		   carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur; 
		 */

		// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
		//		contenu_partie = JSON.stringify(nouvellePartie);
		//		fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

		// AFFICHAGE DE LA PAGE
		//	if (joue === "en_jeu") 
		// page = fs.readFileSync("./html/modele_page_joueur.html" , "UTF-8");
	} else if (joue === "en_attente" && nouvellePartie.coucher === false) {
		// LECTURE DU JSON DE LA PARIE POUR POUVOIR PARAMETRER LES MARQUEURS

		//	console.log("OUI"+partie);
		//		contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
		//		nouvellePartie = JSON.parse(contenu_partie);

		// JOUEUR 1
		if (query.compte === nouvellePartie.joueurs[0]) {
			carteJoueurs = nouvellePartie.main[0][0].couleur + nouvellePartie.main[0][0].valeur;
			carte2Joueurs = nouvellePartie.main[0][1].couleur + nouvellePartie.main[0][1].valeur;
			miseJoueur = nouvellePartie.mise[0];
			miseAdversaire = nouvellePartie.mise[1];
			soldeJoueur = nouvellePartie.solde[0];
			soldeAdversaire = nouvellePartie.solde[1];
		}

		// JOUEUR 2
		if (query.compte === nouvellePartie.joueurs[1]) {
			carteJoueurs = nouvellePartie.main[1][0].couleur + nouvellePartie.main[1][0].valeur;
			carte2Joueurs = nouvellePartie.main[1][1].couleur + nouvellePartie.main[1][1].valeur;	
			nouvellePartie.mise[0] = miseJoueur;
			nouvellePartie.mise[1] = miseAdversaire;
			soldeJoueur = nouvellePartie.solde[1];
			soldeAdversaire = nouvellePartie.solde[0];
			miseAdversaire = nouvellePartie.mise[1];
		}

		pot = nouvellePartie.pot;
		/*
		   carte1Riviere = nouvellePartie.river[0].couleur + nouvellePartie.river[0].valeur; 
		   carte2Riviere = nouvellePartie.river[1].couleur + nouvellePartie.river[1].valeur; 
		   carte3Riviere = nouvellePartie.river[2].couleur + nouvellePartie.river[2].valeur;
		   carte4Riviere = nouvellePartie.river[3].couleur + nouvellePartie.river[3].valeur; 
		   carte5Riviere = nouvellePartie.river[4].couleur + nouvellePartie.river[4].valeur; 
		 */


		if(nouvellePartie.phase === 0){
			carte1Riviere = "<img class='cartes carte1Riviere' src='../img/carte_verso_2.png'>";
			carte2Riviere = "<img class='cartes carte2Riviere' src='../img/carte_verso_2.png'>";
			carte3Riviere = "<img class='cartes carte3Riviere' src='../img/carte_verso_2.png'>";
			carte4Riviere = "<img class='cartes carte4Riviere' src='../img/carte_verso_2.png'>";
			carte5Riviere = "<img class='cartes carte5Riviere' src='../img/carte_verso_2.png'>";

			page = fs.readFileSync("./html/modele_attendre_p1.html" , "UTF-8");
		}else if( nouvellePartie.phase === 1 || nouvellePartie.phase === 2){
			carte1Riviere = "<img class='cartes carte1Riviere' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>";
			carte2Riviere = "<img class='cartes carte2Riviere' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
			carte3Riviere = "<img class='cartes carte3Riviere' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>"; 
			carte4Riviere = "<img class='cartes carte4Riviere' src='../img/carte_verso_2.png'>";
			carte5Riviere = "<img class='cartes carte5Riviere' src='../img/carte_verso_2.png'>";

			page = fs.readFileSync("./html/modele_attendre_p2.html" , "UTF-8");

		}else if( nouvellePartie.phase === 3 || nouvellePartie.phase === 4){
			carte1Riviere = "<img class='cartes carte1Riviere' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>";
			carte2Riviere = "<img class='cartes carte2Riviere' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
			carte3Riviere = "<img class='cartes carte3Riviere' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>"; 
			carte4Riviere = "<img class='cartes carte4Riviere' src='../img/carte_verso_2.png'>";
			carte5Riviere = "<img class='cartes carte5Riviere' src='../img/carte_verso_2.png'>";

			page = fs.readFileSync("./html/modele_attendre_p3.html" , "UTF-8");
	
		}else if( nouvellePartie.phase === 5 || nouvellePartie.phase === 6){
			carte1Riviere = "<img class='cartes carte1Riviere ' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>"; 
			carte2Riviere = "<img class='cartes carte2Riviere' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
			carte3Riviere = "<img class='cartes carte3Riviere' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>";
			carte4Riviere = "<img class='cartes carte4Riviere' src='../img/cards/"+nouvellePartie.river[3].couleur+nouvellePartie.river[3].valeur+".png'>"; 
			carte5Riviere = "<img class='cartes carte5Riviere' src='../img/carte_verso_2.png'>";

			page = fs.readFileSync("./html/modele_attendre_p4.html" , "UTF-8");
		}else if( nouvellePartie.phase >= 6){
			carte1Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[0].couleur+nouvellePartie.river[0].valeur+".png'>"; 
			carte2Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[1].couleur+nouvellePartie.river[1].valeur+".png'>";
			carte3Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[2].couleur+nouvellePartie.river[2].valeur+".png'>";
			carte4Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[3].couleur+nouvellePartie.river[3].valeur+".png'>";
			carte5Riviere = "<img class='cartes' src='../img/cards/"+nouvellePartie.river[4].couleur+nouvellePartie.river[4].valeur+".png'>"; 

			page = fs.readFileSync("./html/modele_attendre_p4.html" , "UTF-8");
		}

		// FERMETURE DU JSON QUI PERMET DE MODIFIER LES PARAMETRES DES MARQUEURS
		//		contenu_partie = JSON.stringify(nouvellePartie);
		//		fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");



	//	page = fs.readFileSync("./html/modele_page_adversaire.html" , "UTF-8");
	} else {
		console.log("ERREUR");
		page = fs.readFileSync ("./html/modele_error.html" , "UTF-8");

	}

	// MARQUEURS HTML
	marqueurs = {};

	// MARQUEURS CARTE JOUEURS
	marqueurs.carte2Joueurs = carte2Joueurs;
	marqueurs.carteJoueurs = carteJoueurs;
	marqueurs.carte1Adversaire = carte1Adversaire; 
	marqueurs.carte2Adversaire = carte2Adversaire;

	// MARQUEURS CARTES DANS LA RIVIERE
	marqueurs.carte1Riviere = carte1Riviere;
	marqueurs.carte2Riviere = carte2Riviere;
	marqueurs.carte3Riviere = carte3Riviere;
	marqueurs.carte4Riviere = carte4Riviere;
	marqueurs.carte5Riviere = carte5Riviere;
	console.log("att tour miseAdversaire : "+miseAdversaire);
	if (miseAdversaire === null) {
		marqueurs.miseAdversaire = 0;
	} else {
		marqueurs.miseAdversaire = miseAdversaire;
	}

	if (miseJoueur === null) {
		marqueurs.miseJoueur = 0;
	} else {
		marqueurs.miseJoueur = miseJoueur;
	}
	marqueurs.soldeJoueur = soldeJoueur;
	marqueurs.soldeAdversaire = soldeAdversaire;
	marqueurs.pot = pot;
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
