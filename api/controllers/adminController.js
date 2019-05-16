exports.index = async (req, res) => {
    try {
        await res.render('admin/dashboard', {
            layout: false
        })
    } catch (err) {
        console.log(err)
    }
} 