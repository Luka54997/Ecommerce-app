const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const productRoutes = require('./routes/product')
const cors = require('cors')

mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true,
     useUnifiedTopology: true,
    useCreateIndex: true}
  )
  .then(() => console.log('DB Connected'))
  
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

/*app.get('/',(req,res) => {
  res.send(uuidv1.v1())    


})*/
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)




const port = process.env.PORT || 8000

app.listen(port,() => {
    console.log(`Server running on port ${port}`)
})