const mongoose = require('mongoose')
const Category = require('./models/Category')
const Tag = require('./models/Tag')
const Comment = require('./models/Comment')
const Post = require('./models/Post')

const User = require('./models/User')

const data = require('./data')
const config = require('./config/dev')

class DB {
    constructor () {
        this.categories = data.categories
        this.tags = data.tags
        this.comments = data.comments
        this.posts = data.posts
        this.users = data.users
        this.models = [Category, Tag, Comment, Post, User]
    }

    async cleanDB () {
        for (let model of this.models) {
            await model.deleteMany({}, () => {})
            console.log(`Data for model ${model.collection.collectionName} deleted`)
        }
    }

    async pushDataToDB () {
        await this.categories.forEach(async (category) => {
            const newCategory = new Category(category)
            await newCategory.save(() => {})
        })

        await this.tags.forEach(async (tag) => {
            const newTag = new Tag(tag)
            await newTag.save(() => {})
        })

        await this.comments.forEach(async (comment) => {
            const newComment = new Comment(comment)
            await newComment.save(() => {})
        })

        await this.posts.forEach(async (post) => {
            const newPost = new Post(post)
            await newPost.save(() => {})
        })

        await this.users.forEach(async (user) => {
            const newUser = new User(user)
            await newUser.save(() => {})
        })
    }

    async seedDb() {
        await this.cleanDB();
        await this.pushDataToDB();
    }
}


mongoose.connect(config.mongoURI, { useNewUrlParser: true })
  .then(async () => {
    const db = new DB();
    await db.seedDb();
    console.log('You can close connection now!')
  })
  .catch(err => console.log(err));
