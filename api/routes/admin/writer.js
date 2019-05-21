const express = require('express')
const Writer = require('../../models/Writer')
const adminController = require('../../controllers/adminController')
const router = express.Router()

router.all('/*', adminController.all)

router.get('/', (req, res) => {
    Writer.find({}).then(writers => {
        res.render('admin/writer/index', {
            writers: writers
        })
    })
})

/*
 router.get('/create', (req, res) => {
    res.render('admin/writer/create')
})
*/

router.post('/create', async (req, res) => {
    try {
        let newWriter = new Writer()
        newWriter.id = req.body.id
        newWriter.name = req.body.username
        newWriter.email = req.body.email
        newWriter = await newWriter.save()
        res.redirect('/admin/writer')
    } catch (error) {
        console.log(error)
    }

})

router.get('/edit/:id', (req, res) => {
    Writer.findOne({id: req.params.id})
        .then(writer => {
            res.render('admin/writer/edit', {
                writer: writer
            })
        })
})

router.put('/edit/:id', (req, res) => {
    Writer.findOne({id: req.params.id})
        .then(writer => {
            writer.id = req.body.id
            writer.name = req.body.username
            writer.email = req.body.email

            writer.save().then(updatedWriter, () => {
                res.redirect('/admin/writer')
            })
        })
})

module.exports = router
