//=========================================================================
// Traitement de main gagnante
// Auteur : ALL IN'TECH
// Version : 23/05/2018
//=========================================================================
"use strict";

// EN TETE 

var joueur;
var river;
var carte1;
var carte2;
var river1;
var river2;
var river3;
var valeur_main;
var stop;

joueur = {};
//river = {};


// CORPS
stop = false;
do {
	for (i = 0 ; i < joueur.length ; i++) {
		// PAIRE 1
		if (joueur[i].carte1 !== joueur[i]carte2 && joueur[i].carte1 !== river1 && river1 !== river2 && river2 !== river3) {
			valeur_main = 0;
		} else if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
			valeur_main = 1;
			// DOUBLE PAIRE
			if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3)
				valeur_main = 2;
		}
		// PAIRE 2
	} else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
		valeur_main = 1;
		// BRELAN 1
	} else if (joueur[i].carte1 !== joueur[i].carte2) {
		if (joueur[i].carte1 === river1 && joueur[i].carte1 === river2) {
			valeur_main = 3;
		} else if (joueur[i].carte1 === river2 && joueur[i].carte1 === river3) {
			valeur_main = 3;
		} else if (joueur[i].carte1 === river3 && joueur[i].carte1 === river1) {
			valeur_main = 3;
		}
		// BRELAN 2
	} else if (joueur[i].carte1 === joueur[i].carte2) {
		if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3)
			valeur_main = 3;
	}
	// QUINTE REUSSIR A ORDONNER TOUS LES NB
} else if ( ) {
	valeur_main = 4;
	// FULL 1
} else if (joueur[i].carte1 !== joueur[i].carte2) {
	if (joueur[i].carte1 === river1 && joueur[i].carte1 === river2) {
		if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
			valeur_main = 4,5;
		} else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
			valeur_main = 4,5;
		} else if (joueur[i].carte1 === river2 && joueur[i].carte1 === river3) {
			if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
				valeur_main = 4,5;
			}  else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
				valeur_main = 4,5;
			} else if (joueur[i].carte1 === river3 && joueur[i].carte1 === river1) {
				if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
					valeur_main = 4,5;
				} else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
					valeur_main = 4,5;
				}
				// FULL 2
			} else if (joueur[i].carte1 === joueur[i].carte2) {
				if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
					if (joueur[i].carte1 === river1 || joueur[i].carte1 === river2 || joueur[i].carte1 === river3) {
						valeur_main = 4,5;
					} else if (joueur[i].carte2 === river1 || joueur[i].carte2 === river2 || joueur[i].carte2 === river3) {
						valeur_main = 4,5;
					}
				}
				// COULEUR FAIRE PLUS BAS
			} else if (        ) {
				valeur_main = 5
					// CARRE 1
			} else if (joueur[i].carte1 === joueur[i].carte2) {
				if (joueur[i].carte1 === river1) {
					if (joueur[i].carte1 === river2 || joueur[i].carte1 === river3)
						valeur_main = 6;
				}
			} else if (joueur[i].carte1 === river2) {
				if (joueur[i].carte1 === river1 || joueur[i].carte1 === river3)
					valeur_main = 6;
			}
			// CARRE 2
		} else if (joueur[i].carte1 !== joueur[i].carte2) {
			if (river1 === river2 && river2 === river3) {
				valeur_main = 6;
			}
			// QUINTE FLUSH -> ORDONNER CARTES
		} else if (      ) {


			// QUINTE FLUSH ROYALE -> ORDONNER CARTES ET COULEURS
		} else if (             ) {


		}
	}
	stop = true
} while (stop === false);
