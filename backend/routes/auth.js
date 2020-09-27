const express = require('express');
const router = express.Router();

router.post('/auth/signup', (req, res, next) => {
    res.status(404);
    res.body({
        errorMessage: 'something go wrong'
    })
});
