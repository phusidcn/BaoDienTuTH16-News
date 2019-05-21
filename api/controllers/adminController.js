const Writer = require('../models/Writer')

exports.all = (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
}

exports.index = async (req, res) => {
    try {
        await res.render('admin/dashboard')
    } catch (err) {
        console.log(err)
    }
}

exports.indexWriter = async (req, res) => {
    try {
        const writers = await Writer.find({})
        res.render('admin/writer/index', {
            writers: writers
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createWriter = async (req, res) => {
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
}

exports.editWriter = async (req, res) => {
    try {
        let foundWriter = await Writer.findOne({id: req.params.id})
        res.render('admin/writer/edit', {
            writer: foundWriter
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateWriter = async (req, res) => {
    try {
        let { id, username, email } = req.body
        let foundWriter = await Writer.findOne({id: req.params.id})
        foundWriter.id = id
        foundWriter.name = username
        foundWriter.email = email
        await foundWriter.save().then(updatedWriter => {
            res.redirect('/admin/writer')
        })        
    } catch (error) {
        console.log(error)
    }
}

exports.deleteWriter = async (req, res) => {
    try {
        const deletedWriter = await Writer.remove({id: req.params.id})
        res.redirect('/admin/writer')
    } catch (error) {
        console.log(error)
    }
    
}