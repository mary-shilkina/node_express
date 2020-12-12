const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
  try{
    res.render('index', {
      title: 'Главная страница',
      isHome: true,
      userId:req.user ? req.user._id.toString():null
    })
  }catch{
    console.log(e)
  }
 
  
})


module.exports = router