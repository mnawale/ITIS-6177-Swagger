const express = require('express');
const app = express();
const mysql =require('mysql');
const port = 3000;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

var connection = mysql.createConnection({
    host  :'sql5.freemysqlhosting.net',
    user  : 'sql5396721',
    password  :'nNccLAsRGy',
    database  :'sql5396721'
});

const options = {
    swaggerDefinition: {
        students: {
            title: 'Student Information API',
            version: '2.1.1',
            description: 'Student information '
        },
        host:'itis-6177-swagger-nnv8w.ondigitalocean.app',
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
 *  /students:
 *    get:
 *      description: Return all student info
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Object student containing array
 */

 app.get('/students',async(req,res)=>{
    connection.connect();
    connection.query('SELECT * from student',function(error,results,fields){
        connection.end();
        if (error) throw error;
        res.json(results);
    });
});
app.get('/info',(req,res) => {
    res.json(info);
});



app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`);
});