//=========================================================================
// Traitement de "function_couleur.js"
// Auteur : ALL IN'TECH
// Version : 15/05/2018
//=========================================================================
"use strict";

var function_couleur = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {

	// VARIABLE JSON
	var contenu_partie;
	var membres;
	var fs = require ("fs");

	//VARIABLE
	var listeCouleurMain;
	var test;
	var x;
	var i;
	var testCouleur1;
	var testCouleur2;
	var testCouleur3;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	// ON STOCK DANS UNE LISTE
	listeCouleurMain = [carte1Joueur, carte2Joueur, riviere[0].couleur, riviere[1].couleur, riviere[2].couleur, riviere[3].couleur, riviere[4].couleur ];

	// ON TRI DANS L'ORDRE CROISANT 
	listeCouleurMain.sort((a,b) => a - b);

	console.log(listeCouleurMain);

	testCouleur1 = [ listeCouleurMain[0], listeCouleurMain[1], listeCouleurMain[2], listeCouleurMain[3], listeCouleurMain[4] ];

	testCouleur2 = [ listeCouleurMain[1], listeCouleurMain[2], listeCouleurMain[3], listeCouleurMain[4], listeCouleurMain[5] ];

	testCouleur3 = [ listeCouleurMain[2], listeCouleurMain[3], listeCouleurMain[4], listeCouleurMain[5], listeCouleurMain[6] ];

	while( test !== 3){
		while(test === 0 && Number(testCouleur1[i + 1]) === Number(testCouleur1[i])+1 && i != 5){
			if(i === 4){
				for(x = 0; x < testCouleur1.length; x++){
					if(carte1Joueur === testCouleur1[x] || carte2Joueur === testCouleur1[x]){
						membres.valeurMain[joueur] = 6;
					} else if(x === testCouleur1.length-1 && carte1Joueur !== testCouleur1[x] && carte2Joueur !== testCouleur1[x]){
						test = 1;
						i = 0;
					}
				}
			}   
			i++;    
		}
		if(test === 0 && Number(testCouleur1[i + 1]) !== Number(testCouleur1[i]+1)){
			test = 1;
			i = 0;  
		} while(test === 1 && Number(testCouleur2[i + 1]) === Number(testCouleur2[i])+1 && i != 5){
			if(i === 4){
				for(x = 0; x < testCouleur2.length; x++){
					if(carte1Joueur === testCouleur2[x] || carte2Joueur === testCouleur2[x]){
						membres.valeurMain[joueur] = 6;
					} else if(x === testCouleur2.length-1 && carte1Joueur !== testCouleur2[x] && carte2Joueur !== testCouleur2[x]){
						test = 2;
						i = 0;
					}
				}
			}   
			i++;
		} if(test === 1 && Number(testCouleur2[i + 1]) !== Number(testCouleur2[i] +1)){
			test = 2;
		} while(test === 2 && Number(testCouleur3[i + 1]) === Number(testCouleur3[i])+1 && i != 5){
			if(i === 4){
				for(x = 0; x < testCouleur3.length; x++){
					if(carte1Joueur === testCouleur3[x] || carte2Joueur === testCouleur3[x]){
						membres.valeurMain[joueur] = 6;
					} else if(x === testCouleur3.length-1 && carte1Joueur !== testCouleur3[x] && carte2Joueur !== testCouleur3[x]){
						test = 3;
						i = 0;
					}
				}
			}   
			i++;
		} if(test === 2 && Number(testCouleur3[i + 1]) !== Number(testCouleur3[i] +1)){
			test = 3;
		}
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_couleur;
