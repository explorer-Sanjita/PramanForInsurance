const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {protect} = require("../middleware/auth");

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile',protect,userController.profile)
router.put('/update',protect,userController.update)
router.get('/getUserDetailsById',protect,userController.getUserDetailsById)
router.get('/getAllInsuranceUser',userController.getAllInsuranceFirmUsers)
module.exports = router;
