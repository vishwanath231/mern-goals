import mongoose from "mongoose";
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    goal: {
        type: String,
        required: true
    },
    isCheck: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const Goal = mongoose.model('goals', goalSchema);

export default Goal;