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
    }
})

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'Counter');
const userModel = mongoose.model('user', userSchema);

module.exports = mongoose.model('user',userSchema)