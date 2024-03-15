// Create web server

// Set up web server
const express = require('express');
const app = express();

// Set up body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Set up database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

// Set up schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
const Comment = mongoose.model('Comment', commentSchema);

// Set up routes
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

app.post('/comments', async (req, res) => {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.json(savedComment);
});

app.listen(3000, () => {
    console.log('Server is running...');
});