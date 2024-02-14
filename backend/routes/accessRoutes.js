const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');

router.post('/submitDocument', accessController.submitDocument);
router.get('/getSubmittedDocument/:claimId', accessController.getAccessLogs);
module.exports = router;
