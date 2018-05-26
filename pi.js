//=========================================================================
// Site WEB  PI ALL IN'TECH
// Auteur : ALL IN'TECH
// Version : 15/05/2018
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var mon_serveur;
var port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req/req_commencer.js");
var req_afficher_formulaire_inscription = require("./req/req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req/req_inscrire.js");
var req_identifier = require("./req/req_identifier.js");
var req_statique = require("./req/req_statique.js");
var req_modele_page_joueur = require ("./req/req_modele_page_joueur.js");
var req_retour_modele_accueil = require("./req/req_modele_accueil.js");
var req_modele_page_resultat = require ("./req/req_modele_page_resultat.js");
var req_actualiser_accueil_membre = require ("./req/req_actualiser_accueil_membre.js");
var req_req_attendre_joueur = require ("./req/req_attendre_joueur.js");
var req_attendre_tour = require ("./req/req_attendre_tour.js");
var req_creerTable = require ("./req/req_creerTable.js");
var req_attendre_joueur = require ("./req/req_attendre_joueur.js");
var req_creerTable = require ("./req/req_creerTable.js");
var req_miser = require ("./req/req_miser.js");	
var req_relancer = require ("./req/req_relancer.js"); 
var req_checker = require ("./req/req_checker.js"); 
var req_suivre = require ("./req/req_suivre.js"); 
var req_coucher = require ("./req/req_coucher.js"); 
var req_creerTable_IA = require ("./req/req_creerTable_IA.js");
var req_modele_table_rejointe = require ("./req/req_modele_table_rejointe.js");
var req_attendre_tour = require ("./req/req_attendre_tour.js");

var req_erreur = require("./req/req_erreur.js");



//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

    var ressource;
    var requete;
    var pathname;
    var query;

    console.log("URL reçue : " + req.url);
    requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;

    // ROUTEUR

    try {
        switch (pathname) {
            case '/':
            case '/req_commencer':
                req_commencer(req, res, query);
                break;
            case '/req_afficher_formulaire_inscription':
                req_afficher_formulaire_inscription(req, res, query);
                break;
            case '/req_inscrire':
                req_inscrire(req, res, query);
                break;
            case '/req_identifier':
                req_identifier(req, res, query);
                break;
			case '/req_creerTable':
				req_creerTable(req, res, query);
				break;
			case '/req_modele_page_joueur':
				req_modele_page_joueur(req, res, query);
				break;
			case '/req_modele_page_joueur':
                req_modele_page_joueur(req, res, query);
                break;
			case '/req_actualiser_accueil_membre':
				req_actualiser_accueil_membre(req, res, query);
				break;
			case '/req_retour_modele_accueil':
                req_retour_modele_accueil(req, res, query);
                break;
			case 'req_modele_page_resultat':
                req_modele_page_resultat(req, res, query);
                break;
			case '/req_attendre_joueur':
				req_attendre_joueur(req, res, query);
				break;
			case '/req_attendre_tour':
				req_attendre_tour(req, res, query);
				break;
			case '/req_miser':
				req_miser (req, res, query);
				break;
			 case '/req_checker':
                req_checker (req, res, query);
                break;
			 case '/req_relancer':
                req_relancer (req, res, query);
                break;
			case '/req_suivre':
                req_suivre (req, res, query);
                break;
			case '/req_coucher':
                req_coucher (req, res, query);
                break;
			case '/req_creerTable_IA':
				req_creerTable_IA (req, res, query);
				break;
			case '/req_modele_table_rejointe':
				req_modele_table_rejointe (req, res, query);
				break;
			case '/req_attendre_tour':
				req_attendre_tour (req, res, query);
				break;

            default:
                req_statique(req, res, pathname);
                break;
        }
    } catch (e) {
        console.log('Erreur : ' + e.stack);
        console.log('Erreur : ' + e.message);
        //console.trace();
        req_erreur(req, res, query);
    }
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
