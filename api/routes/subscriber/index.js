const express = require('express')
const subscriberController = require('../../controllers/subscriberController')
const router = express.Router()

router.all('/*', subscriberController.all)
router.get('/', subscriberController.index)

/* ----- */