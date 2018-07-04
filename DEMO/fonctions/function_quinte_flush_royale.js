//=========================================================================
// Traitement de "function_quinte_flush_royale.js"
// Auteur : ALL IN'TECH
// Version : 01/05/2018
//=========================================================================
"use strict";

// DEBUT DE LA FONCTION

var function_quinte_flush_royale = function (carte1Joueur, carte2Joueur, riviere, joueur, partie) {

	// VARIABLE JSON 
	var contenu_partie;
	var membres;
	var fs = require ("fs");

	//VARIABLE
	var listeValeurMain;
	var testQuinteFlush;
	var quinteFlush
	var i;
	var test;

	// LECTURE JSON
	contenu_partie = fs.readFileSync("./tables/"+partie+".json", "UTF-8");
	membres = JSON.parse(contenu_partie);

	// ON STOCK DANS UNE LISTE
	listeValeurMain = [carte1Joueur, carte2Joueur, riviere[0].valeur, riviere[1].valeur, riviere[2].valeur, riviere[3].valeur, riviere[4].valeur ];

	// ON TRI DANS L'ORDRE CROISANT 
	listeValeurMain.sort((a,b) => a - b);

	//ON STOCK DANS UNE LISTE POUR POUVOIR TESTER SI IL Y A UNE SUITE OU PAS
	testQuinteFlush = [listeValeurMain[2],  listeValeurMain[3], listeValeurMain[4], listeValeurMain[5], listeValeurMain[6]];

	//LISTE D'UNE QUINTE FLUSH
	//quinteFlush = ["10", "11", "12", "13", "14"];


		//ON TESTE QUINTE FLUSH
		if(testQuinteFlush === quinteFlush){
			for(i = 0; i < quinteFlush.length; i++){
				if(carte1Joueur === quinteFlush[i] || carte2Joueur){
					membres.valeurMain[joueur] = 9;
				}
			}
		}

	contenu_partie = JSON.stringify(membres);
	fs.writeFileSync("./tables/"+partie+".json", contenu_partie, "UTF-8");

};
//--------------------------------------------------------------------------

module.exports = function_quinte_flush_royale;
