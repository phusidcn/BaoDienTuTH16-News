const mongoose = require('mongoose')
const Category = require('./models/Category')
const Tag = require('./models/Tag')
const Comment = require('./models/Comment')
const Post = require('./models/Post')

const Admin = require('./models/Admin')
const Writer = require('./models/Writer')
const Editor = require('./models/Editor')
const Guest = require('./models/Guest')
const Subscriber = require('./models/Subscriber')

const data = require('./data')
const config = require('./config/dev')

class DB {
    constructor () {
        this.categories = data.categories
        this.tags = data.tags
        this.comments = data.comments
        this.posts = data.posts
        this.admins = data.admins
        this.writers = data.writers
        this.editors = data.editors
        this.guests = data.guests
        this.subscribers = data.subscribers
        this.models = [Category, Tag, Comment, Post, Admin, Writer, Editor, Guest, Subscriber]
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

        await this.admins.forEach(async (admin) => {
            const newAdmin = new Admin(admin)
            await newAdmin.save(() => {})
        })

        await this.writers.forEach(async (writer) => {
            const newWriter = new Writer(writer)
            await newWriter.save(() => {})
        })

        await this.editors.forEach(async (editor) => {
            const newEditor = new Editor(editor)
            await newEditor.save(() => {})
        })

        await this.guests.forEach(async (guest) => {
            const newGuest = new Guest(guest)
            await newGuest.save(() => {})
        })

        await this.subscribers.forEach(async (subcriber) => {
            const newSubscriber = new subcriber(subcriber)
            await newSubscriber.save(() => {})
        })
    }

    async seedDb() {
        await this.cleanDb();
        await this.pushDataToDb();
    }
}


mongoose.connect(config.mongoURI, { useNewUrlParser: true })
  .then(async () => {
    const db = new DB();
    await db.seedDb();
    console.log('You can close connection now!')
  })
  .catch(err => console.log(err));
