// The MongoDB connection is opened once in app.js (with retries) and shared by mongoose and the
// session store. This module is kept so existing require('../db/conn') calls still work.
const mongoose = require('mongoose');

module.exports = mongoose.connection;
