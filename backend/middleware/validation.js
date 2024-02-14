const expressValidator = require('express-validator');

exports.validateRegister = [
    expressValidator.check('name', 'Name is required').notEmpty(),
    expressValidator.check('email', 'Invalid email').isEmail(),
];

exports.validateLogin = [
    expressValidator.check('email', 'Invalid email').isEmail(),
    expressValidator.check('password', 'Password is required').notEmpty(),
];

