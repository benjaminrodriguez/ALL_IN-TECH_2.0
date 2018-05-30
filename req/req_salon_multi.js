//=========================================================================
// Traitement de "req_salon_multi"
// Auteur :ALL IN'TECH 
<<<<<<< HEAD
// Version : 28/05/2018
=======
// Version : 27/05/2018
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
//=========================================================================
"use strict";

var fs = require("fs");
<<<<<<< HEAD
var remedial = require("remedial");
=======
var remedial = require('remedial');
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118

var trait = function (req, res, query) {

	var marqueurs;
	var compte;
	var page;
	var i;
	var trouve;
	var membre_connecte;
	var contenu_fichier;
	var liste_membres;
	var joueurs;
	var test;

<<<<<<< HEAD
	contenu_fichier = fs.readFileSync("./json/connecte.json", 'UTF-8');
	liste_membres = JSON.parse(contenu_fichier);

	// JOUEUR PRESENT DANS CONNECTE.JSON
	test = false;
	for (i = 0 ; i < liste_membres.length; i++) {
		if (liste_membres[i].compte === query.compte) {
=======
	// RECUPERATION DU JSON "connecte.json"

	contenu_fichier = fs.readFileSync("./json/connecte.json", 'utf-8');
	liste_membres = JSON.parse(contenu_fichier);

	// PREMIER CAS : LE JOUEUR EST DANS LE JSON "connecte.json"
	test = false;
	for(i = 0; i < liste_membres.length; i++) {
		if(liste_membres[i].compte === query.compte) {
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
			test = true;
			liste_membres[i].connecte = true;
			liste_membres[i].libre = true;
			contenu_fichier = JSON.stringify(liste_membres);
<<<<<<< HEAD
			fs.writeFileSync("./json/connecte.json", contenu_fichier, 'UTF-8');
		}
	}

	//JOUEUR ABSENT DANS CONNECTE.JSON
=======
			fs.writeFileSync("./json/connecte.json", contenu_fichier, 'utf-8');
		}
	}



	//SECOND CAS : LE JOUEUR N'EST PAS PRÉSENT DANS LE JSON "connecte.json" 
	

>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	if(test === false) {
		membre_connecte = {};
		membre_connecte.compte = query.compte;
		membre_connecte.connecte = true;
		membre_connecte.libre = true;
		membre_connecte.adversaire = false;
		liste_membres.push(membre_connecte);

		// ON ECRIT LE NOUVEAU STATUT DU JOUEUR DANS CONNECTE.JSON
		contenu_fichier = JSON.stringify(liste_membres);
<<<<<<< HEAD
		fs.writeFileSync("./json/connecte.json", contenu_fichier, 'UTF-8');
	}
	// UTILE ? ON A DEJA LU PLUS HAUT !
	contenu_fichier = fs.readFileSync("./json/connecte.json", 'UTF-8');
	liste_membres = JSON.parse(contenu_fichier);
	
	// CREATION DU MARQUEUR JOUEUR
	joueurs = "";
	for (i = 0; i < liste_membres.length ; i++) {
		// SI LE JOUEUR EST CONNECTE ET DISPONIBLE IL EST AJOUTE DANS LA VAR JOUEUR
		if (liste_membres[i].compte !== query.compte && liste_membres[i].connecte === true && liste_membres[i].libre === true) {
			joueurs = joueurs + "<form action = '/req_defier' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type ='submit' name ='adversaire' value='"+ liste_membres[i].compte +"'></form>";
		}
	}
	
	// AFFICHAGE DE LA PAGE SALON MULTI
=======
		fs.writeFileSync("./json/connecte.json", contenu_fichier, 'utf-8');
	}


	contenu_fichier = fs.readFileSync("./json/connecte.json", 'utf-8');
	liste_membres = JSON.parse(contenu_fichier);

	liste= "";
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte !== query.compte && liste_membres[i].connecte === true && liste_membres[i].libre === true) {
			liste += "<form action = './req_reponse_defi' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type ='submit' name ='adversaire' value='"+ liste_membres[i].compte +"'></form>";
		}
	}

	
	// AFFICHAGE DE LA PAGE
>>>>>>> e0348b3e06fc209e33ac0c9f28174eb8312b1118
	page = fs.readFileSync('./html/modele_salon_multi.html', 'UTF-8');

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.joueurs = joueurs;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;
