// Import modul
const db = require('sqlite');

// Import file
const config = require('../config.json');

db.open(config.path);

exports.db = db;