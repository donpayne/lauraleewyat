
// Controller
var title    = 'Gallery Representation',
	template = 'gallery',
	basepath = '/gallery';

module.exports.default = function (req, res, next)
{
	console.log("Redirect if already logged in");
	res.render(template, { title: title, basepath: basepath });
};