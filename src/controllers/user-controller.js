import validator from 'validator';

import User from '../models/user';
import responseUtil from '../utils/response-util';

const serverErr = responseUtil.serverErr();
const notFound = responseUtil.notFound();
const unprocessable = responseUtil.unprocessable();

export const getAll = (req, res) => {
    User.find().exec()
        .then(users => {
            users = users.map(user => {
                return {
                    user: user.username,
                    email: user.email
                }
            });
            res.json({users});
        })
        .catch(err => {
            res.status(serverErr.status).json(serverErr.text);
        });
};

export const getOne = (req, res) => {
    User.findOne({username: req.params.username}).exec()
        .then(user => {
            if(user) {
                res.json({
                    username: user.username,
                    email: user.email
                });
            } else {
                res.status(notFound.status).json(notFound.text);
            }
        })
        .catch(err => {
            res.status(serverErr.status).json(serverErr.text);
        });
};

export const create = (req, res) => {
    const data = req.body;
    if(typeof(data.username) === 'undefined' ||
        typeof(data.password) === 'undefined' ||
        typeof(data.email) === 'undefined') {

        res.status(unprocessable.status)
            .json(unprocessable.text);
    } else {
        User.findOne({username: data.username}).exec()
            .then(user => {
                if(user) {
                    res.status(409)
                        .json({ message: 'Username already exists'});
                } else if(!validator.isEmail(data.email)) {
                        res.status(unprocessable.status)
                            .json({ message: 'Invalid email' });
                } else {
                    const user = User({
                        username: data.username,
                        password: User.generateHash(data.password),
                        email: data.email
                    });

                    user.save()
                        .then(() => {
                            res.status(201)
                                .json({
                                    username: user.username,
                                    email: user.email
                                });
                        })
                        .catch(err => {
                            res.status(serverErr.status).json(serverErr.text);
                        });
                }
            })
            .catch(err => {
                res.status(serverErr.status).json(serverErr.text);
            });
    }
};

export const update = (req, res) => {
    const data = req.body;
    if(typeof(data.password) !== 'undefined') {
        data.password = User.generateHash(data.password);
    }
    User.findOneAndUpdate(
        {username: req.params.username},
        data,
        {new: true})
        .exec()
        .then(user => {
            if(user) {
                res.json({
                    username: user.username,
                    email: user.email
                });
            } else {
                res.status(notFound.status).json(notFound.text);
            }
        })
        .catch(err => {
            res.status(serverErr.status).json(serverErr.text);
        });
};

export const remove = (req, res) => {
    User.findOneAndRemove({username: req.params.username}).exec()
        .then(user => {
            if(user) {
                res.status(204).json({});
            } else {
                res.status(notFound.status).json(notFound.text);
            }
        })
        .catch(err => {
            res.status(serverErr.status).json(serverErr.text);
        });
};
