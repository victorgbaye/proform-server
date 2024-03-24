const express = require('express')

const router = express.Router()

const { getAllQuestions, getSingleQuestion, addQuestion, updateQuestion, deleteQuestion } = require('../controllers/FormQuestionController');

router.route('/').post(addQuestion).get(getAllQuestions);
router.route('/:questionId')
.get(getSingleQuestion)
.patch(updateQuestion)
.delete(deleteQuestion)

module.exports = router;