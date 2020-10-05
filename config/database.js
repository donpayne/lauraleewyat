
// Mongoose Connection
var mongoose = require('mongoose');

// Configure conenction URL (only needs to happen once per app)
module.exports = function ()
{
	var db = mongoose.connect('mongodb://localhost:27017/lauraleewyatt');
	require('../app/models/art');

	return db;
};