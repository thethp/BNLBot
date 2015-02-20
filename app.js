var Slack = require('slack-node');
var WebSocket = require('ws');

var apiToken = 'xoxb-3788453121-xEYHkH8UG0sy1aefcgWsglez';
var slack = new Slack(apiToken);

slack.api('rtm.start', function(err, response) {
    var ws = new WebSocket(response.url);
    ws.on('connect_error', function cb(data) {
	console.log('You fucked up: ',data,' - ',data.error);
    });

    ws.on('message', function cb(data) {
	var msg = JSON.parse(data);
	if(msg.user == 'U03BGBD92' && msg.type == 'message') {
	    var msgText = msg.text;
	    if(msgText.toLowerCase().indexOf("it's been") >= 0 || msgText.toLowerCase().indexOf("its been") >= 0) {
		slack.api('chat.upate', {token: apiToken, ts:msg.ts,channel:msg.channel,});
		msgText.toLowerCase().replace(/it's been|its been/g, ":musical_note: It's Been :musical_note:")
	    }
	}
    });

});
