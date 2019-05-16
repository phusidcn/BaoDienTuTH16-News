exports.all = (req, res, next) => {
    req.app.locals.layout = 'subscriber'
    next()
}

exports.index = async (req, res) => {
    try {
        await res.render('subscriber/subscriberHome')
    } catch (err) {
        console.log(err)
    }
}

exports.showCategory = async (req, res) => {
    try {
        await res.render('subscriber/subscriberCategory')
    } catch (err) {
        console.log(err)
    }
}

exports.showPost = async (req, res) => {
    try {
        await res.render('subscriber/subscriberPost')
    } catch (err) {
        console.log(err)
    }
}