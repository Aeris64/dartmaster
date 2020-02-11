const db = require('sqlite');

db.open('./db/dartMaster.db');

exports.db = db;