const mongoose = require('mongoose');
const config = require('./server/db.config');
const modules = require('./module');

mongoose.connect(config.url);