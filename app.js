var express = require('express')
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var router = express.Router();

var gameEntries = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+"/Views/index.html"))
})

app.post('/scorePost', function(req, res){
	gameEntries.push({
		name:req.body.name,
		score:req.body.score
	})
	res.redirect('/scores.html')
})

app.get('/scores', function(req, res){
	gameEntries.sort(function(a,b){
		return b.score - a.score
	})
	gameEntries = gameEntries.slice(0, 10)
	res.json(gameEntries);
})

app.use(express.static(__dirname+'/Views'))
app.use('/', router);

app.listen(3000, function(){
	console.log("Server is running on port 3000");
})