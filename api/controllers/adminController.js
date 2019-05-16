exports.all = (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
}

exports.index = async (req, res) => {
    try {
        await res.render('admin/dashboard', {
            layout: false
        })
    } catch (err) {
        console.log(err)
    }
} 