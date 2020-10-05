
'use strict';

var model = {};
var view  = {};

$(function ()
{
	// Client side socket.io
	var socket = io.connect('http://www.lauraleewyatt.com');

	var app = 
	{
		init : function ()
		{
			app.model();
			app.view();
			app.sockets();
		},

		sockets : function ()
		{
			socket.on('initialize-art', function (art)
			{
				model.art = art;
				model.status.art = true;

				if (model.isLoaded())
					view.loadcontent();
			});
		},

		model : function ()
		{
			model.art    = [];
			model.status = 
			{
				art: false
			};
			model.isLoaded = function ()
			{
				var state = true;
				_.each(model.status, function (loaded)
				{
					if (!loaded) { state = false; }
				});
				return state;
			};
		},

		view : function ()
		{
			view.loadcontent = function ()
			{
				var $gallery = $('.main .content');
				$gallery.html('This page will be completed soon.');
			};
		}
	};

	app.init();

});