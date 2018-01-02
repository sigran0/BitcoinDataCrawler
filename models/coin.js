
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let coinSchema = new Schema({
    category: String,
    timestamp: { type : Date, default: Date.now },
    last: Number,
    bid: Number,
    ask: Number,
    low: Number,
    high: Number,
    volume: Number,
    change: Number,
    changePercent: Number
});

module.exports = mongoose.model('coin', coinSchema);