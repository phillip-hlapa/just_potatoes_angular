const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../utils/App-Constants')

const  loggingFile = mongoose.Schema({
    filename: { type: String, require: true },
    file_extension: {type: String, require: true}
})

module.exports = mongoose.model('FILE', loggingSchema);