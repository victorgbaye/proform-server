require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//CONNECTDB
const connectDB = require('./db/connect')


//Router
const authRouter = require('./routes/authRoutes')
const formRouter = require('./routes/formRoutes')
const questionRouter = require('./routes/formQuestionRoutes')

//Middleware
const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'));
app.use(fileUpload());

// app.get('/', (req, res)=>{
//     res.send('proform-api')
// })
app.get('/api/v1', (req, res)=>{
    console.log(req.signedCookies);
    res.send('proform-api')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/forms', formRouter)
app.use('/api/v1/forms/:formId/questions', questionRouter)


app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 5000

const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error);
    }
}
start()