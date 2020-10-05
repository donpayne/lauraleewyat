
// Modules
var express = require('express'),
	router  = express.Router(),
	ctrl    = require('../controllers/index.controller');

// GET
router.get('/', ctrl.default);

// etc...

module.exports = router;