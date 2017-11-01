import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

schema.statics.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

schema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', schema);
