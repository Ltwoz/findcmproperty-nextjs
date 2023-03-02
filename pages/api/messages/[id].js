import dbConnect from "@/lib/db-connect";
import { isAuthenticatedUser } from "@/middlewares/auth";
import Message from "@/models/message";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const message = await Message.findById(req.query.id);

                res.status(200).json({
                    success: true,
                    message,
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        default:
            res.status(405).json({
                success: false,
                message: "Method not allowed.",
            });
            break;
    }
}

export default isAuthenticatedUser(handler);