const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const imageSchema = mongoose.Schema({
    image: {
        type:String
    },
    categoryID: {
        type: String,
    },
    username: {
        type: String
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
    },
    description:{
        type:String
    },
    title:{
        type:String
    }
})


autoIncrement.initialize(mongoose.connection);
imageSchema.plugin(autoIncrement.plugin, 'id');
module.exports = mongoose.model('image',imageSchema)