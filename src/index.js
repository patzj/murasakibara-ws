import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from './config';
import userRoute from './routes/user-route';
import blockedSitesRoute from './routes/blocked-site-route';

const app = new Express()
const cfg = config()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

mongoose.Promise = require('bluebird');
mongoose.connect(cfg.DATABASE, {useMongoClient: true});

app.get('/', (req, res) => {
    res.json({'message': 'Nothing to see here'});
});

userRoute(app);
blockedSitesRoute(app);

app.listen(cfg.PORT, () => {
    console.log(`Listening to port ${cfg.PORT}`);
});
