import { getAll,
    getOne,
    create,
    update,
    remove } from '../controllers/blocked-site-controller';

export default (app) => {
    app.route('/blocked-sites')
        .get(getAll)
        .post(create);

    app.route('/blocked-sites/:url')
        .get(getOne)
        .patch(update)
        .delete(remove);
};
