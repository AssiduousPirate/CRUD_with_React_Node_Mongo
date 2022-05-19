const mongoose = require('mongoose')
var postSchema = new mongoose.Schema({
    titleText: {
        type: String,
        required: 'This field is required.'
    },
    bodyText: {
        type: String,
        required: 'This field is required.'
    }
})
mongoose.model('Post', postSchema)