const user = require('./../models/users')
const category = require('./../models/category')


exports.fetchUsers = (req, res) => {

    console.log('hello')
    user.find({}, (error, data) => {
        if (!error)
            res.status(200).json({
                data
            })
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


exports.removeAllUser = (req, res) => {
    user.deleteMany({}, (err, data) => {
        if (!err) {
            res.status(200).json({
                data: {
                    code: 1,
                    msg: 'delete all users has been successfully done '
                }
            })
        }
        else {
            res.status(404).json({
                data: {
                    code: -1,
                    msg: `the error is ${err}`
                }
            })
        }
    })
}


// category controller 

exports.addCategory = (req, res) => {
    const { name, description } = req.body

    const newCategory = new category({
        name,
        description
    })
    const data = newCategory;
    newCategory.save((err) => {
        if (err) {
            if (err.code == 11000)
                res.status(404).json({
                    data: {
                        code: err.code,
                        msg: 'the category is already existed',
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
                    msg: 'category adding has been successfully done '
                }
            })
        }
    })
}

exports.fetchAllCategorys = (req, res) => {
    category.find({}, (error, data) => {
        if (!error)
            res.status(200).json({
                data
            })
    })
}

exports.removeAllCategorys = (req, res) => {
    category.deleteMany({}, (err, data) => {
        if (!err) {
            res.status(200).json({
                data: {
                    code: 1,
                    msg: 'delete all categorys has been successfully done '
                }
            })
        }
        else {
            res.status(404).json({
                data: {
                    code: -1,
                    msg: `the error is ${err}`
                }
            })
        }
    })
}