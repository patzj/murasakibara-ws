import jwt from 'jsonwebtoken';

import config from '../config';
import User from '../models/user';
import responseUtil from '../utils/response-util';

const cfg = config();
const generateToken = user => {
    return jwt.sign({
        username: user.username,
        email: user.email
    },
    cfg.JWT.SECRET, { expiresIn: cfg.JWT.EXPIRATION });
};

const serverErr = responseUtil.serverErr();
const unprocessable = responseUtil.unprocessable();
const badRequest = responseUtil.badRequest();

export default (req, res) => {
    const data = req.body;
    if(typeof(data.username) === 'undefined' ||
        typeof(data.password) === 'undefined') {

        res.status(unprocessable.status)
            .json(unprocessable.text);
    } else {
        User.findOne({username: data.username}).exec()
            .then(user => {
                if(user && user.validatePassword(data.password)) {
                    res.json({
                        username: user.username,
                        token: generateToken(user)
                    })
                } else {
                    res.status(badRequest.status).json(badRequest.text);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(serverErr.status).json(serverErr.text);
            });
    }
}
