const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

//app.use(express.json()); //middleware to process json

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    //express session initialization
    .use(passport.session())
    //allow passport to use express-session
    

    .use((req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({origin: '*'}))
    .use("/", require("./routes/index.js"));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToekn, profile, done){
    const user = {
        displayName: profile.displayName || profile.username || "Anonymous",
        id: profile.id
    };
    return done(null, user);
}
));

passport.serializeUser((user, done) =>{
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
(req, res) =>{
    console.log(req.user);
    req.session.user = req.user;
    res.redirect('/');
});

app.use('/', require('./routes'));

// app.use('/clients', require('./routes/clients'));
// app.use('/invoices', require('./routes/invoices'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else{
        app.listen(port, () => (console.log(`Running on port ${port}`)));
    }
});


