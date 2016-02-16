var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var usersList = [];
var gamesList = [];

app.set('port', process.env.PORT || 9000);
// app.use(express.favicon());
app.use(express.bodyParser());
//to load the index.html
app.use('/', express.static(path.join(__dirname, 'app')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/getAllQuiz', function(req, res) {
    fs.readFile('tutorials.json', function(err, data) {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});
//GET ALL ROUTE 
app.get('/', function(req,res){
    var routesList = [];
    routesList.push('/getAllRoutes');
    routesList.push('/createUser/:nameUser');
    routesList.push('/createGame/:nameUser/:nameGame/:numberPlayer');
    routesList.push('/joinUserInGame/:nameUser/:nameGame');
    res.send(routesList);
});

// USER AREA
//route pour créer un utilisateur et le rajouter dans le tableau des users
app.get('/createUser/:nameUser', function(req,res){
      var user = new User(req.params.nameUser);
      usersList.push(user);
      res.send(user);
});
// Route pour récuperer tous les utilisateurs
app.get('/getAllUsers', function(req,res){
      res.send(usersList);
});
// GAME AREA
// Route pour créer un nouveau game
app.get('/createGame/:nameUser/:nameGame/:numberPlayer', function(req,res){
    game = new Game(req.params.nameGame, req.params.numberPlayer);
    game.usersInGame.push(findUser(req.params.nameUser));
    gamesList.push(game);
    res.send(game);
});
// Route pour joindre un utilisateur dans une partie 
app.get('/joinUserInGame/:nameUser/:nameGame', function(req,res){
    game = findGame(req.params.nameGame);
    game.usersInGame.push(findUser(req.params.nameUser));
    res.send(game);
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
// OBJET METIER
function User(nameUser){
  this.id = nameUser+Date.now();
  this.name = nameUser;
}

function Game(nameGame, numberPlayer){
    this.id = nameGame+Date.now();
    this.name = nameGame;
    this.stateGame = 1; // -1 partie terminé , 0 partie en cours, 1 partie en attente
    this.numberPlayer = numberPlayer;
    this.usersInGame = [];
}

//FUNCTION UTIL
function findUser(nameUser){
    for(var i = 0 ; i < usersList.length ; i++){
        if(usersList[i].name === nameUser){
            return usersList[i];
        }
    }
    return null;
}
function findGame(nameGame){
    for(var i = 0 ; i < gamesList.length ; i++){
        if(gamesList[i].name === nameGame){
            return gamesList[i];
        }
    }
    console.log('findGame aucun user trouvé')
    return null;
}

















