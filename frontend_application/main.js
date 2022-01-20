const fs = require('fs');
const express = require('express');
const application = express();

const PORT = 80;

function loadFile(path) {
    return fs.readFileSync(path).toString();
}

application.use(express.static('public'));

application.get('/', (request, response) => {
    response.send(loadFile('index.html'));
});

application.listen(PORT);

