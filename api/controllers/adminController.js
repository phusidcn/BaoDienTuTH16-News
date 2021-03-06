const Writer = require('../models/Writer')
const Category = require('../models/Category')
const Tag = require('../models/Tag')
const Post = require('../models/Post')
const Editor = require('../models/Editor')
const Admin = require('../models/Admin')

const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

exports.all = (req, res, next) => {
    req.app.locals.layout = 'admin'
    next()
}

exports.index = async (req, res) => {
    try {
        await res.render('admin/dashboard')
    } catch (err) {
        console.log(err)
    }
}

exports.register = (req, res) => {
    let errors = []

    if(!req.body.name) {
        errors.push({
            message: 'Please input your name'
        })
    }

    if(!req.body.email) {
        errors.push({
            message: 'Please input your email'
        })
    }

    if(!req.body.password) {
        errors.push({
            message: 'Please input your password'
        })
    }

    if(req.body.password !== req.body.password2) {
        errors.push({
            message: 'Password not match'
        })
    }

    if(errors.length > 0) {
        res.render('admin/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            layout: false
        })
    } else {
        Admin.findOne({email: req.body.email}).then(admin => {
            if(!admin) {
                const newAdmin = new Admin({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        newAdmin.password = hash
        
                        newAdmin.save().then(savedUser => {
                            req.flash('success_message', 'You are registered successfully. Please Log in')
                            res.redirect('/admin/login')
                        })
                    })
                })
            } else {
                req.flash('error_message', 'Email is already registered')
                res.redirect('/admin/register')
            }
        })
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin/',
        failureRedirect: '/admin/login/',
        failureFlash: true
    })(req, res, next)
}

/* Passport Local */

passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    Admin.findOne({ email: email }).then(admin => {
        if(!admin) {
            return done(null, false, { message: 'No admin found'})
        }
        bcrypt.compare(password, admin.password, (err, matched) => {
            if(err) {
                return err
            }

            if(matched) {
                return done(null, admin)
            } else {
                return done(null, false, { message: 'Incorrect password' })
            }
        })
    }) 
}))

passport.serializeUser((admin, done) => {
    done(null, admin.id)
})

passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, admin) => {
        done(err, admin)
    })
})

/* ================== CATEGORY ========================= */
exports.indexCategory = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.render('admin/category/index', {
            categories: categories
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createCategory = async (req, res) => {
    try {
        let newCategory = new Category({
            name: req.body.name
        })
        newCategory = await newCategory.save()
        res.redirect('/admin/category')
    } catch (error) {
        console.log(error)
    }
}

exports.editCategory = async (req, res) => {
    try {
        let foundCate = await Category.findOne({_id: req.params._id})
        res.render('admin/category/edit', {
            category: foundCate
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let { name } = req.body
        let foundCate = await Category.findOne({_id: req.params._id})
        foundCate.name = name
        await foundCate.save().then(updatedCate => {
            res.redirect('/admin/category')
        })        
    } catch (error) {
        console.log(error)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.remove({_id: req.params._id})
        res.redirect('/admin/category')
    } catch (error) {
        console.log(error)
    }
}

/* ===================================================== */

/* ================== TAG ============================== */
exports.indexTag = async (req, res) => {
    try {
        const tags = await Tag.find({})
        res.render('admin/tag/index', {
            tags: tags
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createTag = async (req, res) => {
    try {
        let newTag = new Tag()
        newTag.name = req.body.name
        newTag = await newTag.save()
        res.redirect('/admin/tag')
    } catch (error) {
        console.log(error)
    }
}

exports.editTag = async (req, res) => {
    try {
        let foundTag = await Tag.findOne({id: req.params.id})
        res.render('admin/tag/edit', {
            tag: foundTag
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateTag = async (req, res) => {
    try {
        let { id, name } = req.body
        let foundTag = await Tag.findOne({id: req.params.id})
        foundTag.id = id
        foundTag.name = name
        await foundTag.save().then(updatedTag => {
            res.redirect('/admin/tag')
        })        
    } catch (error) {
        console.log(error)
    }
}

exports.deleteTag = async (req, res) => {
    try {
        const deletedTag = await Tag.remove({id: req.params.id})
        res.redirect('/admin/tag')
    } catch (error) {
        console.log(error)
    }
}

/* ===================================================== */

/* ====================== POST ========================= */
exports.indexPost = async (req, res) => {
    try {
        const posts = await Post.find({})
        res.render('admin/post/index', {
            posts: posts
        })
    } catch (error) {
        console.log(error)
    }
}

exports.editPost = async (req, res) => {
    try {
        let foundPost = await Post.findOne({id: req.params.id})
        res.render('admin/post/edit', {
            post: foundPost
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updatePost = async (req, res) => {
    try {
        let { name, status } = req.body
        let foundPost = await Post.findOne({id: req.params.id})
        foundPost.name = name
        foundPost.status = status 
        await foundPost.save().then(updatedPost => {
            res.redirect('/admin/post')
        })        
    } catch (error) {
        console.log(error)
    }
}

exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.remove({id: req.params.id})
        res.redirect('/admin/post')
    } catch (error) {
        console.log(error)
    }
}
/* ===================================================== */


/* ================== WRITER ========================= */
exports.indexWriter = async (req, res) => {
    try {
        const writers = await Writer.find({})
        res.render('admin/writer/index', {
            writers: writers
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createWriter = async (req, res) => {
    try {
        let newWriter = new Writer()
        newWriter.id = req.body.id
        newWriter.name = req.body.username
        newWriter.email = req.body.email
        newWriter = await newWriter.save()
        res.redirect('/admin/writer')
    } catch (error) {
        console.log(error)
    }
}

exports.editWriter = async (req, res) => {
    try {
        let foundWriter = await Writer.findOne({id: req.params.id})
        res.render('admin/writer/edit', {
            writer: foundWriter
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateWriter = async (req, res) => {
    try {
        let { id, username, email } = req.body
        let foundWriter = await Writer.findOne({id: req.params.id})
        foundWriter.id = id
        foundWriter.name = username
        foundWriter.email = email
        await foundWriter.save().then(updatedWriter => {
            res.redirect('/admin/writer')
        })        
    } catch (error) {
        console.log(error)
    }
}

exports.deleteWriter = async (req, res) => {
    try {
        const deletedWriter = await Writer.remove({id: req.params.id})
        res.redirect('/admin/writer')
    } catch (error) {
        console.log(error)
    }
}

/* ==================================================== */

/* ===================EDITOR========================= */

exports.indexEditor = async(req,res) => {
    try {
        // const editors = await Editor.find({});
        // const categories = await Category.find({})
        // res.render('admin/editor/index',{
        //     editors : editors,
        //     categories: categories
        // })
        Editor.find({})
            .populate('category')
            .exec((err, editors) => {
                if(err) console.log(err)
                res.render('admin/editor/index', {
                    editors: editors
                })
            })
    }
    catch (error) {
        console.log(error)
    }
}

exports.createEditor = async (req, res) => {
    try {
        let newEditor = new Editor();
        newEditor.password = req.body.password
        newEditor.name = req.body.name
        newEditor.email = req.body.email
        newEditor.category = req.body.category
        newEditor = await newEditor.save()
        res.redirect('/admin/editor');
    }
    catch (error){
        console.log(error);
    }
}


exports.editEditor = async (res, req) => {
    try {
        let foundEditor = Editor.findOne({_id:req.params.id});
        res.render('/admin/editor/edit', {
            editor : foundEditor
        })
    }
    catch (error) {
        console.log(error)
    }
}

exports.updateEditor = async (req, res) => {
    try {
        let { username, email } = req.body
        let foundEditor = await Editor.findOne({id: req.params.id})
        foundEditor.name = username
        foundEditor.email = email
        await foundEdiotr.save().then(updatedEditor => {
            res.redirect('/admin/editor')
        })
    }
    catch (error) {
        console.log(error);
    }
}

exports.deleteEditor = async (req, res) => {
    try {
        const deletedEditor = await Editor.remove({id: req.params.id})
        res.redirect('/admin/editor')
    }
    catch (error) {
        console.log(error);
    }
}