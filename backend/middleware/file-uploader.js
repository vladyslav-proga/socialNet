const multer = require('multer');
const path = require('path');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
    accessKeyId: 'AKIAZEV2VUWLW3BXFOU5',
    secretAccessKey: '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',
    
});


const Mime_Type_Map = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

exports.fileUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'image-storing-bucket',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        const isValid = !!Mime_Type_Map[file.mimetype];
        let err = isValid ? null : new Error('Invalid mimetype');
        cb(err, isValid)
    }
});
