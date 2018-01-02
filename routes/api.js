
const express = require('express');
const router = express.Router();
const dbManager = require('../tools/dbManager');

router.get('/coin-data/:cointype', (req, res) => {
    let type = req.params.cointype || 'all';

    if(type === 'btc' || type === 'etc' || type === 'eth' || type === 'xrp' || type === 'bch'){
        dbManager.getCoinData(type).then((data) => {
            res.json({
                result: true,
                data: data
            });
        }).catch((err) => {
            res.json({
                result: false,
                data: null
            });
        });
    } else {
        res.json({
            result: false,
            data: null
        });
    }
});

module.exports = router;