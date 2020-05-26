const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const listRoutes = require('./Routes/lists')
const userRoutes = require('./Routes/user')

mongoose.connect('mongodb+srv://new-fucking-admin:Alphe280401@cluster0-qvyep.mongodb.net/test?retryWrites=true&w=majority\n',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/lists', listRoutes);
app.use('/auth', userRoutes);

module.exports = app;