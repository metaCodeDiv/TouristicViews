const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Buffer
    },
    createDate:{
        type:Date,
        default:Date.now,
        required:true
    }
})

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'id');

module.exports = mongoose.model('user',userSchema)