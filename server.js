const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');
require('./index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));
app.use((req, res, next) => {
    res.locals.loggedIn = !!req.session.userId;
    next();
});
app.use(flash());

const routes = require('./src/routes/index');
app.use('/', routes);

app.use((req, res) => {
    res.status(404);
    res.render('base', { header: "layouts/header", title: "Page not found", content: "pages/errors/notfound" });
});

const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
