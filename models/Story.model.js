const { Schema, model } = require("mongoose");

const storySchema = new Schema({
  picture: {
    type: String,
    required: true,
  },
  viewed:{
    type: Boolean,
    default: false,
  },
  Author:{
    type:String,
    required: true,
  }
},
{timestamps:true});

const Story = model('Story', storySchema)

module.exports = Story;


