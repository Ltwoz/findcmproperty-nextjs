import dbConnect from "@/lib/db-connect";
import {
    authorizeRoles,
    isAuthenticatedUser,
} from "@/middlewares/auth";
import Property from "@/models/property";
import cloudinary from "@/lib/cloudinary";

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

                // Images
                let images = [];

                if (typeof req.body.images === "string") {
                    images.push(req.body.images);
                } else {
                    images = req.body.images;
                }

                if (images !== undefined) {
                    // Deleting Images From Cloudinary
                    for (let i = 0; i < property.images.length; i++) {
                        await cloudinary.uploader.destroy(
                            property.images[i].public_id
                        );
                    }

                    const imagesLinks = [];

                    for (let i = 0; i < images.length; i++) {
                        const result = await cloudinary.uploader.upload(
                            images[i],
                            {
                                folder: "properties",
                            }
                        );

                        imagesLinks.push({
                            public_id: result.public_id,
                            url: result.secure_url,
                        });
                    }
                    req.body.images = imagesLinks;
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
                res.status(400).json({
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

                for (let i = 0; i < property.images.length; i++) {
                    await cloudinary.uploader.destroy(
                        property.images[i].public_id
                    );
                }

                await property.remove();

                res.status(200).json({
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
