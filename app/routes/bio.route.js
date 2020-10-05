
// Router
var express = require('express'),
	router  = express.Router(),
	ctrl    = require('../controllers/bio.controller');

// GET
router.get('/', ctrl.default);

// etc...

module.exports = router;