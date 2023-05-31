var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

  var query = "SELECT * FROM LOBABOBA.Clients";

  database.query(query, function(error, data){

    if(error)
    {
      throw error; 
    }
    else
    {
      response.render('Clients', {title:'Clients', action:'list', ClientsData:data});
    }

  });

});

router.get("/add", function(request, response, next){

  response.render("Clients", {title:'Insert client', action:'add'});

});

router.post("/add_Clients", function(request, response, next){

  var idClients = request.body.idClients;

  var Name = request.body.Name;

  var Surname = request.body.Surname;

  var Phone_number = request.body.Phone_number;

  var query = `
  INSERT INTO LOBABOBA.Clients 
  (idClients, Name, Surname, Phone_number) 
  VALUES ("${idClients}", "${Name}", "${Surname}", "${Phone_number}")
  `;

  database.query(query, function(error, data){

    if(error)
    {
      throw error;
    } 
    else
    {
      response.redirect("/Clients");
    }

  });

});

router.get('/edit/:idClients', function(request, response, next){

  var idClients = request.params.idClients;

  var query = `SELECT * FROM LOBABOBA.Clients WHERE idClients = "${idClients}"`;

  database.query(query, function(error, data){

    response.render('Clients', {title: 'Edit client', action:'edit', ClientsData:data[0]});

  });

});

router.post('/edit/:idClients', function(request, response, next){

  var idClients = request.params.idClients;

  var idClients = request.body.idClients;

  var Name = request.body.Name;

  var Surname = request.body.Surname;

  var Phone_number = request.body.Phone_number;

  var query = `
  UPDATE LOBABOBA.Clients 
  SET idClients = "${idClients}", 
  Name = "${Name}", 
  Surname = "${Surname}", 
  Phone_number = "${Phone_number}" 
  WHERE idClients = "${idClients}"
  `;

  database.query(query, function(error, data){

    if(error)
    {
      throw error;
    }
    else
    {
      response.redirect('/Clients');
    }

  });

});

router.get('/delete/:idClients', function(request, response, next){

  var idClients = request.params.idClients; 

  var query = `
  DELETE FROM LOBABOBA.Clients WHERE idClients = "${idClients}"
  `;

  database.query(query, function(error, data){

    if(error)
    {
      throw error;
    }
    else
    {
      response.redirect("/Clients");
    }

  });

});

module.exports = router;
