import { getAll } from '../controllers/blocked-site-controller';

export default (app) => {
    app.route('/blocked-sites')
        .get(getAll);
};
