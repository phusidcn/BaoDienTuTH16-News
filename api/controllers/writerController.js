exports.all = (req, res, next) => {
    req.app.locals.layout = 'writer'
    next()
}

exports.index = async (req, res) => {
    try {
        await res.render('writer/writer_post_content')
    } catch (err) {
        console.log(err)
    }
}

exports.editDenied = async (req, res) => {
    try {
        await res.render('writer/writer_edit_denied_content')
    } catch (err) {
        console.log(err)
    }
}

exports.editWaiting = async (req, res) => {
    try {
        await res.render('writer/writer_edit_waiting_content')
    } catch (err) {
        console.log(err)
    }
}

exports.viewCensored = async (req, res) => {
    try {
        await res.render('writer/writer_view_censored')
    } catch (err) {
        console.log(err)
    }
}


exports.viewDenied = async (req, res) => {
    try {
        await res.render('writer/writer_view_denied')
    } catch (err) {
        console.log(err)
    }
}

exports.viewPublished = async (req, res) => {
    try {
        await res.render('writer/writer_view_published')
    } catch (err) {
        console.log(err)
    }
}

exports.viewWaiting = async (req, res) => {
    try {
        await res.render('writer/writer_view_waiting')
    } catch (err) {
        console.log(err)
    }
}