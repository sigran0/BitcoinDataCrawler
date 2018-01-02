
let request = require('request');
let dbManager = require('./dbManager');

/*
*   btc: https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=btc_krw
*   etc: https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=etc_krw
*   eth: https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=eth_krw
*   xrp: https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=xrp_krw
*   bch: https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=bch_krw
* */

let requestCoinData = (type) => {

    return new Promise((resolved, rejected) => {
        let url = `https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=${type}_krw`;

        request(url, (err, res, body) => {
            if(err)
                rejected(err);

            try{
                let json = JSON.parse(body);
                resolved(json);
            } catch(err) {
                rejected(err);
            }
        });
    });
};


let requestCoinDataChain = (callback) => {
    let result = {};
    requestCoinData('btc')
        .then((data) => {
            dbManager.saveCoinData('btc', data);
            result['coinBTC'] = data;
            return requestCoinData('etc');
        })
        .then((data) => {
            dbManager.saveCoinData('etc', data);
            result['coinETC'] = data;
            return requestCoinData('eth');
        })
        .then((data) => {
            dbManager.saveCoinData('eth', data);
            result['coinETH'] = data;
            return requestCoinData('xrp');
        })
        .then((data) => {
            dbManager.saveCoinData('xrp', data);
            result['coinXRP'] = data;
            return requestCoinData('bch');
        })
        .then((data) => {
            dbManager.saveCoinData('bch', data);
            result['coinBCH'] = data;
            callback(null, result);
        })
        .catch((err) => {
            console.log(err);
            callback(err, null);
        });
};

exports.updateData = () => {

    return new Promise((resolved, rejected) => {
        console.log('update called');

        requestCoinDataChain((err, data) => {
            if(err){
                console.log(err);
                rejected(err);
            }

            resolved(data);
        });
    });
};