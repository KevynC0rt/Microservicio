var unirest = require("unirest");

var req = unirest("GET", "https://rapidapi.p.rapidapi.com/new");

req.query({
	"page": "1",
	"country": "mx",
	"days": "30"
});

req.headers({
	"x-rapidapi-key": "f2a5c51d76msh65fc85d96e636d9p1bfa32jsn0ce0686d030c",
	"x-rapidapi-host": "streamzui-streamzui-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
