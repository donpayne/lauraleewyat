
'use strict';

$(function ()
{
	// Client side socket.io
	var socket = io.connect('http://www.lauraleewyatt.com');
	var model  = {};
	var view   = {};
	var api    = {};

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
			socket.on('initialize-calendar', function (obj)
			{
				api = obj;
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
			view.loadcontent = function (data)
			{
				$('#calendar').fullCalendar(
				{
					googleCalendarApiKey: api.googleCalendarApiKey,

					eventSources: api.eventSources,
					
					eventClick: function (event) 
					{
						// opens events in a popup window
						window.open(event.url, 'gcalevent', 'width=700, height=600');
						return false;
					},
					
					loading: function (bool) 
					{
						$('#loading').toggle(bool);
					}	
				});
			};
		}
	};

	app.init();

});