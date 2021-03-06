import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';
import userRoute from './routes/user-route';
import blockedSitesRoute from './routes/blocked-site-route';
import forgotPwRoute from './routes/forgot-pw-route';
import authCheck from './middleware/auth-check';

const app = new Express()
const cfg = config()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(authCheck);
app.use(cors());

if(process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

mongoose.Promise = require('bluebird');
mongoose.connect(cfg.DATABASE, {useMongoClient: true});

app.get('/', (req, res) => {
    res.json({'message': 'Nothing to see here'});
});

userRoute(app);
blockedSitesRoute(app);
forgotPwRoute(app);

app.listen(cfg.PORT, () => {
    console.log(`Listening to port ${cfg.PORT}`);
});
