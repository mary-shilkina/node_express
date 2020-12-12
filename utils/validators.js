const {body}=require('express-validator')
const User= require('../models/user')

exports.registerValidators =[
    body('email').isEmail().withMessage('Некорректный email').custom( async (value,{req})=>{
try{
const user= await User.findOne({email:value})
if(user){
    return Promise.reject('Пользователь уже существует')
}
}catch(e){
    console.log(e)
}
    })
    .normalizeEmail(),
    body('password','Пароль должен содержать от 6 символов').isLength({min:6, max:24}).isAlphanumeric().trim(),
    body('confirm').custom((value,{req})=>{
        if(value !==req.body.password){
            throw new Error('Пароли должны совпадать')
        }
    return true
    })
    .trim(),
    body('number').isLength({min:11}).withMessage('Введите корректный телефон')
]

exports.courseValidators=[
    body('title').isLength({min:3}).withMessage('Минимальная длина названия 3 символа'),
    body('price').isNumeric(),
    body('img','Ввдеите корректный url картинки').isURL()

]
