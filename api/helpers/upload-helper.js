module.exports = {
    isEmpty: function() {
        for (let props in obj) {
            if(obj.hasOwnProperty(props)) {
                return false
            }
        }
        return true
    }
}