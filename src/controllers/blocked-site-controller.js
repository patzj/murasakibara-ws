import BlockedSite from '../models/blocked-site';
import responseUtil from '../utils/response-util';

const serverErr = responseUtil.serverErr();
const notFound = responseUtil.notFound();
const unprocessable = responseUtil.unprocessable();

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
    BlockedSite.findOne({url: req.params.url}).exec()
        .then(blockSite => {
            if(blockSite) {
                res.json({
                    url: blockSite.url,
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
    if(typeof(data.url) === 'undefined') {
        res.status(unprocessable.status)
            .json(unprocessable.text);
    } else {
        const blockSite = BlockedSite({
            url: data.url
        });

        blockSite.save()
            .then(() => {
                res.status(201)
                    .json({
                        url: blockSite.url
                    });
            })
            .catch(err => {
                res.status(serverErr.status).json(serverErr.text);
            });
    }
};

export const update = (req, res) => {
    const data = req.body;
    BlockedSite.findOneAndUpdate(
        {url: req.params.url},
        data,
        {new: true})
        .exec()
        .then(blockSite => {
            if(blockSite) {
                res.json({
                    url: blockSite.url,
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
    BlockedSite.findOneAndRemove({url: req.params.url}).exec()
        .then(blockSite => {
            if(blockSite) {
                res.status(204).json({});
            } else {
                res.status(notFound.status).json(notFound.text);
            }
        })
        .catch(err => {
            res.status(serverErr.status).json(serverErr.text);
        });
};
