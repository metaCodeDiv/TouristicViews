const user = require('./../models/users')
const category = require('./../models/category')
const image = require('./../models/image')

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


exports.removeAllImages = (req, res) => {
    image.deleteMany({}, (err, data) => {
        if (!err) {
            res.status(200).json({
                data: {
                    code: 1,
                    msg: 'delete all images has been successfully done '
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

exports.removeCategory = (req, res) => {
    category.remove({
        _id: id
    }, (error, data) => {

    })
}


exports.accept = (req, res) => {
    const { id } = req.body

    image.updateOne({
        _id: id
    }, {
        isAccept: 1
        
    }, (error, docs) => {
        if (!error)
            res.status(200).json({
                code: 1,
                msg: 'accept image updating has been successfully '
            })
        else
            res.status(200).json({
                code: -1,
                msg: 'accept image updating has been successfully '
            })
    })
}

exports.decline = (req, res) => {
    const { id } = req.body

    image.remove({
        _id: id
    }, (error, data) => {
        if (!error)
            res.status(200).json({
                code: 1,
                msg: 'decling image update has been successfully'
            })
        else
            res.status(200).json({
                code: 0,
                msg: 'decling image update has been successfully'
            })
    })
}
