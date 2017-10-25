import { getAll,
    getOne,
    create,
    update,
    remove } from '../controllers/user-controller';
import logIn from '../controllers/log-in-controller';

export default (app) => {
    app.route('/users')
        .get(getAll)
        .post(create);

    app.route('/users/:username')
        .get(getOne)
        .patch(update)
        .delete(remove);

    app.route('/login')
        .post(logIn);
};
