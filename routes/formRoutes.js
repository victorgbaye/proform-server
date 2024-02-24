const express = require('express')

const router = express.Router()

const {createForm, getAllForms, getSingleForm, updateForm, deleteForm} = require('../controllers/formController')


router.route('/').post(createForm).get(getAllForms)

router.route('/:id')
.get(getSingleForm)
.put(updateForm)
.delete(deleteForm)

module.exports = router