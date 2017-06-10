'use strict';

const Restify = require('restify');
const server = Restify.createServer({
	name: 'WeatherMessenger'
});

const PORT = process.env.PORT || 3000;

server.use(Restify.jsonp());
server.use(Restify.bodyParser());

//Tokens
const config = require('./config');

//FBeamer

const FBeamer = require('./fbeamer');
const f = new FBeamer(config);

//Register wenhooks 
server.get('/', (req,res,next) => {
	f.registerHook(req, res);
	return next();
});

// Receive incoming messages

server.post('/', (req,res,next) => {
	f.incoming(req, res, msg => {
		console.log(msg); 
	});
	return next();
});


server.listen(PORT, () => console.log(`Messenger running on port ${PORT}`));