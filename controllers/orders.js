const Order= require('../models/order')


exports.getorders=async(req,res)=>{
    try {
        const orders = await Order.find({'user.userId': req.user._id})
        .populate('user.userId')

        res.render('orders',{
            isOrder:true,
            title:'Заказы',
            orders:orders.map(e=>{
                return {
                    ...e._doc,
                    price:e.courses.reduce((total,c)=>{
                   return total += c.count * c.course.price
                    },0)
                }
            })
        })
    } catch (error) {
        console/log(error)
    }
    
}

exports.postOrders=async(req,res)=>{
    try {
        const user = await req.user
    .populate('card.items.courseId')
    .execPopulate()

    const courses = user.card.items.map(i=>({
count: i.count,
course:{...i.courseId._doc}
    }
    ))
    const order= new Order({
        user:{
            name:req.user.name,
            userId:req.user
        },
        courses:courses
    })
     await order.save()
     await req.user.clearCard()
    res.redirect('/orders')
    } catch (error) {
        console.log(error)
    }
    
}