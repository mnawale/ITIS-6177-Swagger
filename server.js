const express = require('express');
const app = express();
const mysql =require('mysql');
const port = 3000;
var bodyParser = require("body-parser");


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

var connection = mysql.createConnection({
    host  :'sql5.freemysqlhosting.net',
    user  : 'sql5396721',
    password  :'nNccLAsRGy',
    database  :'sql5396721'
});
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

/**
* @swagger
*  /students/{id}:
*   get:
*      description: Get a student by ID
*      parameters:
*         - in: path
*           name: id
*           type: "integer"
*           required: true
*           format: "int64"
*           description: Numeric ID of the student to get
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Student record for given ID
*          "400":
*              description: "Invalid ID"
*          "404":
*              description: "Student not found"
*/
/**
* @swagger
*  /students/{course}:
*   get:
*      description: Get a student records by course name
*      parameters:
*         - in: path
*           name: course
*           type: "string"
*           required: true
*           description: Course name of the student
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Student record for given course name
*          "400":
*              description: "Invalid Course name"
*          "404":
*              description: "Record not found"
*/
/**
* @swagger
*  /students/{age}:
*   get:
*      description: Get a student by ID
*      parameters:
*         - in: path
*           name: age
*           type: "integer"
*           required: true
*           format: "int64"
*           description: Numeric ID of the student to get
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Student record for given ID
*          "400":
*              description: "Invalid ID"
*          "404":
*              description: "Student not found"
*/



app.get('/students', function (req, res) {
   console.log(req);
   connection.query('select * from student', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.get('/students/:id', function (req, res) {
   connection.query('select * from student where id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.get('/students/:course', function (req, res) {
   connection.query('select * from student where course=?', [req.params.course], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
app.get('/students/:age', function (req, res) {
   connection.query('select * from student where age=?', [req.params.age], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
/**
* @swagger
* /students:
*   post:
*     description: add a student record
*     parameters:
 *       - name: name
 *         in: formData
 *         type: string
 *         required: true
 *       - name: age
 *         in: formData
 *         type: integer
 *         format: "int64"
 *         required: true
 *       - name: course
 *         in: formData
 *         type: string
 *         required: true  
 *     
*     responses:
*       '200':
*         description: OK
*/
app.post('/students', (req, res) => {
   fname = req.body.name, 
   age = req.body.age, 
   course = req.body.course 
   let sql = "INSERT INTO student (name, age, course) VALUES (?,?,?)";       

   connection.query(sql, [fname, age, course], (err, rows, fields) => {
       if(!err) 
         res.send("Student record successfully added");
       else 
         console.log(err);
    });
});
/**
* @swagger
* /students:
*   put:
*     description: update student record for specific ID
*     parameters:
*        - in: formData
*          name: id
*          type: integer
*          format: "int64"
*          required: true
*          description: Numeric ID of the student
*        - name: name
*          in: formData
*          type: string
*          required: true
*        - name: age
*          in: formData
*          type: integer
*          format: "int64"
*          required: true
*        - name: course
*          in: formData
*          type: string
*          required: true   
*     responses:
*       '200':
*         description: OK
*/
app.put('/students', function (req, res) {
   connection.query('UPDATE student SET name=?,age=?,course=? where id=?',
    [req.body.name,req.body.age,req.body.course,req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
/**
* @swagger
* /students:
*   patch:
*     description: update student record for specific ID
*     parameters:
*        - in: formData
*          name: id
*          type: integer
*          required: true
*          format: "int64"
*          description: Numeric ID of the student
*        - name: course
*          in: formData
*          type: string
*          required: true   
*     responses:
*       '200':
*         description: OK
*/
app.patch('/students', function (req, res) {
   connection.query('UPDATE student SET course=? where id=?',
    [req.body.course,req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
/**
* @swagger
* /students:
*   delete:
*     description: Delete student record for specific ID
*     parameters:
*        - in: formData
*          name: id
*          type: integer
*          format: "int64"
*          required: true
*          description: Numeric ID of the student to delete   
*     responses:
*       '200':
*         description: OK
*/
app.delete('/students', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM student WHERE id=?', [req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Student record has been deleted!');
	});
});
app.get('/info',(req,res) => {
    res.json(info);
});



app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`);
});