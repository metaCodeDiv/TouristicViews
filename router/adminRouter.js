const express = require('express')
const router = express.Router()

const adminController = require('../controller/adminController')



router.post('/removeUser',adminController.removeUser)
router.get('/fetchUsers',adminController.fetchUsers)
router.get('/removeAllUser',adminController.removeAllUser)

// category router 
router.post('/addCategory',adminController.addCategory)
router.get('/fetchAllCategorys',adminController.fetchAllCategorys)
router.get('/removeAllCategorys',adminController.removeAllCategorys)


module.exports = router;