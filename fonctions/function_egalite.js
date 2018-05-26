//=========================================================================
// Traitement de "function_paire.js"
// Auteur : ALL IN'TECH
// Version : 01/05/2018
//=========================================================================
"use strict";

// EN TETE

var fs = require ("fs");

// CORPS

// DEBUT DE LA FONCTION

var function_egalite = function () {


    var river1;
    var river2;
    var river3;
    var carte1Joueur1;
    var carte2Joueur1;
    var valeurMain;

    valeurMain = 0;
    if (carte1Joueur1 === carte2Joueur1) {
        valeurMain = 2;
    } else if (carte1Joueur1 === river1 || carte1Joueur1 === river2 || carte1Joueur1 === river3 ) {
        valeurMain = 2;
    } else if (carte2Joueur1 === river1 || carte2Joueur1 === river2 || carte2Joueur1 === river3 ) {
        valeurMain = 2;
    }
};
//--------------------------------------------------------------------------

module.exports = function_egalite;
