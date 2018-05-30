//=========================================================================
// Traitement de "req_upload"
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
var formidable = require("formidable");
require('remedial');

var trait = function (req, res, query) {

    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        console.log("TITRE : " + fields.titre);
        console.log("NOM DU FICHIER : " + files.fichier.name);
        console.log("PATH : " + files.fichier.path);
        console.log("TYPE : " + files.fichier.type);
    });

    // AFFICHAGE DE LA modele_accueil

    var page = fs.readFileSync('./html/modele_recu.html', 'utf-8');

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
