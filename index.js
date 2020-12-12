const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash=require('connect-flash')
const Handlebars = require('handlebars')
const mongoose= require('mongoose');
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const ordersRoutes= require('./routes/orders')
const app = express()
const authRoutes = require('./routes/auth')
const varMiddleware=require('./middleware/variable')
const userMiddleware= require('./middleware/user')
const keys = require('./keys')
const errorHandler=require('./middleware/error')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers:require('./utils/hbs-helpers')
  })
  const store = new MongoStore({
    collection:'sessions',
     uri: keys.MONGODB_URI
  })

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth',authRoutes)

app.use(errorHandler)

mongoose.set('useFindAndModify', false);

const PORT = process.env.PORT || 3000

async function start(){
  try {
    
    await mongoose.connect(keys.MONGODB_URI,{useUnifiedTopology: true , useNewUrlParser: true})
    app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`)
   })
  } catch (e) {
    console.log(e)
  }
 
}
start();
