exports.index = async (req, res) => {
    try {
        await res.render('guest/guestHome')
    } catch (err) {
        console.log(err)
    }
}

exports.showCategory = async (req, res) => {
    try {
        await res.render('guest/guestCategory')
    } catch (err) {
        console.log(err)
    }
}

exports.showPost = async (req, res) => {
    try {
        await res.render('guest/guestPost')
    } catch (err) {
        console.log(err)
    }
}