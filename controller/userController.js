
const user = require('./../models/users')
const image = require('./../models/image')
const category = require('./../models/category')
const fs = require('fs')
exports.createAccount = (req, res) => {
    const { username, password } = req.body

    const data = new user({
        username,
        password
    })
    data.save((err) => {
        if (err) {
            if (err.code == 11000)
                res.status(404).json({
                    data: {
                        code: err.code,
                        msg: 'the username is already existed',
                    }
                })
            else {
                res.status(404).json({
                    data: {
                        code: -1,
                        msg: `there is error ${err}`,
                    }
                })
            }
        }
        else {
            res.status(200).json({
                data: {
                    ...data._doc,
                    code: 1,
                    msg: 'sign up has been successfully done '
                }
            })
        }
    })

}

exports.getImagesByCategory = (req, res) => {
    const { categoryID } = req.body

    image.find({
        categoryID
    }, (error, data) => {
        if (!error)
            res.status(200).json({
                data
            })
    })

    // category.aggregate([
    //     {
    //         $match: {
    //             _id: 12
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "images",
    //             localField: "_id",
    //             foreignField: "categoryID",
    //             as: "info",
    //             pipeline: [
    //                 {
    //                     $lookup: {
    //                         from: "users",
    //                         localField: "userID",
    //                         foreignField: "_id",
    //                         as: "data"
    //                     },

    //                 },
    //                 { $unwind: '$data' }
    //             ]
    //         },


    //     },
    //     // { $unwind: '$info' },
    //     // {
    //     //     $project: {
    //     //         info: {
    //     //             _id: 1,
    //     //             image: 1,
    //     //             likeCount: 1,
    //     //             uploadDate: 1,
    //     //             data: {
    //     //                 username: 1
    //     //             }
    //     //         }
    //     //     }
    //     // }

    // ]).exec((err, data) => {
    //     if (!err) {
    //         res.status(200).json({
    //             data
    //         })
    //     }

    //     else {
    //         res.json({
    //             error: err
    //         })
    //     }
    // })
    // qubt77100

    // {
    //     
    // }


}
exports.login = (req, res) => {
    const { username, password } = req.body
    console.log('there is some one is logined ')

    user.findOne({
        username,
        password
    }, (error, result) => {
        if (error)
            res.status(404).json({
                data: {
                    code: -1,
                    msg: 'there is an unexpected error '
                }
            })
        else {
            if (result) {
                res.status(200).json({
                    data: {
                        ...result._doc,
                        code: 1,
                        msg: 'login has been done successfully'
                    }
                })
            }
            else {
                res.status(200).json({
                    data: {
                        code: 0,
                        msg: 'incorrent username or password'
                    }
                })
            }
        }
    })
}




exports.uploadImage = (req, res) => {
    var fs = require('fs');
    var path = require('path');

    const { userID, categoryID } = req.body

    const data = new image({
        userID,
        categoryID
    })


    data.save((err) => {
        if (err) {
            res.status(404).json({
                data: {
                    code: -1,
                    msg: `there is error ${err}`,
                }
            })
        }
        else {
            res.status(200).json({
                data: {
                    ...data._doc,
                    code: 1,
                    msg: 'uploading image been successfully done '
                }
            })
        }
    })

}



exports.fetchAllCategoriesByURL=(req,res)=>{

}
exports.fetchAllCategories = (req, res) => {
    let data = []

    category.find({}, async (error, response) => {
        if (!error) {
            let count = response.length
            let i = 0
            console.log(count)
            response.map((item) => {
                fs.readFile(item.image, (er, dt) => {
                    data.push({
                        id: item._id,
                        img: dt,
                        name: item.name
                    })
                    i++;
                    console.log(i)
                    if (i === count) {
                        res.status(200).json({
                            data
                        })
                    }
                })
            })
        }
    })

}