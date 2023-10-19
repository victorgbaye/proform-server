const mongoose = require('mongoose')


const questionSchema = new mongoose.Schema({
    questionText: {
      type: String,
      required: true,
    },
    questionType: {
      type: String,
      enum: ['short-respnse', 'long-response', 'multiple-choice', 'checkbox'],
      required: true,
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