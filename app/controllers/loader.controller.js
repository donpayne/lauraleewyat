
// Controller
var fs       = require('fs'),
	busboy   = require('connect-busboy'),
	title    = 'Image Loader',
	template = 'loader',
	basepath = '/loader';

module.exports.get = function (req, res, next)
{
	console.log("Redirect if already logged in");
	res.render(template, { title: title, basepath: basepath });
};

module.exports.post = function (req, res, next)
{
	console.log('request:');

	var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) 
    {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream('./public/tmp/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () 
        {
            res.redirect('back');
        });
    });
};