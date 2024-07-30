const express = require(`express`)
require('dotenv').config();
// const https = require('https')
// const http = require('http')
const path = require('path')
const multer = require('multer');
const bodyParser = require('body-parser')
const port = process.env.PORT || 9000


const upload = multer()
const app = new express()

const MailerService = require('./http/services/MailerService')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static( path.join(__dirname,'public')))
app.set('views', path.join(__dirname, `views`));
app.set('view engine', `ejs`);

app.get(`/`, async (req, res) => { 
    res.render(`index`)
})

app.post('/send', upload.none(), MailerService.sendEmailContact)

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on *:${port}`);
})