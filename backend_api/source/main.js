const PORT = 3000

const api_routes = require('./api_routes');
const express = require('express');
const server = express();

server.use('/api', api_routes);
server.get('/', (request, response) => {
    response.statusCode()
});

server.listen(PORT, () => console.log(`API server started on port ${PORT}`));