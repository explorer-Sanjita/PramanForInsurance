const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');
const {protect} = require("../middleware/auth");

router.post('/coverage/:claimId', insuranceController.generateCoverage);
router.post('/uploadToIPFS',protect,insuranceController.pinFileToIPFS)
module.exports = router;
