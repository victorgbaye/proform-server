const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema({
  responderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  value: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  bookmark:{require:false, type: Boolean, default:false }
});

const questionSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    questionText: {
      type: String,
      required: true,
      // maxLength: 
    },
    questionType: {
      type: String,
      enum: ['multi-select', 'single choice select', 'small text area', 'large text area', 'contact info', 'calendar', 'link', 'Rating', 'file upload'],
      // required: true,
    },
    required: {
      type: Boolean,
      default: false
  },
    options: [{ type: String }],
    responses: [responseSchema]
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
    questions: [questionSchema],
    timestamp: { type: Date, default: Date.now }

})
module.exports = mongoose.model('Form', FormSchema)