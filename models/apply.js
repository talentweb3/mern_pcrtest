import mongoose from 'mongoose';
import User from './user.js'
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        userId: { type: Schema.ObjectId, ref: User },
        name: { type: String, require: true },
        birth: { type: String, required: true },
        gender: { type: String, default: 'male' },
        passport: { type: String, required: true },
        state: { type: Number, default: 0 },
        result: { type: String, default: ''},
        pdfUrl: { type: String, default: '' },
        docType: { type: Number, default: 1 },
        createAt: { type: String, default: '' },
        validAt: {type:String, default: ''},
        resultAt: {type:String, default: ''},
        updateAt: { type: String, default: '' }
    }
)

const Apply = mongoose.model('Apply', userSchema);

export default Apply;