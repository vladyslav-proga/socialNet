const postActions = require('../models/posts');

exports.createNew = ( req, res, next) => {

    const file = req.file;
    const postContent = JSON.parse(req.body.postContent)[0];
    console.log(postContent);

    if ( !file && !postContent ) {
        res.status(409).json({
            message: 'At post must be at least media, or some text content!'
          });
    } else {

        const postData = {
            media: file ? req.file.location : null,
            postContent: postContent ? req.body.postContent : null,
            userId: req.body.userId
        };
        postActions.save(postData)
        .then(result => {
            res.status(200);
        })
        .catch(err => console.log(err));

    }
};

exports.showAll = ( req, res, next ) => {

    let responseContent = [];
    postActions.fetchAll()
        .then(result => {
            responseContent = result[0];
        })
        .then(() => {
            res.status(200).json({
                content: responseContent
            })
        })
};

exports.deleteById = (req, res, next) => {

    console.log(req.body);
    const postId = req.body.id;
    postActions.deleteById(postId);
    res.status(200).json({
        message: 'OK'
    });
}

exports.editById = async (req, res, next) => {
    console.log(req.body);

    const postId = req.body.id;
    const postContent = req.body.postContent;
    await postActions.editById( postId, postContent );
    return res.json({
        message: 'OK'
    })
}

exports.getById = async (req, res, next) => {

    const postId = req.params.id;
    const post = await postActions.getById(postId);
    
    return res.json({
        post: post[0][0]
    });
}