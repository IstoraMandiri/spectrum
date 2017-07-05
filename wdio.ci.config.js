var config = require('./wdio.development.config').config;

exports.config = Object.assign({}, config, {
	services: ['sauce'],
	user: process.env.SAUCE_USERNAME,
	key: process.env.SAUCE_ACCESS_KEY,
	sauceConnect: true,
	sauceConnectOpts: {
		logger: function(message) { console.log("LOG: ", message)}
	}
});