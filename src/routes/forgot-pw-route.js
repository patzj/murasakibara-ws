import forgotPw from '../controllers/forgot-pw-controller';

export default (app) => {
    app.route('/forgot-password/:email')
        .get(forgotPw)
};
