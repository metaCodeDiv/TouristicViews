const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const imageSchema = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    categoryID: {
        type: Number,
        ref: 'categories'
    },
    userID: {
        type: Number,
        ref: 'users'
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    isAccept:{
        type:Number,
        default:0
    },
    likeCount:{
        type:Number,
        default:0
    }
})


autoIncrement.initialize(mongoose.connection);
imageSchema.plugin(autoIncrement.plugin, 'id');
module.exports = mongoose.model('image',imageSchema)