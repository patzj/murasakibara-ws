import jwt from 'jsonwebtoken';

import config from '../config';
import responseUtil from '../utils/response-util';

const cfg = config();
const serverErr = responseUtil.serverErr();
const forbidden = responseUtil.forbidden();

export default (req, res, next) => {
    if(req.url.indexOf('log-in') > -1 ||
        (req.url.indexOf('blocked-sites') > -1 && req.method === 'GET') ||
        (req.url.indexOf('users') > -1 && req.method == 'POST')
    ) {
        next();
    } else {
        if(req.headers['x-api-key']) {
            jwt.verify(req.headers['x-api-key'],
                cfg.JWT.SECRET,
                (err, decoded) => {
                    if(err) {
                        res.status(forbidden.status).json(forbidden.text);
                    } else if(decoded) {
                        next();
                    } else {
                        res.status(forbidden.status).json(forbidden.text);
                    }
                }
            );
        } else {
            res.status(forbidden.status).json(forbidden.text);
        }
    }
};
