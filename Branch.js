var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

  var query = "SELECT * FROM LOBABOBA.Branch";

  database.query(query, function(error, data){

    if(error)
    {
      throw error; 
    }
    else
    {
      response.render('Branch', {title:'Branch', action:'list', BranchData:data});
    }

  });

});

router.get("/add", function(request, response, next){

  response.render("Branch", {title:'Insert new branch', action:'add'});

});

router.post("/add_Branch", function(request, response, next){

  var idBranch = request.body.idBranch;

  var Country = request.body.Country;

  var State = request.body.State;

  var City_town = request.body.City_town;

  var query = `
  INSERT INTO LOBABOBA.Branch 
  (idBranch, Country, State, City_town) 
  VALUES ("${idBranch}", "${Country}", "${State}", "${City_town}")
  `;

  database.query(query, function(error, data){

    if(error)
    {
      throw error;
    } 
    else
    {
      response.redirect("/Branch");
    }

  });

});

router.get('/edit/:idBranch', function(request, response, next){

  var idBranch = request.params.idBranch;

  var query = `SELECT * FROM LOBABOBA.Branch WHERE idBranch = "${idBranch}"`;

  database.query(query, function(error, data){

    response.render('Branch', {title: 'Edit branch', action:'edit', BranchData:data[0]});

  });

});

router.post('/edit/:idBranch', function(request, response, next){

  var idBranch = request.params.idBranch;

  var idBranch = request.body.idBranch;

  var Country = request.body.Country;

  var State = request.body.State;

  var City_town = request.body.City_town;

  var query = `
  UPDATE LOBABOBA.Branch 
  SET idBranch = "${idBranch}", 
  Country = "${Country}", 
  State = "${State}", 
  City_town = "${City_town}"
  WHERE idBranch = "${idBranch}"
  `;

  database.query(query, function(error, data){

    if(error)
    {
      throw error;
    }
    else
    {
      response.redirect('/Branch');
    }

  });

});

router.get('/delete/:idBranch', function(request, response, next){

  var idBranch = request.params.idBranch; 

  var query = `
  DELETE FROM LOBABOBA.Branch WHERE idBranch = "${idBranch}"
  `;

  database.query(query, function(error, data){

    if(error)
    {
      throw error;
    }
    else
    {
      response.redirect("/Branch");
    }

  });

});

module.exports = router;
