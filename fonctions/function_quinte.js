//=========================================================================
// Traitement de "function_quinte.js"
// Auteur : ALL IN'TECH
// Version : 15/05/2018
//=========================================================================
"use strict";

// DEBUT DE LA FONCTION

var function_quinte = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {
	// VARIABLE JSON 
	var contenu_partie;
	var membres;
	var fs = require ("fs");
	//VARIABLE
	var listeValeurMain;
	var testQuinte1;
	var testQuinte2;
	var testQuinte3;
	var i;
	var test;
	var x;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	// ON STOCK DANS UNE LISTE
	listeValeurMain = [carte1Joueur, carte2Joueur, riviere[0].valeur, riviere[1].valeur, riviere[2].valeur, riviere[3].valeur, riviere[4].valeur ];

	// ON TRI DANS L'ORDRE CROISANT 
	listeValeurMain.sort((a,b) => a - b);

	//ON STOCK DANS DIFFERENTE LISTE POUR POUVOIR TESTER SI IL Y A UNE SUITE OU PAS
	testQuinte1 = [listeValeurMain[0],  listeValeurMain[1], listeValeurMain[2], listeValeurMain[3], listeValeurMain[4]]; 

	testQuinte2 = [listeValeurMain[1],  listeValeurMain[2], listeValeurMain[3], listeValeurMain[4], listeValeurMain[5]]; 

	testQuinte3 = [listeValeurMain[2],  listeValeurMain[3], listeValeurMain[4], listeValeurMain[5], listeValeurMain[6]]; 

	//ON TESTE LA SUITE
	test = 0;
	i = 0;

	while( test !== 3){
		while(test === 0 && Number(testQuinte1[i + 1]) === Number(testQuinte1[i])+1 && i != 5){
			if(i === 4){
				for(x = 0; x < testQuinte1.length; x++){
					if(carte1Joueur === testQuinte1[x] || carte2Joueur === testQuinte1[x]){
						membres.valeurMain[joueur] = 5;
					} else if(x === testQuinte1.length-1 && carte1Joueur !== testQuinte1[x] && carte2Joueur !== testQuinte1[x]){
						test = 1;
						i = 0;
					}
				}
			}	
			i++;	
		}
		if(test === 0 && Number(testQuinte1[i + 1]) !== Number(testQuinte1[i]+1)){
			test = 1;
			i = 0;	
		} while(test === 1 && Number(testQuinte2[i + 1]) === Number(testQuinte2[i])+1 && i != 5){
			if(i === 4){
				for(x = 0; x < testQuinte2.length; x++){
					if(carte1Joueur === testQuinte2[x] || carte2Joueur === testQuinte2[x]){
						membres.valeurMain[joueur] = 5;
					} else if(x === testQuinte2.length-1 && carte1Joueur !== testQuinte2[x] && carte2Joueur !== testQuinte2[x]){
						test = 2;
						i = 0;
					}
				}
			}	
			i++;
		} if(test === 1 && Number(testQuinte2[i + 1]) !== Number(testQuinte2[i] +1)){
			test = 2;
		} while(test === 2 && Number(testQuinte3[i + 1]) === Number(testQuinte3[i])+1 && i != 5){
			if(i === 4){
				for(x = 0; x < testQuinte3.length; x++){
					if(carte1Joueur === testQuinte3[x] || carte2Joueur === testQuinte3[x]){
						membres.valeurMain[joueur] = 5;
					} else if(x === testQuinte3.length-1 && carte1Joueur !== testQuinte3[x] && carte2Joueur !== testQuinte3[x]){
						test = 3;
						i = 0;
					}
				}
			}	
			i++;	
		} if(test === 2 && Number(testQuinte3[i + 1]) !== Number(testQuinte3[i] +1)){
			test = 3;
		}
	}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_quinte;
