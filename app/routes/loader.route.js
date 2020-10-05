
// Router
var express = require('express'),
	router  = express.Router(),
	ctrl    = require('../controllers/loader.controller');

// GET
router.get('/', ctrl.get);

// POST
router.post('/', ctrl.post);

// etc...

module.exports = router;