//=========================================================================
// Traitement de "main.js"
// Auteur : ALL-IN'TECh
// Version : 14/05/2018
//=========================================================================
"use strict";

//===============================VARIABLES==================================
// VARIABLE JSON

var fs = require("fs");
var contenuJoueur;
var joueurs;
var contenuRiviere;
var riviere;
var contenuCarte;
var cartes;

// VARIABLE QUI APPELLE LA FONCTION

var melanger = require("./fonctions/function_melange_cartes");
var distribuer = require("./fonctions/function_distribution_cartes.js");
var carteHaute = require("./fonctions/function_carte_haute.js");
var paire = require("./fonctions/function_paire.js");
var doublePaire = require("./fonctions/function_double_paire.js");
var brelan = require("./fonctions/function_brelan.js");
var quinte = require("./fonctions/function_quinte.js");
var couleur = require("./fonctions/function_couleur.js");
var full = require("./fonctions/function_full.js");
var carre = require("./fonctions/function_carre.js");
var quinteFlush = require("./fonctions/function_quinte_flush.js");
var quinteFlushRoyale = require("./fonctions/function_quinte_flush_royale.js");

// VARIABLE

var i;
var valeurMainJoueur;
var carte1Joueur;
var carte2Joueur;
var valeurMain;

//========================================================================

// LECTURE JSON

contenuJoueur = fs.readFileSync("./json/table1.json", "UTF-8");
joueurs = JSON.parse(contenuJoueur);

contenuRiviere = fs.readFileSync("./json/riviere.json", "UTF-8");
riviere = JSON.parse(contenuRiviere);

contenuCarte = fs.readFileSync("./json/testcartes.json", "UTF-8");
cartes = JSON.parse(contenuCarte);

// EXECUTION DES FONCTIONS

//melanger(cartes);
//distribuer(joueurs, cartes, riviere);
//console.log("Les cartes ont été mélangées et distrubuées!");

// TEST COMBINAISON POUR CHAQUE JOUEUR


for(i = 0; i < joueurs.length; i++){

valeurMainJoueur = joueurs[i];
carte1Joueur = joueurs[i].Carte1[0].valeur; 
carte2Joueur = joueurs[i].Carte2[0].valeur;
couleur1Joueur = joueurs[i].Carte1[0].couleur;
couleur2Joueur = joueurs[i].Carte2[0].couleur;
valeurMain = joueurs[i].valeurMain;

carteHaute(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
paire(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
doublePaire(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
brelan(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
quinte(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
couleur(couleur1Joueur, couleur2Joueur, riviere, valeurMainJoueur);
full(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
carre(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
quinteFlush(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);
quinteFlushRoyale(carte1Joueur, carte2Joueur, riviere, valeurMainJoueur);

console.log("Le joueur " + i + " a comme valeur de main: " + valeurMain);

}

// ECRITURE JSON

contenuJoueur = JSON.stringify(joueurs);
fs.writeFileSync("./json/"+query.compte".json", contenuJoueur, "UTF-8");

contenuRiviere = JSON.stringify(riviere);
fs.writeFileSync("./json/riviere.json", contenuRiviere, "UTF-8");

contenuCarte = JSON.stringify(cartes);
fs.writeFileSync("./json/testcartes.json", contenuCarte, "UTF-8");
