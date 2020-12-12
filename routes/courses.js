const {Router} = require('express')
const auth=require('../middleware/auth')
const programController=require('../controllers/programs')
const router = Router()



router.get('/',programController.getProgram)

router.get('/hard',programController.getHardProgram)

router.get('/middle',programController.getmiddleProgram)

router.get('/easy', programController.geteasyProgram)

router.get('/p',programController.getprogramEat)

router.get('/t', programController.getprogramtrain)

router.get('/:id/edit', auth, programController.getprogramedit)

router.post('/edit', auth,programController.postProgramedit)

router.get('/:id', programController.getOneprogram)

router.post('/remove',auth,programController.postRemoveprogram)

/*router.post('/addcoment', async (req, res) => {
 
  const review = new Reviews({
    userId:req.user._id, 
    review:req.body.review, 
    date:req.body.date,
  })
  
  try {
    await review.save()
    const course = await Course.findById(req.body.id)
    course.updateReviewsData(req.body.review,req.body.id,req.user._id)
    await Course.updateReviewsData(req.body.review,req.body._id)
    res.redirect('/courses')
  } catch (error) {
    console.log(error)
  }
  
 
 
})*/
module.exports = router