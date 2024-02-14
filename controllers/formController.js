

const createForm = async(req, res) =>{
    res.send('create form')
}
const getAllForms = async(req, res) =>{
    res.send('get all forms')
}
const getSingleForm = async(req, res) =>{
    res.send('get single form')
}

const updateForm = async(req, res) =>{
    res.send('update form')
}


const deleteForm = async(req, res) =>{
    res.send('delete form')
}

module.exports = {createForm, getAllForms, getSingleForm, updateForm, deleteForm}