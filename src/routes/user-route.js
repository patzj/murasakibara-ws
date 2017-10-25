import { getAll } from '../controllers/user-controller';

export default (app) => {
    app.route('/users')
        .get(getAll);
};
