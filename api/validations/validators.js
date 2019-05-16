const { check } = require('express-validator/check')

exports.hasDesc = check('desc')
    .isLength({ min: 5 })
    .withMessage('Description is required. Min length 5 characters')