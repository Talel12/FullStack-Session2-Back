const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  picture: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  user:{
    type:String,
    required: true,
  }
},
{timestamps:true});

const Post = model('Post', postSchema)

module.exports = Post;


