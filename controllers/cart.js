const Course = require('../models/course')


function mapCardItems(card) {
  return card.items.map(c => ({
    ...c.courseId._doc, 
    id: c.courseId.id,
    count: c.count
  }))
}

function price(courses) {
  return courses.reduce((total, course) => {
    return total += course.price * course.count
  }, 0)
}


exports.postAddtoCart= async (req, res) => {
    const course = await Course.findById(req.body.id)
    await req.user.addToCard(course)
    res.redirect('/card')
  }


exports.deletefromCart=async (req, res) => {
  await req.user.removeFromCard(req.params.id)
  const user = await req.user.populate('card.items.courseId').execPopulate()
  const courses = mapCardItems(user.card)
  const card = {
    courses, price: price(courses)
  }
  res.status(200).json(card)
}

exports.getCart=async (req, res) => {
  const user = await req.user
    .populate('card.items.courseId')
    .execPopulate()

  const courses = mapCardItems(user.card)

  res.render('card', {
    title: 'Корзина',
    isCard: true,
    courses: courses,
    price: price(courses)
  })
}