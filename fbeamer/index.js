'use strict';

class FBeamer {

	constructor(config) {
		try{
			if(!config || config.PAGE_ACCESS_TOKEN === undefined || config.VERIFY_TOKEN === undefined) {
				throw new Error ("Unable to access tokens!");
			} else {
				this.PAGE_ACCESS_TOKEN = config.PAGE_ACCESS_TOKEN;
				this.VERIFY_TOKEN = config.VERIFY_TOKEN;
			}
		} catch(e) {
			console.log(e);
		}
	}

	registerHook(req, res) {

		let {mode, verify_token, challenge} = req.query.hub;

		if(mode == 'subscribe' && verify_token == this.VERIFY_TOKEN) {
			return res.end(challenge);
		} else {
			console.log("Couldn't register");
			return res.status(403).end();
		}
	}

	incoming(req, res, cb) {
		let data = req.body;
		if(data.object === 'page') {
			data.entry.forEach( pageObj => {
				pageObj.messaging.forEach(msgEvent => {
					let messageObj = {
						sender: msgEvent.sender.id,
						timeOfMessage: msgEvent.timestamp,
						message: msgEvent.message
					} 
					cb(messageObj);

				});
			});
		}
		res.send(200);
	}
}

module.exports = FBeamer;