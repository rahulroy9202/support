/*
 * InboundRoute
 * @description :: Server-side logic for defining inbound routes
 */

var express = require('express');
var router = express.Router();

var inboundController = require('../controllers/InboundController');

//list all inbounds sorted by time.
router.get('/list/', inboundController.list);

//create new inbound
router.post('/create/', inboundController.create);




module.exports = router;
