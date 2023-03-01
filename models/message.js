import mongoose from "mongoose";
import user from "./user";

const MessageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Property Name"],
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Message ||
    mongoose.model("Message", MessageSchema);
