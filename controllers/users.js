const User = require('../models/user')
const bcrypt=require('bcryptjs')
const {validationResult}= require('express-validator')


exports.getLogin=async (req, res) => {
    res.render('auth/login', {
      title: 'Авторизация',
      isLogin: true,
      loginError:req.flash('loginError'),
      registerError:req.flash('registerError')
    })
  }

exports.getLogout= async (req, res) => {
    req.session.destroy(() => {
      res.redirect('/auth/login#login')
    })
  }

exports.postLogin=async (req, res) => {
    try{
      const{email,password}= req.body
       const candidate = await User.findOne({email})
  
       if(candidate){
         const areSame = await bcrypt.compare(password,candidate.password)
         if(areSame){ 
          req.session.user =candidate
          req.session.isAuthenticated = true
          req.session.save(err=>{
            if(err){
              throw err
            }
            res.redirect('/')
          })
         }else{
          req.flash('loginError','Неверный пароль')
          res.redirect('/auth/login#login')
         }
       }else{
         req.flash('loginError','Такого пользователя нет')
         res.redirect('/auth/login#login')
       }
    }catch(e){
      console.log(e)
    }
  }


exports.postRegister=async (req, res) => {
    try {
      const {email,number,password, name} = req.body
    
      const errors =validationResult(req)
      if(!errors.isEmpty()){
        req.flash('registerError', errors.array()[0].msg)
        return res.status(422).redirect('/auth/login#register')
      }
        const hashPassword = await bcrypt.hash(password,10)
        const user = new User({
          email, name,number, password: hashPassword, card: {items: []}
        })
        await user.save()
        res.redirect('/auth/login#login')
      }
     catch (e) {
      console.log(e)
    }
  }