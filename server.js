'use strict';

const Restify = require('restify');
const server = Restify.createServer({
	name: 'WeatherMessenger'
});

const PORT = process.env.PORT || 3000;

//Tokens
const config = require('./config');

//FBeamer

const FBeamer = require('./fbeamer');
const f = new FBeamer(config);

//Test
server.get('/', (req,res,next) => {
	res.send("Hello!");
	return next();
});

server.listen(PORT, () => console.log(`Messenger running on port ${PORT}`));