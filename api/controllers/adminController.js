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

exports.editor = async (req, res) => {
    try {
        await res.render('admin/editor')
    } catch (err) {
        console.log(err)
    }
}

exports.user = async (req, res) => {
    try {
        await res.render('admin/premium-user')
    } catch (err) {
        console.log(err)
    }
}

exports.profile = async (req, res) => {
    try {
        await res.render('admin/profile')
    } catch (err) {
        console.log(err)
    }
}

exports.writer = async (req, res) => {
    try {
        await res.render('admin/writer')
    } catch (err) {
        console.log(err)
    }
}