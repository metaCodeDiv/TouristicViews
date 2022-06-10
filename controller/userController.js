const e = require('cors')
const user = require('./../models/users')

exports.fetchUsers = (req, res) => {

    user.find({}, (error, data) => {
        if (!error)
            res.status(200).json({
                data
            })
    })
}


exports.createAccount = (req, res) => {
    const { username, password } = req.body

    const data = new user({
        username,
        password
    })
    data.save((err) => {
        if (err)
            res.status(404).json({
                data: {
                    code: err.code,
                    msg: 'the username is already existed',
                }
            })
        else
            res.status(200).json({
                data: {
                    ...data._doc,
                    code: 1,
                    msg: 'sign up has been successfully done '
                }
            })
    })

}

exports.login = (req, res) => {
    const { username, password } = req.body


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


exports.removeUser = (req, res) => {


    const { id } = req.body

    user.remove({
        _id: id
    }, (error, data) => {
        if (error)
            res.status(404).json({
                data: {
                    code: -1,
                    msg: 'ther are error ' + error
                }
            })
        else
            if (!data.deletedCount == 0) {
                res.status(200).json({
                    data: {
                        code: 1,
                        msg: 'user removing is has been successfully done ',
                    }

                })
            }
            else {
                res.status(200).json({
                    data: {
                        code: 11000,
                        msg: `there is no user has ${id} in database `,

                    }
                })
            }
    })
}


exports.uploadImage = (req, res) => {
    var fs = require('fs');
    var path = require('path');

    
}