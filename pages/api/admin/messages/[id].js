import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Message from "@/models/message";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "DELETE":
            try {
                const message = await Message.findById(req.query.id);

                if (!message) {
                    res.status(400).json({
                        success: false,
                        message: "Message not found.",
                    });
                }

                await message.remove();

                res.status(200).json({
                    success: true,
                    message: "Message Delete Successfully.",
                });
            } catch (error) {
                res.status(400).json({
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
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
