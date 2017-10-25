import mongoose from 'mongoose';

const schema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('BlockedSite', schema);
