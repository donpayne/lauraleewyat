// Dependencies
var fs = require('fs');

// Routing
module.exports = function (app)
{
	var folder = './app/routes';

	fs.readdir(folder, function (err, files)
	{
		if (err) return;

		files.forEach(function (file)
		{
			var name     = file.split('.');
			var route    = '/' + name[0];
			var resource = '.' + [folder, file].join('/');

			console.log('route: ' + route);

			app.use(route, require(resource));

			if (route === '/index')
			{
				app.use('/', require(resource));
				app.use(route + '.html', require(resource));
			}
		});

		addErrorHandlers(app);
	});
};

// Error Handler
function addErrorHandlers (app)
{
	// catch 404 and forward to error handler
	app.use(function(req, res, next)
	{
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// development error handler : will print stacktrace
	if (app.get('env') === 'development')
	{
		app.use(function(err, req, res, next)
		{
			res.status(err.status || 500);
			res.render('error',
			{
				message: err.message,
				error: err
			});
		});
	}

	// production error handler : no stacktraces leaked to user
	app.use(function(err, req, res, next)
	{
		res.status(err.status || 500);
		res.render('error',
		{
			message: err.message,
			error: {}
		});
	});
}