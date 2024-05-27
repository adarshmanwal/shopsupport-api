const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const port = process.env.PORT || 3000;
const config = require('./config/config.js');
const routes = require('./routes');


const sequelize = new Sequelize(config.development);
sequelize.authenticate()
    .then(() => console.log('Database connected.'))
    .catch(err => console.error('Unable to connect to the database:', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);