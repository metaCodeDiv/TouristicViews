
const user = require('./../models/users')
const image = require('./../models/image')


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