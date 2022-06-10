const express = require('express')
const router = express.Router()


const userController = require('../controller/userController')
router.post('/login', userController.login)
router.post('/createAccount', userController.createAccount)
router.post('/removeUser',userController.removeUser)
router.get('/fetchUsers',userController.fetchUsers)
router.post('/uploadImage',userController.uploadImage);
module.exports = router;