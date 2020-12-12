const {Router} = require('express')
const router = Router()
const userController=require('../controllers/users')
const {registerValidators}= require('../utils/validators')


router.get('/login', userController.getLogin)

router.get('/logout', userController.getLogout)

router.post('/login', userController.postLogin)

router.post('/register', registerValidators, userController.postRegister)

module.exports = router