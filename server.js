const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()

const mongoose = require('mongoose')

// the mongodb connection
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@touristicviews.s2gun.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(connectionString).
    then(() => console.log('MongoDB connected...')).
    catch(err => console.log(err));



// to make the JSON is the format of transferring data with endpoint 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// to allow browser to send and recieve data from Javascript source
var cors = require('cors');
app.use(cors());




// imports the MVC component 
const userRouter = require('./router/userRouter')
const userModel = require('./models/users')


app.use('/user',userRouter);

app.get('/', (req, res) => {

    res.json('welcome')
})

app.post('/user/createAcount', (req, res) => {

    const { body } = req;
    console.log({req})

    res.json({
        data: body
    })
})


// start the server 
const server = http.createServer(app)
server.listen(process.env.PORT, (req, res) => {
    console.log(`the server is running on ${process.env.PORT} ports`)
})