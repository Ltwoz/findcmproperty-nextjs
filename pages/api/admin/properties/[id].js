import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Property from "@/models/property";
import cloudinary from "@/lib/cloudinary";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
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

                // Images Array
                const oldImages = property.images || [];
                const newImages = req.body.images || [];
                const updateImages = [];

                if (newImages !== undefined) {
                    const unmatchedImages = oldImages.filter(
                        (img) =>
                            !newImages.some(
                                (image) => image.public_id === img.public_id
                            )
                    );

                    // Deleting Images From Cloudinary
                    for (let i = 0; i < unmatchedImages.length; i++) {
                        await cloudinary.uploader.destroy(
                            unmatchedImages[i].public_id
                        );
                    }

                    for (let i = 0; i < newImages.length; i++) {
                        if (typeof newImages[i] === "string") {
                            const result = await cloudinary.uploader.upload(
                                newImages[i],
                                {
                                    folder: "properties",
                                }
                            );

                            updateImages.push({
                                public_id: result.public_id,
                                url: result.secure_url,
                            });
                        } else {
                            updateImages.push({
                                public_id: newImages[i].public_id,
                                url: newImages[i].url,
                            });
                        }
                    }
                    req.body.images = updateImages;
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
