const Post=require('../models/Post');



//Get Add Post! ********************************************************************************************************
exports.getAddPost=(req, res) => {
    res.render('add_post')
};

//Get About! ***********************************************************************************************************
exports.getAbout=(req, res) => {
    res.render('about')
};

//Get Post! ************************************************************************************************************
exports.getPost=(req, res) => {
    res.render('post')
};

exports.getEditPage = async (req, res) => {
    const post = await Post.findOne({_id: req.params.id})
    res.render('edit', {
        post
    })
}