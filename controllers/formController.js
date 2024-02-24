const Form = require('../models/Form')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const createForm = async(req, res) =>{
    const form = await Form.create(req.body)
    res.status(StatusCodes.CREATED).json({ form })
}
const getAllForms = async(req, res) =>{
    const form = await Form.find()
    res.status(StatusCodes.OK).json({ form, count: form.length })
}
const getSingleForm = async (req, res) => {
    try {
      const { id:formId } = req.params;
      const form = await Form.findOne({_id : formId});
      if (!form) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
      }
      res.status(StatusCodes.OK).json({ form });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };
  
  const updateForm = async (req, res) => {
    try {
      const { formId } = req.params;
      const updatedForm = await Form.findByIdAndUpdate(formId, req.body, { new: true });
      if (!updatedForm) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
      }
      res.status(StatusCodes.OK).json({ form: updatedForm });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };
  
  const deleteForm = async (req, res) => {
    try {
      const { formId } = req.params;
      const deletedForm = await Form.findByIdAndDelete(formId);
      if (!deletedForm) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Form not found' });
      }
      res.status(StatusCodes.NO_CONTENT).send(); // Send no content upon successful deletion
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {createForm, getAllForms, getSingleForm, updateForm, deleteForm}