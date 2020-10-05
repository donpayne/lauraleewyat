
//Index Controller
var title    = 'Home',
	template = 'index',
	basepath = '/index',
	_        = require('underscore');
	q        = require('q');

module.exports.default = function (req, res, next)
{
	console.log("Redirect if already logged in");
	var p = q.defer();

	// Load Art
	var artwork = [];
	
	var Art = req.db.model('Art');
	Art.find({}, function (err, data)
	{
		if (err) throw err;

		_.each(data, function (art)
		{
			artwork.push(art._doc);
		});
		p.resolve(artwork);
	});

	p.promise.then(function (artwork)
	{
		res.render(template, { title: title, basepath: basepath, artwork: artwork });
	});
};