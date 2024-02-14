const mongoose = require('mongoose')


const questionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionText: {
      type: String,
      required: true,
      // maxLength: 
    },
    questionType: {
      type: String,
      enum: ['multi-select', 'single choice select', 'small text area', 'large text area', 'contact info', 'calendar', 'link', 'Rating', 'file upload'],
      required: true,
    },
    required: {
      type: Boolean,
      default: false
  },
    options: [{ type: String }],
  });

const FormSchema = new mongoose.Schema({
    title:{
        type:String,
        default: 'Untitled Form', 
    },
    description:{
        type: String, 
    required: false,
    },
    questions: [questionSchema]
})
module.exports - mongoose.model('Forms', FormSchema)