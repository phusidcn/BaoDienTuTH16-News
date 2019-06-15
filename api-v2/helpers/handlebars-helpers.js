const moment = require('moment')

module.exports = {
    select: function(selected, options) {
        return options
                .fn(this)
                .replace(new RegExp(' value=\"' + selected + '\"'), '$&selected="selected"')
    },

    generateTime: function(date, format) {
        return moment(date).format(format)
    },

    ifvalue: function(conditional, options) {
        if(conditional === options.hash.equals) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    },

    ifnotvalue: function(conditional, options) {
        if(conditional === options.hash.notequals) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    }
}