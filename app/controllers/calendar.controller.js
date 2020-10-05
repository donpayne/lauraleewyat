
// Controller
var title    = 'Show Calendar',
	template = 'calendar',
	basepath = '/calendar';

module.exports.default = function (req, res, next)
{
	console.log("Redirect if already logged in");
	res.render(template, { title: title, basepath: basepath });
};