
// Controller
var title    = 'Bio',
	template = 'bio',
	basepath = '/bio';

module.exports.default = function (req, res, next)
{
	console.log("Redirect if already logged in");
	res.render(template, { title: title, basepath: basepath });
};