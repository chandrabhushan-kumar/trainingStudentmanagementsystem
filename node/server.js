const http   = require('http');
const app    = require('./App.js'); 

const port   = 3007;
console.log('Rental Car API Running on Port => ',port);

const server = http.createServer(app);
server.listen(port);