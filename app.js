require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')

//CONNECTDB
const connectDB = require('./db/connect')


//Router
const authRouter = require('./routes/authRoutes')
const formRouter = require('./routes/formRoutes')

//Middleware
const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())


app.get('/', (req, res)=>{
    res.send('proform-api')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/vi/forms', formRouter)

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