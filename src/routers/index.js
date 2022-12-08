const express = require('express')
const router = express.Router()

const dataDiri = require('../controllers/users')

router
    .get("/view", dataDiri)


module.exports = router;