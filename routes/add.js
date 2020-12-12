const {Router} = require('express')
const auth=require('../middleware/auth')
const router = Router()
const {courseValidators}=require('../utils/validators')
const programmController=require('../controllers/programs')


router.get('/', auth,programmController.getAddProgram)

router.post('/',auth, courseValidators,programmController.postAddProgram)

module.exports = router