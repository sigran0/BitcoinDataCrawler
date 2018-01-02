
const coinData = require('../models/coin');

exports.getCoinData = (category) => {
    return new Promise((resolved, rejected) => {
        coinData.find({
            category: category
        }).then((data) => {
            resolved(data);
        }).catch((err) => {
            console.log(err);
            rejected(err);
        });
    })
};

exports.saveCoinData = (category, data) => {
    return new Promise((resolved, rejected) => {
        let coin = new coinData();
        coin.category = category;
        coin.timestamp = data['timestamp'];
        coin.last = data['last'];
        coin.bid = data['bid'];
        coin.ask = data['ask'];
        coin.low = data['low'];
        coin.high = data['high'];
        coin.volume = data['volume'];
        coin.change = data['change'];
        coin.changePercent = data['changePercent'];

        coin.save().then((result) => {
            console.log(category + ' saved in your database');
            resolved(result);
        }).catch((err) => {
            console.log(err);
            rejected(err);
        });
    });
};