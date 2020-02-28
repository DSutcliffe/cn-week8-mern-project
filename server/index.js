const bodyParser = require ('body-parser'); // get form data
const cors = require ('cors');              // communicate between ports - Cross Origin Resource Sharing
const nanoID = require('nanoid');
const mongoose = require('mongoose');
const session = require('express-session');             // This line must come before the following
const MongoStore = require ('connect-mongo')(session);  // call monogo and pass session into that
const express = require ('express');        // web application framework

const app = express();

const getSession = require('./lib/getSession');

// Tell express to use cors
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://danjaysut:password1234@usersignup-ruhg9.mongodb.net/test?retryWrites=true&w=majority')

app.use(session({
    store: new MongoStore({
        url: 'mongodb+srv://danjaysut:password1234@usersignup-ruhg9.mongodb.net/test?retryWrites=true&w=majority'
    }),
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true
    }
}));

app.post('/login', (req, res) => {
    // ---------------
    // check login
    // if logged in
    // ---------------
    req.session.userID = nanoID();
    req.session.name = req.body.name;
    req.session.save();
    res.send('message recieved');   // This is what gets sent to insomnia rest client - (new request post / firm url encoded)
});

// change later - just an example for now how to connect react to express
app.get('/ping', async(req, res) => {
    let loggedIn = await getSession(req.session.userID);
    if (loggedIn) {
        res.send('pong');
    } else {
        res.send('get a session first');
    }
});

app.listen(8080, () => {
    console.log('server running on port 8080');
});

// Everything above is all we need for backend