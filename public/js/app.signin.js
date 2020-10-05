
'use strict';

$(function ()
{
	// Client side socket.io
	var socket = io.connect('http://lauraleewyatt.com');

	$('.form-signin').on('submit', function (e)
	{
		e.preventDefault();

		// Send credentials to the server
		socket.emit('signin', 
		{ 
			username: $('#username').val(), 
			password: $('#password').val() 
		});
	});

	socket.on('denied', function ()
	{
		alert('Invalid username or password.\n\nPlease try again.');
	});

	socket.on('authenticated', function ()
	{
		window.location = 'http://lauraleewyatt.com';
	});

});