const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const {protect} = require("../middleware/auth");

router.post('/submit',  protect ,claimController.submitClaim);
// router.post('/policy',  protect ,claimController.submitClaim);

router.get('/', claimController.getClaims);
router.get('/getAllClaims', claimController.getAllClaims);
router.put('/updatePolicy',claimController.updateClaims)
router.get('/getAllClaimsByInsuranceId', protect,claimController.getAllClaimsByInsuranceId);
router.get('/getAllClaimsByClientId', protect,claimController.getAllClaimsByClientId);

module.exports = router;
