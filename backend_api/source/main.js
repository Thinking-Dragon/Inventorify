const PORT = 3000

const express = require('express');
const api = express();

api.get('/', (request, response) => {
    response.send('Welcome');
});

api.listen(PORT, () => console.log(`API server started on port ${PORT}`));