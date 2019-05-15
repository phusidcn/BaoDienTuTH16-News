exports.index = async (req, res) => {
    try {
        await res.render('subscriber/subscriberHome', {
            layout: false
        })
    } catch (err) {
        console.log(err)
    }
}

exports.showCategory = async (req, res) => {
    try {
        await res.render('subscriber/subscriberCategory', {
            layout: false
        })
    } catch (err) {
        console.log(err)
    }
}

exports.showPost = async (req, res) => {
    try {
        await res.render('subscriber/subscriberPost', {
            layout: false
        })
    } catch (err) {
        console.log(err)
    }
}