const {Router} = require('express')
const auth = require('../middleware/auth')
const router = Router()
const cartController=require('../controllers/cart')


router.post('/add', auth, cartController.postAddtoCart)

router.delete('/remove/:id',auth, cartController.deletefromCart)

router.get('/', auth, cartController.getCart)

module.exports = router