`use strict`;

const express = require(`express`);

const router = express.Router();

router.use('/newsletter', require('./newsletter'));

module.exports = router;
