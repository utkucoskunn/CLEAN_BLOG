const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post')
const ejs = require('ejs');
const path = require('path');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/cleanpost-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//ROUTES
app.get('/',  async (req, res) => {
    const posts= await Post.find({})
    res.render('index',{
        posts
    })
})

app.get('/posts/:id', async (req, res) => {
    const post=await Post.findById(req.params.id)
    res.render('post',{
        post
    })
})

app.get('/add_post', (req, res) => {
    res.render('add_post')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render('post')
})
app.post('/posts', async (req, res) => {
    await Post.create(req.body)
        res.redirect('/')
})


const port = 3000;
app.listen(port, () => {
    console.log(`The server is started on port ${port}.`);
});