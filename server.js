import express from "express";
import minimist from "minimist";
import { roll } from "./lib/roll.js";

const app = express();
app.use(express.urlencoded({extended: true}));

let port = 5000; //default port number
const args = minimist(process.argv.slice(2));

if ("port" in args) {
	port = args.port;
}

// Check endpoint at /app/
app.get('/app/', (req, res) => {
	res.send('200 OK');
});

// Endpoint /app/roll/
app.get('/app/roll/', (req, res) => {
	res.send(roll(6,2,1));
});

// Make endpoint accept URLEncoded or JSON; use parseInt
// use post because it's message body
app.post('/app/roll/', (req, res) => {
	let sides = parseInt(req.body.sides);
	let dice = parseInt(req.body.dice);
	let rolls = parseInt(req.body.rolls);

	res.send(roll(sides, dice, rolls));
});

// Only specify sides, default dice & roll
app.get('/app/roll/:sides/', (req, res) => {
	let sides = parseInt(req.params.sides);

	res.send(roll(sides, 2, 1));
});

// Specify sides and dice, default roll
app.get('/app/roll/:sides/:dice/', (req, res) => {
	let sides = parseInt(req.params.sides);
	let dice = parseInt(req.params.dice);

	res.send(roll(sides, dice, 1));
});
// Specify all params
app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
	let sides = parseInt(req.params.sides);
	let dice = parseInt(req.params.dice);
	let rolls = parseInt(req.params.rolls);
	
	res.send(roll(sides, dice, rolls));
});
// undefined endpoint
app.use(function(req, res) {
	res.send("404 NOT FOUND");
});

app.listen(port);
	
