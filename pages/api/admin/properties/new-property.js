import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Property from "@/models/property";

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                req.body.user = req.user.id;

                const property = await Property.create(req.body);

                res.status(201).json({ success: true, property });
            } catch (error) {
                console.log(error);
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
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
