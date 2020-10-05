// Javascript Pub/Sub - v1.0.0 - 2015-02-14
// Inspired by Pluralsight: Javascript Design Patterns
// Thanks - Don Payne
//********************************************************************
(function ($, undefined) 
{
	var o = {};

	var init = function (topic)
	{
		// Initialize the topic
		o[topic] = 
		{
			methods : [],
			args    : []
		};
	};

	$.publish = function (topic) 
	{
		var args = Array.prototype.slice.call(arguments, 1);

		if (o[topic] === undefined) 
			init(topic);

		// Add any passed arguments
		o[topic].args.push(args);

		// Execute all stored methods
		$.each(o[topic].methods, function (i, fn)
		{
			fn.apply(null, args);
		});
	};

	$.subscribe = function (topic, fn) 
	{
		if (o[topic] === undefined)
			init(topic); 

		// Add the specified Method
		o[topic].methods.push(fn);

		// // Handle late-bound subscribers to receive pre-published topics
		// $.each(o[topic].args, function (i, arg)
		// {
		// 	fn.apply(null, arg);
		// });
	};

	$.unsubscribe = function (topic, fn) 
	{
		if (o[topic] === undefined)  
			return;

		// Remove all methods
		if (fn === undefined) 
		{
			init(topic);
		}

		// Remove the specified method
		else 
		{
			var i = o[topic].methods.indexOf(fn);

			if (i > -1) 
			{
				o[topic].methods = o[topic].methods.splice(i, 1);
			}
		}
	};

}(jQuery));