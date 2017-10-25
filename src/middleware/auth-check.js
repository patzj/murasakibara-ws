import jwt from 'jsonwebtoken';

import config from '../config';
import responseUtil from '../utils/response-util';

const cfg = config();
const serverErr = responseUtil.serverErr();
const forbidden = responseUtil.forbidden();

export default (req, res, next) => {
    if((req.url === '/blocked-sites' && req.method !== 'GET') ||
        (req.url !== '/blocked-sites' && req.url !== '/log-in')) {
        console.log(req.url);
        if(req.headers['x-api-key']) {
            jwt.verify(req.headers['x-api-key'],
                cfg.JWT.SECRET,
                (err, decoded) => {
                    if(err) {
                        res.status(serverErr.status).json(serverErr.text);
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
    } else {
        next();
    }
};
