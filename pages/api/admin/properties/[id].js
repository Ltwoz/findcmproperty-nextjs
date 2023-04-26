import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Property from "@/models/property";
import cloudinary from "@/lib/cloudinary";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "100mb",
        },
    },
};

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const property = await Property.findById(req.query.id);

                res.status(200).json({ success: true, property });
            } catch (error) {
                res.status(404).json({
                    success: false,
                    message: "Property not found.",
                });
            }
            break;
        case "PUT":
            try {
                let property = await Property.findById(req.query.id);

                if (!property) {
                    res.status(404).json({
                        success: false,
                        message: "Property not found.",
                    });
                }

                property = await Property.findByIdAndUpdate(
                    req.query.id,
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: true,
                    }
                );

                res.status(200).json({ success: true, property });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
            break;
        case "DELETE":
            try {
                const property = await Property.findById(req.query.id);

                if (!property) {
                    res.status(400).json({
                        success: false,
                        message: "Property not found.",
                    });
                }

                cloudinary.api.delete_resources_by_prefix(
                    `properties/${req.query.id}`,
                    (err) => {
                        console.log(err);
                        cloudinary.v2.api.delete_folder(
                            `properties/${req.query.id}`,
                            (err) => {
                                console.log(err);
                            }
                        );
                    }
                );

                await property.remove();

                https: res.status(200).json({
                    success: true,
                    message: "Property Delete Successfully.",
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
