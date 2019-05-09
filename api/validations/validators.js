const { body } = require('express-validator/check')

exports.hasDesc = body('desc')
    .isLength({ min: 5 })
    .withMessage('Name is required. Min length 5 characters')