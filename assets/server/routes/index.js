const express = require("express");
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/post', require('./postRoutes'));
router.use('/dbroutes', require('./dbRoutes'));

module.exports = router;