require('dotenv').config();

var Twitter = require('twitter');
var sentiment = require('sentiment');

var config = {
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var client = new Twitter(config);

var track = [
//	'Binay',
//	'Santiago',
	'Duterte',
//	'Roxas',
//	'Poe'
];

client.stream('statuses/filter', { track: track.join(','), language: 'en' }, function(stream) {
	//var dataSet = [];

	stream.on('data', function(tweet) {
		var result = sentiment(tweet.text);
			
		console.log('[' + result.score + ']', tweet.text);
	});

	stream.on('error', function(error) {
		throw error;
	});
});

