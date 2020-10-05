
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
				_.each(model.art, function (art)
				{
					var title = art.name.toUpperCase() + ', ' + art.size + ' (' + art.status + ')';
					$gallery.append('<a class="fancybox" rel="gallery1" href="' + art.src + '" title="' + title + '">' + 
										'<img src="' + art.src + '" alt="' + title + '">' + 
									'</a>');
				});

				(function () 
				{
					$.fancybox.transitions.resizeIn = function() 
					{
						var previous = $.fancybox.previous,
							current  = $.fancybox.current,
							startPos = previous.wrap.stop(true).position(),
							endPos   = $.extend({opacity : 1}, current.pos);

						startPos.width  = previous.wrap.width();
						startPos.height = previous.wrap.height();

						previous.wrap.stop(true).trigger('onReset').remove();

						delete endPos.position;

						current.inner.hide();

						current.wrap.css(startPos).animate(endPos, 
						{
							duration : current.nextSpeed,
							easing   : current.nextEasing,
							step     : $.fancybox.transitions.step,
							complete : function() 
							{
								$.fancybox._afterZoomIn();

								current.inner.fadeIn("fast");
							}
						});
					};
				})();

				$gallery.each(function (i, el) 
				{
					$(el).justifiedGallery(
					{
						rowHeight: 240,
						margins: 20,
						border: 0,
						captions: true
					}).on('jg.complete', function() 
					{
						$(this).find('a.fancybox').fancybox(
						{
							padding			: 4,
							openSpeed		: 600, 
							closeSpeed		: 300, 
							nextMethod      : 'resizeIn',
							nextSpeed       : 600,
							helpers         : 
							{
								title: 
								{
									type: 'outside'
								},
								overlay : 
								{
									css : 
									{
										'background' : 'rgba(0, 0, 0, 0.8)'
									}
								}
							}
						});
					});
				});
			};
		}
	};

	app.init();

});