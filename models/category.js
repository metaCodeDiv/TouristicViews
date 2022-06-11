const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const categoryScheam=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique : true
    },
    description:{
        type:String
    },
    createDate:{
        type:Date,
        default:Date.now,
        required:true
    }
})

autoIncrement.initialize(mongoose.connection);
categoryScheam.plugin(autoIncrement.plugin, 'id');
module.exports = mongoose.model('category',categoryScheam)