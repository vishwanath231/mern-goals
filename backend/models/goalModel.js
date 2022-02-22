import mongoose from "mongoose";
const Schema = mongoose.Schema;

const goalSchema = new Schema({
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

const Goal = mongoose.model('users', goalSchema);

export default Goal;