import BlockedSite from '../models/blocked-site';

export const getAll = (req, res) => {
    BlockedSite.find().exec()
        .then(blockSites => {
            res.json({blockSites});
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
