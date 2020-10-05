
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
				_.each(art, function (val)
				{
					model.art[val._id] = val;
				});
				model.status.art = true;

				if (model.isLoaded())
					view.loadcontent();
			});
		},

		subscriptions : function ()
		{
			$('body')
				.on('click', '.load-list li', function ()
				{
					var $this = $(this);
					$this.addClass('active').siblings().removeClass('active');

					// Set form values
					var art = model.art[$this.attr('data-id')];
					$('#name').val(art.name);
					$('#caption').val(art.caption);
					$('#size').val(art.size);
					$('#status').val(art.status);

					// Enable Save button
					$('.btn-save').removeAttr('disabled');
				})
				.on('click', '.load-form .btn-save', function ()
				{
					var $item = $('.load-list li.active');
					var	id    = $item.attr('data-id');

					$('.load-form input.form-control').each(function ()
					{
						var $input = $(this);
						var fld    = $input.attr('id');
						model.art[id][fld] = $input.val();
					});

					var art   = model.art[id];
					var title = art.name.toUpperCase() + ', ' + art.size + ' (' + art.status + ')';
					$item.html(title);

					socket.emit('update-art', model.art[id]);
				});
		},

		model : function ()
		{
			model.art    = {};
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
				var $list = $('.load-list ul');
				_.each(model.art, function (art)
				{
					var title = art.name.toUpperCase() + ', ' + art.size + ' (' + art.status + ')';
					$list.append('<li data-id="' + art._id + '">' + title + '</li>');
				});

				Dropzone.autoDiscover = true;
				Dropzone.options.fbDropZone = 
				{
					paramName: "file",
					url: '/loader',
					maxFilesize: 5,
					maxFiles: 1,
					thumbnailWidth: 80,
					thumbnailHeight: 80,
					accept: function (file, done) 
					{
						done();
					},
					init: function () 
					{
						this.on('maxfilesexceeded', function (file)
						{
							alert('No more files please!');
						});
					}
				};
			};
		}
	};

	app.init();

});