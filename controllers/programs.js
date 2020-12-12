const Course = require('../models/course')
const {validationResult}=require('express-validator')
const {courseValidators}=require('../utils/validators')
const e = require('express')


function isOwner(course,req){
  return  course.userId.toString()===req.user._id.toString()
}

exports.getAddProgram=(req, res) => {
    res.render('add', {
      title: 'Добавить новую программу',
      isAdd: true
    })
  }

exports.postAddProgram=async (req, res) => {

    const errors = validationResult(req)
  
    if (!errors.isEmpty()) {
      return res.status(422).render('add', {
        title: 'Добавить курс',
        isAdd: true,
        error: errors.array()[0].msg,
        data: {
          title: req.body.title,
          price: req.body.price,
          img: req.body.img,
           desc: req.body.desc,
           level:req.body.level,
           type:req.body.type
        }
      })
    }
  
  
    const course = new Course({
      title: req.body.title,
      price:  req.body.price,
      img:req.body.img,
      desc: req.body.desc,
      userId: req.user._id,
      level:req.body.level,
      type:req.body.type
     
    })
  
    try {
      await course.save()
      res.redirect('/courses')
    } catch (error) {
      console.log(error)
    }
    
  }

exports.getProgram=async (req, res) => {
    try{
      const courses = await Course.find()
      .populate('userId', 'email name')
      .select('price title img level')
  
      res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        userId:req.user ? req.user._id.toString():null,
        courses
      })
    }catch{
      console.log(e)
    }
   
  }

exports.getHardProgram=async (req, res) => {
  try{
    const courses = await Course.find({level:"Сложно"})
    .populate('userId', 'email name')
    .select('price title img level')

    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      userId:req.user ? req.user._id.toString():null,
      courses
    })
  }catch{
    console.log(e)
  }
 
}

exports.getmiddleProgram=async (req, res) => {
  try{
    const courses = await Course.find({level: "Средне"})
    .populate('userId', 'email name')
    .select('price title img level')

    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      userId:req.user ? req.user._id.toString():null,
      courses
    })
  }catch{
    console.log(e)
  }
 
}

exports.geteasyProgram=async (req, res) => {
  try{
    const courses = await Course.find({level:"Легко"})
    .populate('userId', 'email name')
    .select('price title img level')

    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      userId:req.user ? req.user._id.toString():null,
      courses
    })
  }catch{
    console.log(e)
  }
 
}

exports.getprogramEat=async (req, res) => {
  try{
    const courses = await Course.find({type:"питание"})
    .populate('userId', 'email name')
    .select('price title img level')

    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      userId:req.user ? req.user._id.toString():null,
      courses
    })
  }catch{
    console.log(e)
  }
 
}

exports.getprogramtrain=async (req, res) => {
  try{
    const courses = await Course.find({type:"тренировки"})
    .populate('userId', 'email name')
    .select('price title img level')

    res.render('courses', {
      title: 'Курсы',
      isCourses: true,
      userId:req.user ? req.user._id.toString():null,
      courses
    })
  }catch{
    console.log(e)
  }
 
}

exports.getprogramedit=async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
 

 try{
  const course = await Course.findById(req.params.id)
  if(!isOwner(course,req)){
   return res.redirect('/courses')
  }
  res.render('course-edit', {
    title: `Редактировать ${course.title}`,
    course
  })
 }catch(e){
 console.log(e)
 }
 
}

exports.postProgramedit=async (req, res) => {
  const errors = validationResult(req)
  const {id} = req.body

  if (!errors.isEmpty()) {
    return res.status(422).redirect('/courses/${id}/edit?allow=true')  }
   try {
    const {id} = req.body
    delete req.body.id
     const course= await Course.findById(id)
     if(!isOwner(course,req)){
       return res.redirect('/courses')
     }
    Object.assign(course, req.body)
    await course.save()
    res.redirect('/courses')
   } catch (error) {
     console.log(error)
   }
  
}

exports.getOneprogram=async (req, res) => {
  const course = await Course.findById(req.params.id)
  res.render('course', {
    layout: 'empty',
    title: `Курс ${course.title}`,
    course
  })
}

exports.postRemoveprogram=async (req, res)=>{
  try {
    await Course.deleteOne({
      _id:req.body.id
    }) 
    res.redirect('/courses')
  } catch (error) {
    console.log(error)
  }
}