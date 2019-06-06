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
const post6Id = mongoose.Types.ObjectId()
const post7Id = mongoose.Types.ObjectId()
const post8Id = mongoose.Types.ObjectId()

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

    //tags
    "tags": [
        {
            "_id": tag1Id,
            "name": "Football",
            "category": category1Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag2Id,
            "name": "Tennis",
            "category": category1Id,
            "createdAt": moment().toISOString()
        },
        {
            "_id": tag3Id,
            "name": "Vbiz",
            "category": category2Id,
            "createdAt": moment().toISOString()
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
            "tags": [tag1Id, tag2Id],
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
            "tags": [tag1Id. tag3Id],
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
            "tags": [tag2Id, tag3Id],
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
            "tags": [tag1Id, tag3Id],
            "writer": writer2Id,
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
            "status": 3,
            "category": category1Id,
            "tags": [tag2Id, tag3Id],
            "writer": writer3Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post6Id,
            "title": "Tin thoi su",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "sucContent": "bla bla bla",
            "content": "bla bla bla bla bla",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 1,
            "category": category1Id,
            "tags": [tag2Id, tag3Id],
            "writer": writer3Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post7Id,
            "title": "Tin the thao bong da",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "sucContent": "bla bla bla",
            "content": "bla bla bla bla bla",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 2,
            "category": category1Id,
            "tags": [tag2Id, tag3Id],
            "writer": writer3Id,
            "comments": [comment1Id, comment3Id]
        },
        {
            "_id": post8Id,
            "title": "Tin the thao bong da",
            "image": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "linkYoutube": "www.youtube.com",
            "sucContent": "bla bla bla",
            "content": "bla bla bla bla bla",
            "createdAt": moment().toISOString(),
            "premium": false,
            "status": 4,
            "category": category1Id,
            "tags": [tag2Id, tag3Id],
            "writer": writer3Id,
            "comments": [comment1Id, comment3Id]
        },
    ],

    //writers
    "writers":[
        {
            "_id": writer1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "name": "Lê Quốc Thái",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "company": "HCMUS",
            "posts": [post1Id, post2Id, post3Id],
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": writer2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "name": "Lê Quốc Duy Quang",
            "birthday": "01/01/1998",
            "address": "TPHCM",
            "company": "UIT",
            "posts": [post4Id],
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": writer3Id,
            "email": "lequocthai@gmail.com",
            "password": "gagtrxrz111",
            "name": "Huỳnh Lâm Phú Sĩ",
            "birthday": "01/01/1998",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "company": "BK",
            "posts": [post5Id],
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],

    //editors
    "editors":[
        {
            "_id": editor1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "name": "Lê Quốc Sang",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "posts": [post1Id, post2Id],
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": editor2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "name": "Lê Quốc",
            "address": "TPHCM",
            "posts": [post3Id],
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": editor3Id,
            "email": "lequoc@gmail.com",
            "password": "gagtrxrz111",
            "name": "Huỳnh Lâm Phú Sỹ",
            "address": "333 Lý Thái Tổ, P9, Q10",
            "posts": [post4Id, post5Id],
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],

    //guests
    "guests":[
        {
            "_id": guest1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "name": "Lê Văn Thái",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": guest2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "name": "Lê Duy Quang",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": guest3Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "name": "Huỳnh Phú Sĩ",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],

    //subscribers
    "subscribers":[
        {
            "_id": subscriber1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "name": "Lê Quốc Quân",
            "membership": "30",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": subscriber2Id,
            "email": "lequocduyquang@gmail.com",
            "password": "123456789",
            "name": "Lê Quốc Quang",
            "membership": "3",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        },
        {
            "_id": subscriber3Id,
            "email": "lequoc@gmail.com",
            "password": "gagtrxrz111",
            "name": "Huỳnh Sĩ",
            "membership": "10",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80"
        }
    ],

    //admins
    "admins":[
        {
            "_id": admin1Id,
            "email": "lequocthai1998@gmail.com",
            "password": "gagtrxrz111",
            "name": "Lê Quốc Duy Quang",
            "avatar": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2452&q=80",
            "writers": [writer1Id, writer2Id, writer3Id],
            "editors": [editor1Id, editor2Id, editor3Id],
            "posts": [post1Id, post2Id, post3Id, post4Id, post5Id]
        }
    ],
}