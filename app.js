const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post')
const ejs = require('ejs');
const path = require('path');
const methodOverride=require('method-override');

const pageController=require('./controllers/pageController');
const postController=require('./controllers/postController');

const app = express();
//**********************************************************************************************************************
//connect DB

mongoose.connect('mongodb+srv://utkucoskun:88588858@cluster0.sqdmd.mongodb.net/cleanpost-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log(('DB CONNECTED!'))
}).catch((err)=>{
    console.log(err)
});

//**********************************************************************************************************************
//TEMPLATE ENGINE
app.set("view engine", "ejs");

//**********************************************************************************************************************
//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

//**********************************************************************************************************************
//ROUTES
app.get('/add_post',pageController.getAddPost );
app.get('/about',pageController.getAbout );
app.get('/post',pageController.getPost);
app.get('/posts/edit/:id',pageController.getEditPage );

app.post('/posts', postController.createPost );
app.get('/',postController.getAllPosts );
app.get('/posts/:id', postController.getPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id',postController.deletePost);


//**********************************************************************************************************************

const port =process.env.PORT||5000;
app.listen(port, () => {
    console.log(`The server is started on port ${port}.`);
});