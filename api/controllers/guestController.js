exports.index = async (req, res) => {
    try {
        await res.render('guest/guestHome')
    } catch (err) {
        console.log(err)
    }
}