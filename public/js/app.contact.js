
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
			app.subscriptions();
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

		subscriptions : function ()
		{
			$('form')
				.on('click', '#submit', function ()
				{
					var $form = $('.contact-form form');
					var email = {};
					var ready = true;

					$form.find('input, textarea, select').each(function ()
					{
						var $fld = $(this);
						email[$fld.attr('name')] = $fld.val();

						if ($fld.val() === '')
						{ 
							$fld.parents('.form-group').addClass('has-error');
							ready = false;
						}
					});

					if (ready)
					{
						socket.emit('contact-email', email);
						$form.find('.form-group').removeClass('has-error').find('input, textarea, select').val('');
						$('#thankyou').modal('show');
					}
					else
					{
						$form.find('.form-group.has-error').focus();
					}
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
				// Nothing to Load
			};
		}
	};

	app.init();

});