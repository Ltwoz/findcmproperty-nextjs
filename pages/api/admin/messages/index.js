import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Message from "@/models/message";
import ApiFeatures from "@/utils/api-features";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const resultPerPage = 20;

                const apiFeature = new ApiFeatures(Message.find(), req.query)
                    .filter()

                let messages = await apiFeature.query;

                let fiteredMessagesCount = messages.length;

                apiFeature.pagination(resultPerPage);

                messages = await apiFeature.query.clone();

                const totalPageCount = Math.ceil(
                    fiteredMessagesCount / resultPerPage
                );

                res.status(200).json({
                    success: true,
                    messages,
                    fiteredMessagesCount,
                    totalPageCount,
                });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: "Users not found.",
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
