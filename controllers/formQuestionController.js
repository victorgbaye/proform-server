// controllers/questionsController.js

const { StatusCodes } = require('http-status-codes');
const Form = require('../models/Form')

const addQuestion = async (req, res) => {
    try {
      const { formId } = req.params;
      const form = await Form.findOne( formId);
      if (!form) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
      }
      // form.questions.create(req.body)
      form.questions.push(req.body);
      await form.save();
      res.status(StatusCodes.CREATED).json({ form });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };
const getAllQuestions = async (req, res) => {
    try {
      const { formId } = req.params;
        // const form = await Form.findOne({_id: id});
        const form = await Form.findOne(formId);

        if (!form) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
        }
        const questions = form.questions;
        res.status(StatusCodes.OK).json({ questions });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

  const getSingleQuestion = async (req, res) => {
    try {
      const { formId, questionId } = req.params;
      const form = await Form.findOne(formId);
      if (!form) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
      }
      const question = form.questions.find(question => question._id.toString() === questionId);
      if (!question) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Question not found' });
      }
      res.status(StatusCodes.OK).json({ question });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };


// const updateQuestion = async (req, res) => {
//   try {
//     const { formId, questionId } = req.params;
//     const form = await Form.findById(formId);
//     if (!form) {
//       return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
//     }
//     const questionIndex = form.questions.findIndex(question => question._id.toString() === questionId);
//     if (questionIndex === -1) {
//       return res.status(StatusCodes.NOT_FOUND).json({ error: 'Question not found' });
//     }
//     form.questions[questionIndex] = req.body;
//     await form.save();
//     res.status(StatusCodes.OK).json({ form });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
//   }
// };
const updateQuestion = async (req, res) => {
  try {
    const { formId, questionId } = req.params;
    const form = await Form.findOne(formId);
    if (!form) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
    }

    const questionIndex = form.questions.findIndex(question => question._id.toString() === questionId);
    if (questionIndex === -1) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'Question not found' });
    }

    // Update only the fields that are provided in the request body
    Object.keys(req.body).forEach(key => {
      form.questions[questionIndex][key] = req.body[key];
    });

    await form.save();
    res.status(StatusCodes.OK).json({ form });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};


const deleteQuestion = async (req, res) => {
    try {
      const { formId, questionId } = req.params;
      const form = await Form.findOne(formId);
      if (!form) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
      }
      const questionIndex = form.questions.findIndex(question => question._id.toString() === questionId);
      if (questionIndex === -1) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Question not found' });
      }
      form.questions.splice(questionIndex, 1);
      await form.save();
      res.status(StatusCodes.OK).json({ form });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { addQuestion, updateQuestion, deleteQuestion, getAllQuestions, getSingleQuestion };
