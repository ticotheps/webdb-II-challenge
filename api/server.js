const express = require('express');
const helmet = require('helmet');

const lambdaDataRouter = require('../lambdaData/lambdaDataRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/lambdaData', lambdaDataRouter);

module.exports = server;
