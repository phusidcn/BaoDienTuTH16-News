const path = require('path')

module.exports = {

    uploadDir: path.join(__dirname, '../public/uploads'),

    isEmpty: function(obj) {
        for (let props in obj) {
            if(obj.hasOwnProperty(props)) {
                return false
            }
        }
        return true
    }
}