import dbConnect from "@/lib/db-connect";
import { isAuthenticatedUser } from "@/middlewares/auth";
import Message from "@/models/message";
import ApiFeatures from "@/utils/api-features";

async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const resultPerPage = 5;

                const apiFeature = new ApiFeatures(Message.find(), req.query)
                    .search()
                    .filter()
                    .sort();

                let messages = await apiFeature.query;

                let filteredMessagesCount = messages.length;

                apiFeature.pagination(resultPerPage);

                messages = await apiFeature.query.clone();

                const totalPageCount = Math.ceil(
                    filteredMessagesCount / resultPerPage
                );

                res.status(200).json({
                    success: true,
                    messages,
                    filteredMessagesCount,
                    totalPageCount
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