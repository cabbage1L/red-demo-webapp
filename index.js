const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const expressSession = require('express-session');
const flash = require('connect-flash');
const ejs = require('ejs')

const { BlobServiceClient } = require('@azure/storage-blob');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const indexControl = require('./controllers/indexcontrol')
const userControl = require('./controllers/usercontrol');
const loginUserControl = require('./controllers/loginUserControl');
const logoutUserControl = require('./controllers/logoutControl');
const storeUser = require('./controllers/storeUser');
const homeControl = require('./controllers/homeControl');
const adpostControl = require('./controllers/adpostControl');
const findAndUpdate = require('./controllers/findAndUpdate');



const postControl = require('./controllers/postControl');


// Middleware
const redirectIfAuth = require('./middleware/redirectifAuth')
const auth = require('./middleware/auth')

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ดึงค่า MONGODB_URI จากไฟล์ .env
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
.then(() => console.log('Connected to Azure Cosmos DB'))
.catch(err => console.error('Connection error', err));

global.loggedIn = null

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash())

app.use(expressSession({
  secret: "node secret"
}))

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId
  next()
})

app.set('view engine', 'ejs')

app.get('/', indexControl)
app.get('/home', auth, homeControl)
app.get('/login', redirectIfAuth, userControl.loginPage)
app.get('/register', redirectIfAuth,userControl.registerPage)
app.get('/logout', logoutUserControl)
app.post('/user/login', redirectIfAuth,loginUserControl)
app.post('/user/register', redirectIfAuth,storeUser)
app.post('/admin/adpost', postControl.createPost )
app.post('/admin/update', findAndUpdate.updatePost )


app.get('/adpost', adpostControl)



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });