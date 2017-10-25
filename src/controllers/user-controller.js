import User from '../models/user';
import responseUtil from '../utils/response-util';

const serverErr = responseUtil.serverErr();
const notFound = responseUtil.notFound();

export const getAll = (req, res) => {
    User.find().exec()
        .then(users => {
            res.json({users});
        })
        .catch(err => {
            res.status(serverErr.status).json(serverErr.text);
        });
};

export const getOne = (req, res) => {

};

export const create = (req, res) => {

};

export const update = (req, res) => {

};

export const remove = (req, res) => {

};
