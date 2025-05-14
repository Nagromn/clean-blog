const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
require('./index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
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
const routes = require('./src/routes/index');
app.use('/', routes);

const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
