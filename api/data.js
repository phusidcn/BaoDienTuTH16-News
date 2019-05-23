const moment = require('moment')
const mongoose = require('mongoose')

const category1Id = mongoose.Types.ObjectId()
const category2Id = mongoose.Types.ObjectId()
const category3Id = mongoose.Types.ObjectId()
const category4Id = mongoose.Types.ObjectId()
const category5Id = mongoose.Types.ObjectId()

const tag1Id = mongoose.Types.ObjectId()
const tag2Id = mongoose.Types.ObjectId()
const tag3Id = mongoose.Types.ObjectId() 

const comment1Id = mongoose.Types.ObjectId()
const comment2Id = mongoose.Types.ObjectId()
const comment3Id = mongoose.Types.ObjectId()

const post1Id = mongoose.Types.ObjectId()
const post2Id = mongoose.Types.ObjectId()
const post3Id = mongoose.Types.ObjectId()
const post4Id = mongoose.Types.ObjectId()
const post5Id = mongoose.Types.ObjectId()

const writer1Id = mongoose.Types.ObjectId()
const writer2Id = mongoose.Types.ObjectId()
const writer3Id = mongoose.Types.ObjectId()

const guest1Id = mongoose.Types.ObjectId()
const guest2Id = mongoose.Types.ObjectId()
const guest3Id = mongoose.Types.ObjectId()

const subscriber1Id = mongoose.Types.ObjectId()
const subscriber2Id = mongoose.Types.ObjectId()
const subscriber3Id = mongoose.Types.ObjectId()

const editor1Id = mongoose.Types.ObjectId()
const editor2Id = mongoose.Types.ObjectId()
const editor3Id = mongoose.Types.ObjectId()

const admin1Id = mongoose.Types.ObjectId()
const admin2Id = mongoose.Types.ObjectId()
const admin3Id = mongoose.Types.ObjectId()


module.exports = {
    //categories
    "categories": [
        {
            "_id": category1Id,
            "name": "Sport",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category2Id,
            "name": "Entertaiment",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category3Id,
            "name": "Food",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category4Id,
            "name": "Literature",
            "createdAt": moment().toISOString()
        },
        {
            "_id": category5Id,
            "name": "Life",
            "createdAt": moment().toISOString()
        }
    ],

    //tag
    "tags": [
        {
            "_id": tag1Id,
            "name": "Football",
            "category": category1Id
        },
        {
            "_id": tag2Id,
            "name": "Tennis",
            "category": category1Id
        },
        {
            "_id": tag3Id,
            "name": "Vbiz",
            "category": category2Id
        }
    ],

    //comments
    "comments": [
        {
            "_id": comment1Id,
            "content": "bla bla bla",
            "subscriber": subscriber1Id,
            "post": post1Id
        },
        {
            "_id": comment2Id,
            "content": "bla bla bla",
            "subscriber": subscriber2Id,
            "post": post2Id
        },
        {
            "_id": comment3Id,
            "content": "bla bla bla",
            "subscriber": subscriber3Id,
            "post": post3Id
        }
    ], 

    //posts
    "posts": [
        {
            "_id": post1Id,
            "title": "Tin the thao bong da",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "sucContent": "bla bla bla",
            "content": "bla bla bla bla bla",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category1Id,
            "tag": tag1Id,
            "writer": writer1Id,
            "comments": [comment1Id, comment2Id]
        },
        {
            "_id": post2Id,
            "title": "Tin the thao bong da",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "sucContent": "bla bla bla",
            "content": "bla bla bla bla bla",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category1Id,
            "tag": tag1Id,
            "writer": writer1Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post3Id,
            "title": "Tin the thao bong da",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "sucContent": "bla bla bla",
            "content": "bla bla bla bla bla",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category1Id,
            "tag": tag1Id,
            "writer": writer1Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post4Id,
            "title": "Tin the thao bong da",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "sucContent": "bla bla bla",
            "content": "bla bla bla bla bla",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category1Id,
            "tag": tag1Id,
            "writer": writer1Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post5Id,
            "title": "Tin the thao bong da",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "sucContent": "bla bla bla",
            "content": "bla bla bla bla bla",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 0,
            "category": category1Id,
            "tag": tag1Id,
            "writer": writer1Id,
            "comments": [comment1Id, comment3Id]
        },
    ],


    // Thái làm tiếp Writer, Editor, Guest, subscriber, với admin.

    //writer
    "writer":[
        {
            "_id": writer1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Lê Quốc Thái",
            "birthday": "26/05/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "company": "HCMUS",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": writer2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "userName": "Lê Quốc Duy Quang",
            "birthday": "01/01/1998",
            "address": "TPHCM",
            "company": "UIT",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": writer3Id,
            "email": "lequocthai@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Huỳnh Lâm Phú Sĩ",
            "birthday": "01/01/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "company": "BK",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],

    //editor
    "editor":[
        {
            "_id": editor1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Lê Quốc Sang",
            "birthday": "26/05/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "company": "KMS",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": editor2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "userName": "Lê Quốc",
            "birthday": "01/01/1998",
            "address": "TPHCM",
            "company": "HCMUS",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": editor3Id,
            "email": "lequoc@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Huỳnh Lâm Phú Sỹ",
            "birthday": "01/01/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "company": "VNG",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],

    //guest
    "guest":[
        {
            "_id": guest1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Lê Văn Thái",
            "birthday": "26/05/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": guest2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "userName": "Lê Duy Quang",
            "birthday": "01/01/1998",
            "address": "TPHCM",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": guest3Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Huỳnh Phú Sĩ",
            "birthday": "01/01/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],

    //subscriber
    "subscriber":[
        {
            "_id": subscriber1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Lê Quốc Quân",
            "birthday": "26/05/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "accountDuration": "30",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": subscriber2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "userName": "Lê Quốc Quang",
            "birthday": "01/01/1998",
            "address": "TPHCM",
            "accountDuration": "3",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": subscriber3Id,
            "email": "lequoc@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Huỳnh Sĩ",
            "birthday": "01/01/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "accountDuration": "10",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],

    //admin
    "admin":[
        {
            "_id": admin1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Lê Quốc Tân",
            "birthday": "26/05/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": admin2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "userName": "Lê Quốc Duy Sĩ",
            "birthday": "01/11/1998",
            "address": "TPHCM",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": admin3Id,
            "email": "lequocthai@gmail.com",
            "password": "gagtrxrz111",
            "userName": "Huỳnh Lâm Phú Quang",
            "birthday": "01/05/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],
}