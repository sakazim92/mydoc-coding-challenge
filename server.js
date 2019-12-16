const http = require('http');
const app = require('./app');
var config = require('./config');
const port = process.env.port || config.port;
const server = http.createServer(app);
// const express = require('express');
server.listen(port);
console.log("server started!");