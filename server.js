const express = require('express');
const dotenv = require('dotenv');
const exphbs  = require('express-handlebars');
const db = require('./models/index');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session')
const pgStore = require('connect-pg-simple')(session)
const pool = require('./config/db');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
    store: new pgStore({
        pool: pool,
        schemaName: 'public',
        tableName: 'user_session'
    }),
    secret: 'my secret value',
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next)=>{
    try {
        res.locals.user = req.session.user
        next()
    } catch (error) {
        console.log(error);
    }
})
const hbs = exphbs.create({ extname: '.hbs' });

app.engine('.hbs', hbs.engine); 

app.set('views', path.join(__dirname + '/view'));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', require('./routes/auth.route'))
app.use('/admin', require('./routes/product.route'))
app.use('/product', require('./routes/home.route'))
app.use('/order', require('./routes/order.route'))
app.use('/comment', require('./routes/comment.route'))
app.use('/', require('./routes/home.route'));

const start = async () => {
    try {
        const connect = await db.sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
