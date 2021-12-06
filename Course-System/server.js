const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const studentRouter = require('./router/studentRouter');
const classRouter = require('./router/classRouter');



//create server app
const app = express();





/* db connection */
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;

db.on('err', () => console.error);
db.once('open', () => console.log('=^.^= DB YEEEP! Connection Established =^.^='));




/* middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger('dev'));


/* routers */
app.use('/users', studentRouter);
app.use('/classes', classRouter);



/* error handler */
app.use((req, res, next) => {
    const err = new Error('Route not defined');
    err.status = 404;

    next(err);
});

app.use((err, req, res, next) => {
    if (err) {
        res
            .status(err.status || 500)
            .json({ error: err });
    }
});




//port
const port = process.env.PORT || 5001;
app.listen(port, () => { console.log('Server up and running on port:', port) });