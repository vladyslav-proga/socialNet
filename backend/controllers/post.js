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