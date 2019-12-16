const mongoose = require('mongoose');

//schema for key_values collection in mongo DB
const keyValueStoreSchema = mongoose.Schema({
    key: { type: String },
    values: [{                      //array for storing multiple values for a given key
        _id:false,
        value: String,
        timestamp: Date
    }],
    created_at: { type: Date, default: new Date },
    updated_at: { type: Date, default: new Date },
    _v:false

});

module.exports = mongoose.model('key_values', keyValueStoreSchema);