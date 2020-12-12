const {Router}= require('express');
const auth=require('../middleware/auth')
const ordersControllers=require('../controllers/orders')
const router= Router()

router.get('/', auth,ordersControllers.getorders)

router.post('/',auth, ordersControllers.postOrders )

module.exports = router
