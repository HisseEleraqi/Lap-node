const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require("mongoose");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nursery API',
            version: '1.0.0',
            description: 'This is a API for a nursery.',
        },
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: "Local server"
        }
    ],
    apis: ['./Routes/*.js', './app.js',]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;