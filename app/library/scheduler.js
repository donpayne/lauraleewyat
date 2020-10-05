
// Scheduler
module.exports = function (_title, _start, _freq, _callback)
{
	// Bind to the global object
	var _this = this;

	// Set Timer
	var now  = new Date();
	var time = _start.getTime() - now.getTime();
	time = (time > 0)? time : 0;

	// Set Interval Object
	var interval;

	this.initializeInterval = function ()
	{
		// Log the Starting occurrence
		console.log('Executing scheduled callback...' + _title + ' ' + new Date());
		_callback();

		// Log all future occurrences based on the specified frequency
		interval = setInterval(function () 
		{
			console.log('Executing scheduled callback...' + _title + ' ' + new Date());
			_callback(); 
		}, _freq);
	};

	// Public methods
	this.methods = 
	{
		start : function ()
		{
			console.log('Starting scheduler...' + _title);
			setTimeout(_this.initializeInterval, time);
		},
		stop : function ()
		{
			console.log('Stopping scheduler...' + _title);
			clearInterval(interval);
		}
	};

	return this.methods;
};