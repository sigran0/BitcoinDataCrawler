
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        result: false,
        data: "Home"
    });
});

module.exports = router;
