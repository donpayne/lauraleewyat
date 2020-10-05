
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
			view.loadcontent();
		},

		sockets : function ()
		{
			// socket.on('initialize-art', function (art)
			// {
			// 	model.art = art;
			// 	model.status.art = true;

			// 	if (model.isLoaded())
			// 		view.loadcontent();
			// });
		},

		model : function ()
		{
			// model.art    = [];
			// model.status = 
			// {
			// 	art: false
			// };
			// model.isLoaded = function ()
			// {
			// 	var state = true;
			// 	_.each(model.status, function (loaded)
			// 	{
			// 		if (!loaded) { state = false; }
			// 	});
			// 	return state;
			// };
		},

		view : function ()
		{
			view.loadcontent = function ()
			{
				$('.carousel')
					.find('.item:first').addClass('active').end()
					.carousel({
						interval: 3000
					});

				$('.main .content').html(
					'<p>' + 
					'“A painter told me that nobody could draw a tree without in some sort becoming a tree; ' + 
					'or draw a child by studying the outlines of its form merely . . . ' + 
					'but by watching for a time his motions and plays, ' + 
					'the painter enters into his nature and can then draw him at every attitude . . .”' + 
					'</p>' + 
					' — Ralph Waldo Emerson'
				);
			};
		}
	};

	app.init();

});