const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const { isEmpty } = require('../../helpers/upload-helper');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            res.render('admin/posts', {
                posts: posts
            });
        });
});

router.get('/create', (req, res) => {
    res.render('admin/posts/create');
});

router.post('/create', (req, res) => {

    let errors = [];

    if (!req.body.title) {
        errors.push({ message: 'Please add title' });
    }

    if (!req.body.description) {
        errors.push({ message: 'Please add description' });
    }

    if (errors.length > 0) {
        res.render('admin/posts/create', {
            errors: errors
        })
    } else {
        // let filename = 'avatar.jpg';
        let filename;
        if (!isEmpty(req.files)) {
            let file = req.files.file;
            filename = Date.now() + '-' + file.name;

            file.mv('/public/uploads/' + filename, (err) => {
                if (err) {
                    throw err;
                }
            });
            
        }

        let allowComments = true;
        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }
        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            allowComments: allowComments,
            description: req.body.description,
            file: filename
        });

        newPost.save()
            .then(savedPost => {
                req.flash('success_message', `${savedPost.title} was created successfully`);
                res.redirect('/admin/posts');
            })
            .catch(err => {
                console.log(err);
            });
    }
});

router.get('/edit/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            res.render('admin/posts/edit', {
                post: post
            })
        })
        .catch(err => {
            console.log(err);
        });
});

router.put('/edit/:id', (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }

            post.title = req.body.title;
            post.status = req.body.status;
            if (!req.body.allowComments) {
                post.allowComments = false;
            } else {
                post.allowComments = true;
            }
            post.description = req.body.description;
            if (!isEmpty(req.files)) {
                let file = req.files.file;
                filename = Date.now() + '-' + file.name;
                post.file = filename;

                file.mv('./public/uploads/' + filename, (err) => {
                    if (err) {
                        throw err;
                    }
                });
                
            }

            post.save()
                .then(updatedPost => {
                    req.flash('success_message', `Post ${updatedPost} was successfully updated`);
                    res.redirect('/admin/posts');
                })
                .catch(err => {
                    console.log(err);
                });
        });
});

router.delete('/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_message', 'Post was successfully deleted');
            res.redirect('/admin/posts');
        });
});

module.exports = router;