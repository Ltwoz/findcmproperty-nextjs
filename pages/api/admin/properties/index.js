import dbConnect from "../../../../lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "../../../../middlewares/auth";
import Property from "../../../../models/property";
import ApiFeatures from "../../../../utils/api-features";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const apiFeature = new ApiFeatures(Property.find(), req.query)
                    .search()
                    .filter();

                let properties = await apiFeature.query;

                res.status(200).json({
                    success: true,
                    properties,
                });
            } catch (error) {
                res.status(404).json({
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
