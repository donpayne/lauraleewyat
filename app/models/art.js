
// Art Model
var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var schema = new Schema(
{
	'name'               : { type: String , default: ''       },
	'caption'            : { type: String , default: ''       },
	'src'                : { type: String , default: ''       },
	'likes'              : { type: Number , default: 0        },
	'created-date'       : { type: Date   , default: Date.now },
	'modified-date'      : { type: Date   , default: Date.now }
}, 
{ collection: 'art' });

// Expose out model as the module interface
mongoose.model('Art', schema, 'art');