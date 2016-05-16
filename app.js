const PORT = 8080; 

var express = require('express'); 
var app = express(); 
var http = require('http');
var request = require('request');

app.use(function(req, res, next) { 
	try
	{
		res.header("Access-Control-Allow-Origin", "*"); 
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
		next(); 
	}
	catch(err)
	{
		console.error(err);
	}
}); 

app.get('/weather', function(req, res){ 
 	var zip = req.param('zip'); 
	var body = '';
	
 	if (!zip) { 
 		console.error('Did not receive a zip code in the query string.'); 
 		return null; 
 	} 
	
	var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=63163e338ad80aca6e272dca29313281&units=imperial';
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.end(body);
		}
	});
}); 

app.use(express.static(__dirname + '/web'));
 
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});