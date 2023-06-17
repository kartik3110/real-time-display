const express = require('express')
const ejs = require('ejs')
const path = require('path');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
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





app.listen(3000, () => {
    console.log('server running at port 3000');
})

//192.168.29.29
