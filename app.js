
// Module Dependencies
var express        = require('express'),
	jade           = require('jade'),
	bodyParser     = require('body-parser'),
	busboy         = require('connect-busboy'),
	favicon        = require('serve-favicon'),
	morgan         = require('morgan'),
	methodOverride = require('method-override'),
	errorHandler   = require('errorhandler'),
	nodemailer     = require('nodemailer'),
	sgTransport    = require('nodemailer-sendgrid-transport'),
	btoa           = require('btoa'),
	atob           = require('atob'),
	http           = require('http'),
	path           = require('path'),
	_              = require('underscore'),
	q              = require('q');

// Env Variables
require('dotenv').load();

// Database
var db  = require('./config/database')();

// Models
var Art = db.model('Art');

// Application
var app = express();

app.set('port', process.env.PORT || 3001);
app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(morgan('dev'));                                // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())                             // parse application/json
app.use(busboy());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next)                      // Expose DB to Routes
{
    req.db = db;
    next();
});

// Routing
require('./config/routing')(app);

// Server
var server = http.createServer(app).listen(app.get('port'), function ()
{
	console.log("Express server listening on port " + app.get('port'));
});

// Socket.io
var io = require('socket.io').listen(server);

// Socket.io Connection
io.sockets.on('connection', function (socket) 
{
	// Load Art
	Art.find({}, function (err, art)
	{
		if (err) throw err;
		socket.emit('initialize-art', art);
	});

	socket.on('update-art', function (art)
	{
		Art.findOneAndUpdate({ _id: art._id }, { $set: art }, function (err, artwork)
		{
			if (err) throw err;
			artwork.save(function (err) { if (err) throw err; });
		});
	});

	socket.emit('initialize-calendar',
	{
		googleCalendarApiKey: 'AIzaSyB5P40vp5OcLyRhraVM1appEk6gX-f8HWA',
		eventSources: 
		[
			{
				googleCalendarId: '06sl5a3mppmadfqof8d2hmneak@group.calendar.google.com'
			},
			{
				googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com'
			}
		]
	});

	socket.on('contact-email', function (email)
	{
		var mailer = nodemailer.createTransport(sgTransport(
		{
			auth: { api_key: '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' }
		}));

		var mail = 
		{
			from    : email.address,
			to      : 'whimsiness@gmail.com',
			subject : 'New message from LauraLeeWyatt.com',
			text    : 'Let\'s get together for coffee.' + '\n\n' + email.name + '\n' + email.address + '\n' + email.phone + '\n\n' + email.message
		};

		mailer.sendMail(mail, function (err, res) 
		{
			if (err) throw err;
			console.log(res);
		});
	});

});