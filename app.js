var io = require('socket.io-client');
var Slack = require('slack-node');

var apiToken = 'xoxb-3788453121-xEYHkH8UG0sy1aefcgWsglez';

slack = new Slack(apiToken);

slack.api('rtm.start', function(err, response) {
    console.log(response.url.toString());
    this.socket = io.connect(response.url.toString());

    this.socket.on('connect_error', function cb(data) {
	console.log('You fucked up: ',data,' - ',data.error);
    });

    this.socket.on('message', function cb(data) {
	console.log('We just got a message, wonder who its from: ',data);
    });

});