const bcrypt = require('bcryptjs')
const passport = require('passport')
const fs = require('fs')
const { isEmpty, uploadDir } = require('../helpers/upload-helper')
const Post = require('./../models/Post')
const Category = require('./../models/Category')
const Writer = require('../models/Writer')

exports.all = (req, res, next) => {
    req.app.locals.layout = 'writer'
    next()
}

exports.index = (req, res) => {
    res.render('writer/index',{
        layout: false
    })
}

/* ============== Authenticate =================*/

exports.register = (req, res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('writer/register', {
            errors,
            name,
            email,
            password,
            password2,
            layout: false
        });
    } else {
        Writer.findOne({ email: email }).then(writer => {
            if (writer) {
                errors.push({ msg: 'Email already exists' });
                res.render('writer/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    layout:false
                });
            } else {
                const newWriter = new Writer({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newWriter.password, salt, (err, hash) => {
                        if (err) throw err;
                        newWriter.password = hash;
                        newWriter
                            .save()
                            .then(writer => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/writer/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}

exports.login = (req, res, next) => {
    passport.authenticate('writerLocal',{
        successRedirect: '/writer',
        failureRedirect: '/writer/login',
        failureFlash: true
    })(req, res, next)
}
/* ======================================= */

exports.post = (req, res) => {
    Post.find({})
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/index', {
                posts: posts
            })
        })
}

exports.create = (req, res) => {
    let errors = []

    if (!req.body.title) {
        errors.push({ message: 'Please add title' })
    }

    if (!req.body.content) {
        errors.push({ message: 'Please add content' })
    }

    if (errors.length > 0) {
        res.render('writer/posts/create', {
            errors: errors
        })
    } else {
        let filename = ''
        if (!isEmpty(req.files)) {
            let file = req.files.image
            filename = file.name + '-' + Date.now()

            file.mv('./public/uploads/' + filename, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        const newPost = new Post({
            title: req.body.title,
            image: filename,
            category: req.body.category,
            status: req.body.status,
            tag: req.body.tag,
            premium: req.body.premium,
            content: req.body.content
        })

        newPost.save()
            .then(savedPost => {
                res.redirect('/writer/post')
            })
            .catch(err => {
                console.log(err)
            });
    }
}

exports.edit = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            post.title = req.body.title
            post.status = req.body.status
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category

            post.save()
                .then(updatedPost => {
                    req.flash('success_message', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/writer/post')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.delete = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_message', 'Post was successfully deleted');
                res.redirect('/writer/post')
            })
        })
}

exports.approvedPost = (req, res) => {
    const approved_status = 1
    Post.find({ status: approved_status})
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/approved', {
                posts: posts
            })
        })
}

exports.publishedPost = (req, res) => {
    const published_status = 3
    Post.find({ status: published_status})
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/published', {
                posts: posts
            })
        })
}

exports.waitingApprovedPost = (req, res) => {
    const waiting_approved_status = 0
    Post.find({ status: waiting_approved_status})
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/waiting-approved', {
                posts: posts
            })
        })
}

exports.editWaitingApproved = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            post.title = req.body.title
            post.status = 0
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category

            post.save()
                .then(updatedPost => {
                    req.flash('success_message', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/writer/post/waiting-approved')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.deleteWaitingApproved = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_message', 'Post was successfully deleted');
                res.redirect('/writer/post/waiting-approved')
            })
        })
}

exports.rejectedPost = (req, res) => {
    const rejected_status = 2
    Post.find({ status: rejected_status})
        .populate('category')
        .exec((err, posts) => {
            if (err) console.log(err)
            res.render('writer/posts/rejected', {
                posts: posts
            })
        })
}

exports.editRejected = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            post.title = req.body.title
            post.status = 2
            post.content = req.body.content
            post.premium = req.body.premium
            post.category = req.body.category

            post.save()
                .then(updatedPost => {
                    req.flash('success_message', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/writer/post/rejected')
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.deleteRejected = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then((post) => {
            fs.unlink(uploadDir + post.image, (err) => {
                req.flash('success_message', 'Post was successfully deleted');
                res.redirect('/writer/post/rejected')
            })
        })
}
