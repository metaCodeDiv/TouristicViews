const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const categoryScheam=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique : true
    },
    image:{
        type:String
    }
})

autoIncrement.initialize(mongoose.connection);
categoryScheam.plugin(autoIncrement.plugin, 'id');
module.exports = mongoose.model('category',categoryScheam)