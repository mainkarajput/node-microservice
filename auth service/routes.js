const router = require('express').Router()
const controller = require('./controller/controller')

router.post('/login', controller.login)
router.post('/register', controller.register)

module.exports = router 