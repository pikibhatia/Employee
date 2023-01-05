const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const mongoose = require('mongoose')
const Employee = mongoose.model('Employee')

router.get('/', (req, res) => {
    res.render('employee/addorEdit', {
        viewTitle: 'Insert Employee Detail'
    })
})

router.post('/', (req, res) => {
    if (req.body._id == '') insertRecord(req, res)
    else updateRecord(req, res)
})


const insertRecord = (req, res) => {
    const employee = new Employee();
    employee.name = req.body.name;
    employee.jobTitle = req.body.jobTitle;
    employee.emailID = req.body.emailID;
    employee.save((err, doc) => {
        if (!err) res.redirect('employee/list')
        else console.log('Error in inserting employee:' + err)
    })
}

const updateRecord = (req, res) => {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) res.redirect('employee/list')
        else console.log(`Error in update: ${err}`)
    })
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) res.render('employee/list', { list: docs })
        else console.log(`Error in rendering: ${err}'`)
    })
})

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addorEdit', {
                viewTitle: 'Update Employee',
                employee: doc,
            })
            console.log(doc)
        }
    })
})

router.get('/delete/:id', (req, res) => {
    console.log(req.params.id);
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) res.redirect('back')
        else console.log(`Error in deletion: ${err}'`)
    })
})

module.exports = router