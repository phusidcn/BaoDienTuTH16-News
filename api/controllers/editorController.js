const validationHandler = require('../validations/validationHandler')


exports.all = async (req, res, next) => {
    req.app.locals.layout = 'editor'
    next()
}

exports.index = async (req, res) => {
    try {
        await res.render('editor/editor_censor_content')
    } catch (err) {
        console.log(err)
    }
}

exports.viewCensored = async (req, res) => {
    try {
        await res.render('editor/editor_view_censored_content')
    } catch (err) {
        console.log(err)
    }
}

exports.viewDenied = async (req, res) => {
    try {
        await res.render('editor/editor_view_denied_content')
    } catch (err) {
        console.log(err)
    }
}

exports.viewDraft = async (req, res) => {
    try {
        await res.render('editor/editor_view_draft')
    } catch (err) {
        console.log(err)
    }
}

exports.viewListContent = async (req, res) => {
    try {
        await res.render('editor/editor_view_list_content')
    } catch (err) {
        console.log(err)
    }
}