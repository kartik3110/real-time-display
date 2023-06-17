const express = require('express')
const ejs = require('ejs')
const path = require('path');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(cors());


let data = {};


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/data', (req, res) => {
    res.json(data); // convert js object to JSON for fetchAPI
});

app.post('/update', express.json(), (req, res) => {
    data = req.body;
    res.sendStatus(200);
});



const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API Documentation',
            version: '1.0.0',
            description: 'This is the documentation of the API end points I made in this project submisison'
        },
    },
    apis: ['./app.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



app.listen(3000, () => {
    console.log('server running at port 3000');
})

/**
 * @swagger
 * /update:
 *   post:
 *     summary: Update data
 *     description: Updates the data object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               textbox1:
 *                 type: string
 *               textbox2:
 *                 type: string
 *               textbox3:
 *                 type: string
 *               textbox4:
 *                 type: string
 *               textbox5:
 *                 type: string
 *               textbox6:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Data updated successfully
 */

/**
 * @swagger
 * /data:
 *   get:
 *     summary: to retrieve the data object
 *     description: Retrieve an object of all the key-value pairs in which the key is the textBox number and value is the text entered.
 *     responses:
 *       200:
 *         description: An iterable object of data elements.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: to render the input page
 *     description: renders the HTML form page on which user enters the data in text boxes.
 *     responses:
 *       200:
 *         description: An html form template page
 */
