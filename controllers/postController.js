const Post=require('../models/Post');
const ejs = require('ejs');
const path = require('path');


//Create Post! ********************************************************************************************************
exports.createPost=async (req, res) => {
    await Post.create(req.body)
        res.redirect('/')
};

//Get All Post! ********************************************************************************************************
exports.getAllPosts=async (req, res) => {
    const posts= await Post.find({}).sort('-dateCreated')
    res.render('index',{
        posts
    })
};

//Get Post! ************************************************************************************************************
exports.getPost=async (req, res) => {
    const post=await Post.findById(req.params.id)
    res.render('post',{
        post
    })
};