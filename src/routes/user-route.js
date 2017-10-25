import { getAll,
    getOne,
    create,
    update,
    remove } from '../controllers/user-controller';

export default (app) => {
    app.route('/users')
        .get(getAll)
        .post(create);

    app.route('/users/:username')
        .get(getOne)
        .patch(update)
        .delete(remove);
};
