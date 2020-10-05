// Dependencies
var fs = require('fs');

// Routing
module.exports = function ()
{
	var lib    = {};
	var folder = './app/library';

	fs.readdir(folder, function (err, files)
	{
		if (err) return;

		files.forEach(function (file)
		{
			var method = (file.split('.'))[0];
			lib[method] = require('.' + folder + '/' + file);
		});
	});

	return lib;
};