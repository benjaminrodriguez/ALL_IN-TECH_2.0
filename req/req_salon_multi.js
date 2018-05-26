"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var compte;
	var page;
	var i;
	var trouve;
	var membre_co_salon;
	var contenu_fichier;
	var liste_membres;
	var liste;
	var test;

	// RECUPERATION DU JSON "salon.json"

	contenu_fichier = fs.readFileSync("./json/salon.json", 'utf-8');
	liste_membres = JSON.parse(contenu_fichier);

	// PREMIER CAS : LE JOUEUR EST DANS LE JSON "salon.json"

	test = false;

	for(i = 0; i < liste_membres.length; i++){
		if(liste_membres[i].compte === query.compte){
			test = true;
			liste_membres[i].etat = "connecté";
			liste_membres[i].libre = "oui";
			contenu_fichier = JSON.stringify(liste_membres);
			fs.writeFileSync("./json/salon.json", contenu_fichier, 'utf-8');
		}
	}

	//SECOND CAS : LE JOUEUR N'EST PAS PRÉSENT DANS LE JSON "salon.json" 
	//-->(première connexion)

	if(test === false){
		membre_co_salon = {};
		membre_co_salon.compte = query.compte;
		membre_co_salon.etat = "connecté";
		membre_co_salon.libre = "oui";
		membre_co_salon.adversaire = "non";
		liste_membres.push(membre_co_salon);

		contenu_fichier = JSON.stringify(liste_membres);
		fs.writeFileSync("./json/salon.json", contenu_fichier, 'utf-8');
	}



	contenu_fichier = fs.readFileSync("./json/salon.json", 'utf-8');
	liste_membres = JSON.parse(contenu_fichier);

	liste= "";
	for (i = 0; i < liste_membres.length; i++) {
		if (liste_membres[i].compte !== query.compte && liste_membres[i].etat === "connecté" && liste_membres[i].libre === "oui") {
			liste += "<form action = 'req_defie' method='GET'><input type = 'hidden' name='compte' value='"+ query.compte +"'><input type='submit' name='adversaire' value='"+ liste_membres[i].compte +"'></form>";
		}
	}

	page = fs.readFileSync('./html/res_salon.html', 'UTF-8');

	marqueurs = {};
	marqueurs.compte = query.compte;
	marqueurs.adversaire = query.adversaire;
	marqueurs.joueurs = liste;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
}

//---------------------------------------------------------------------------

module.exports = trait;

~                                                                                                                                                                                           
~                                                                                                                                                                                           
~                                                                                                                                                                                           
~                                                                                                                                                                                           
~                                                                                                                                                                                           
~                                                                                                                                                                                           
~                                                                                                                                                                                           
~                                                                                                                                                                                           
~                                                                                                                                                                                           
1,1          Tout

