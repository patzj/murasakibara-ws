import randomstring from 'randomstring';
import mailgunJS from 'mailgun-js';

import User from '../models/user';
import config from '../config';
import responseUtil from '../utils/response-util';

const serverErr = responseUtil.serverErr();
const notFound = responseUtil.notFound();

export default (req, res) => {
    const pw = randomstring.generate(8);

    User.findOneAndUpdate(
        {email: req.params.email},
        {password: User.generateHash(pw)},
        {new: true})
        .exec()
        .then(user => {
            if(user) {
                const cfg = config();
                const mailgun = mailgunJS({
                    apiKey: 'key-' + cfg.MAILGUN.API_KEY,
                    domain: cfg.MAILGUN.DOMAIN
                });

                // send email
                const data = {
                    from: 'postmaster@' + cfg.MAILGUN.DOMAIN,
                    to: user.email,
                    subject: 'MWS Password Reset',
                    html: '<b>Username: </b>' + user.username + '<br />' +
                        '<b>Password: </b>' + pw
                };

                mailgun.messages().send(data, (err, body) => {
                    if(err) {
                        res.status(serverErr.status).json(serverErr.text);
                    } else {
                        res.json({message: 'OK'});
                    }
                });

            } else {
                res.status(notFound.status).json(notFound.text);
            }
        })
        .catch(err => {
            res.status(serverErr.status).json(serverErr.text);
        });
};
