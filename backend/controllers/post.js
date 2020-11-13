exports.createNew = ( req, res, next) => {
    console.log(req.body);
    console.log(req.file.location);
}