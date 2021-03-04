const express = require('express');
const app = express();
const port = 3000;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Student Information API',
            version: '2.1.1',
            description: 'Student information '
        },
        host:'localhost:3000',
        basePath: '/',
    },
    apis: ['./server.js'],
};
const specs = swaggerJsdoc(options);
app.use('/docs',swaggerUi.serve,swaggerUi.setup(specs));
app.use(cors());

const info    = {
    student: [
        {
            id: 1,
            name: 'Nia',
            age: 18,
        },
        {
            id: 2,
            name: 'Rita',
            age: 22,
        },
        {
            id: 3,
            name: 'Bina',
            price: 28,
        },
    ]
};

/**
 *  @swagger
 *  /info:
 *    get:
 *      description: Return all student info
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object student containing array
 */

 app.get('/info',(req,res) => {
    res.json(info);
});



app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`);
});