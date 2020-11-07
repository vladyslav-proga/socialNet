const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const {fileUploader} = require('../middleware/file-uploader');
const postController = require('../controllers/post');

router.post( '/create-new',fileUploader.single('file'), postController.createNew );

module.exports = router;