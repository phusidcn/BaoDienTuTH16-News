let ObjectId = require('mongodb').ObjectID

exports.getId = (id) => {
    if(id){
        if(id.length !== 24){
            return id
        }
    }
    return ObjectId(id)
}