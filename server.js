const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
const multer = require('multer')

// to can get to our application public

const ngrok = require('ngrok');

var image = require('./models/image')
var user = require('./models/users')
var category = require('./models/category')
const mongoose = require('mongoose')

var fs = require('fs');
var path = require('path');


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
const adminRouter = require('./router/adminRouter')
const userModel = require('./models/users');
const { lookup } = require('dns');


app.use('/user', userRouter);
app.use('/admin', adminRouter)

app.get('/', (req, res) => {

    user.find({}, (error, data) => {
        if (!error)
            res.status(200).json({
                data
            })
    })
   
})



// image uploading will be here 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'cacheImage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});

var upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), (req, res, next) => {
    console.log('hello')
    var obj = {
        userID: req.body.userID,
        categoryID: req.body.categoryID,
        image: {
            data: fs.readFileSync(path.join(__dirname + '/cacheImage/' + req.file.filename)),
            contentType: 'image/png'
        }
    }

    image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.status(200).json({
                code: 1,
                msg: 'Image uploading has been successfully done '
            })
        }
    });

})
app.get('/imageByIdCategory', (req, res) => {

    category.aggregate([
        {
            $match: {
                _id: 12
            }
        },
        {
            $lookup: {
                from: "images",
                localField: "_id",
                foreignField: "categoryID",
                as: "info",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "userID",
                            foreignField: "_id",
                            as: "data"
                        }
                    }
                ]
            }

        },
    ]).exec((err, data) => {
        if (!err) {
            res.status(200).json({
                data
            })
        }
    })


    // {
    //     
    // }
})
app.get('/populate', (req, res) => {

    image.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "info"
            }
        },
        {
            $unwind: '$info'
        }, {
            $project: {
                _id: 1,
                createDate: 1,
                info: {
                    username: 1,
                }
            }
        }
    ]).exec((err, data) => {
        if (!err) {
            res.json({
                data
            })
        }
    })
})
app.get('/getImage', (req, res) => {
    image.find({}, {
        image: 1
    }, (err, item) => {
        if (!err)
            res.status(200).json({
                data: {
                    item
                }
            })
    })
})



// start the server 
const server = http.createServer(app)
server.listen(process.env.PORT||3000, (req, res) => {
    
    
    console.log(`the server is running on ${process.env.PORT} ports`)

    

})