const express = require('express')
const router = express.Router();

router.prototype('/generateimage', (req, res) => {
    res.status(200).json({
        success: true,
    });
})