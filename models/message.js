import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        readed: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

export default mongoose.models.Message ||
    mongoose.model("Message", MessageSchema);
