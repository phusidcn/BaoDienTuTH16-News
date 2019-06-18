const escapeRegExp = require('./regex-escape')
module.exports = {
    async searchPost(req, res, next) {
        const queryKeys = Object.keys(req.query)

        if(queryKeys.length) {
            const dbQueries = []

            let {
                search,
                title,
                subConntent,
                content
            } = req.query

            if(search) {
                search = new RegExp(escapeRegExp(search), 'gi')

                dbQueries.push({
                    $or: [
                        { title: search },
                        { subContent: search }
                        { content: search }
                    ]
                })
            }
        }
    }
}