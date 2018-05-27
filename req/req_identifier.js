//========================================================================
// Traitement de "req_identifier"
// Auteur : ALL'INTECH 
// Version : 22/05/18
//=========================================================================

"use strict";

var fs = require("fs");
var remedial = require('remedial');

var trait = function (req, res, query) {

    var marqueurs;
    var compte;
    var mdp;
    var page;
    var membre;
    var contenu_fichier;
    var listeMembres;
	var listeConnecte;
	var nouveauConnecte;
	var liste;
	var connecte;
    var trouve;
	var partie_en_attente;
	var i;

	// ON LIT LES COMPTES EXISTANTS
    contenu_fichier = fs.readFileSync("./json/membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE
    trouve = false;
    i = 0;
    while (i<listeMembres.length && trouve === false) {
        if (listeMembres[i].compte === query.compte) {
            if (listeMembres[i].mdp === query.mdp) {
                trouve = true;
            }
        }
        i++;
    }

	// ON RENVOIT UNE PAGE HTML 
    if(trouve === false) {

	// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR
        page = fs.readFileSync('./html/modele_accueil.html', 'utf-8');

        marqueurs = {};
        marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
//        marqueurs.compte = query.compte;
        page = page.supplant(marqueurs);

    } else {

	// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE
        page = fs.readFileSync('./html/modele_accueil_membre.html', 'UTF-8');

    }
	
	// ON LIT LES COMPTES CONNECTES
    contenu_fichier = fs.readFileSync("./json/connecte.json", 'utf-8');
    listeConnecte = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE COMPTE N'EST PAS DEJA CONNECTE
    trouve = false;
    i = 0;
    while (i < listeConnecte.length && trouve === false) {
        if (listeConnecte[i].compte === query.compte) {
            trouve = true;
        }
        i++;
    }

	// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES CONNECTES
    if (trouve === false) {
        nouveauConnecte = {};
		nouveauConnecte.compte = query.compte;
		nouveauConnecte.connecte = true;
		nouveauConnecte.libre = false;
		nouveauConnecte.table = "";
        listeConnecte[listeConnecte.length] = nouveauConnecte;
		
        contenu_fichier = JSON.stringify(listeConnecte);

        fs.writeFileSync("./json/connecte.json", contenu_fichier, 'utf-8');
    }


	// AFFICHAGE DES PARTIES EN ATTENTE
    contenu_fichier = fs.readFileSync("./json/connecte.json", "UTF-8");
    connecte = JSON.parse (contenu_fichier);
/*
    partie_en_attente = "";

    for (i = 0 ; i < connecte.length ; i++) {
        if (connecte[i].partie_en_attente === true && connecte[i].compte !== query.compte) {
            partie_en_attente += "<form action = 'req_actualiser_accueil_membre?compte={compte}' method='GET'><input type='submit' name='compte' value='"+ connecte[i].compte +"'></form>";
        } 

    }
*/
	marqueurs = {};
    marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.partie_en_attente = partie_en_attente;
	page = page.supplant(marqueurs);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;
