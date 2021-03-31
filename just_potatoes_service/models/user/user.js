const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var APP_CONSTANTS = require('../../utils/App-Constants')

const  userSchema = mongoose.Schema({
    username: { type: String, require: true },
    password: {type: String, require: true},
    contact: {
        email: {
            type: String, require: true,
            default: "NOT PROVIDED YET"
        },
        cell_number: {
            type: Number, require: true,
            default: "0123456789"
        },
    },
    address: { 
        street_name: {
            type: String,
            require: false,
            default: "NOT PROVIDED YET"
        },
        house_number: {
            type: String, require: false,
            default: "NOT PROVIDED YET"
        },
        zone: {
            type: String, require: false, default: 'ZONE 4'
        },
    },
    expireAt: {type: Date, default: Date.now, index: {expires: APP_CONSTANTS.USER_EXPIRE_AT}},
    role: { type: String, required: false, default: 'NORMAL' }
})



module.exports = mongoose.model('User', userSchema);