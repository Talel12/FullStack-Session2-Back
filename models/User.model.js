const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password:{
    type: String,
   required: true,
   minLength:8
  },
  fullName: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:['user', 'admin'], 
    default: 'user',
  }

},
{timestamps:true});

const Story = model('User', userSchema)

module.exports = Story;


