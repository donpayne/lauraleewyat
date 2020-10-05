
// Router
var express = require('express'),
	router  = express.Router(),
	ctrl    = require('../controllers/contact.controller');

// GET
router.get('/', ctrl.default);

// etc...

module.exports = router;