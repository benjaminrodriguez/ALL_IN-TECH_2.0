//=========================================================================
// Traitement de "mise_IA.js"
// Auteur : Benjamin
// Version : 01/05/2018
//=========================================================================
"use strict";

// EN TETE 

var fs = require ("fs");

// CORPS 

// DEBUT DE LA FONCTION 

var mise_IA = function (req, res, query) {

	var valeurMain;
	var mise; // CE QUE LE JOUEUR VA METTRE DANS LE POT
	var cagnotte; // CE QUE LE JOEUR POSSEDE

	if (valeurMain === 1) {
		mise = (cagnotte * 0,02);
	} else if (valeurMain === 2) {
		mise = (cagnotte * 0,06);
	} else if (valeurMain === 3) {
		mise = (cagnotte * 0,12);
	} else if (valeurMain === 4) {
		mise = (cagnotte * 0,15);
	} else if (valeurMain === 5) {
		mise = (cagnotte * 0,20);
	} else if (valeurMain === 6) {
		mise = (cagnotte * 0,30);
	} else if (valeurMain === 7) {
		mise = (cagnotte * 0,45);
	} else if (valeurMain === 8) {
		mise = (cagnotte * 0,60);
	} else if (valeurMain === 9) {
		mise = (cagnotte * 0,75);
	} else if (valeurMain === 10) {
		mise = (cagnotte * 0,95);
	}
};
//--------------------------------------------------------------------------

module.exports = mise_IA;
