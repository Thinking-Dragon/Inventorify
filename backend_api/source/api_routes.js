const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('You are in the api');
});

module.exports = router;