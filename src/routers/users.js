const express = require('express')
const router = express.Router()
const controllersUser = require('../controllers/users')
const upload = require('../middlewares/multer')

router
    .get("/view", controllersUser.getUser)
    .post("/create", upload, controllersUser.createUser)
    .put("/edit/:id", upload, controllersUser.update)


module.exports = router;