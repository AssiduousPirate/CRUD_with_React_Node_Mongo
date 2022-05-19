const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')

router.get('/', (req, res) => {
    res.render("post/addOrEdit", {
        viewTitle: "Insert Post"
    })
})

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res)
        else
        updateRecord(req, res)
})


function insertRecord(req, res) {
    var post = new Post()
    post.titleText = req.body.titleText
    post.bodyText = req.body.bodyText
    post.save((err, doc) => {
        if (!err)
            res.redirect('post/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body)
                res.render("post/addOrEdit", {
                    viewTitle: "Insert Post",
                    post: req.body
                })
            }else{
                console.log('Error during record insertion : ' + err)
            }
        }
    })
}

function updateRecord(req, res) {
    Post.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('post/list') }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("post/addOrEdit", {
                    viewTitle: 'Update Post',
                    post: req.body
                })
            }
            else
                console.log('Error during record update : ' + err)
        }
    })
}
router.get('/list', (req, res) => {
    Post.find((err, docs) => {
        if (!err) {
            res.render("post/list", {
                list: docs
            })
        }
        else {
            console.log('Error in retrieving post list :' + err)
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'title':
                body['titleTextError'] = err.errors[field].message
                break
            case 'body':
                body['bodyTextError'] = err.errors[field].message
                break
            default:
                break
        }
    }
}

router.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("post/addOrEdit", {
                viewTitle: "Update Post",
                post: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/post/list')
        }
        else { console.log('Error in post delete :' + err) }
    })
})
module.exports = router