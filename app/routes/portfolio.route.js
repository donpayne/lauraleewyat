
// Router
var express = require('express'),
	router  = express.Router(),
	ctrl    = require('../controllers/portfolio.controller');

// GET
router.get('/', ctrl.default);

// etc...

module.exports = router;