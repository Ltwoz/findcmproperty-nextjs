import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Property from "@/models/property";
import cloudinary from "@/lib/cloudinary";

import { uploadFile, deleteFiles } from "@/utils/s3";
import multer from "multer";
import { promisify } from "util";

// Create a multer instance and configure it
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }).array("files");
const uploadMiddlewareAsync = promisify(uploadMiddleware);

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
                await uploadMiddlewareAsync(req, res);

                let property = await Property.findById(req.query.id);

                if (!property) {
                    res.status(404).json({
                        success: false,
                        message: "Property not found.",
                    });
                }

                req.body.details = JSON.parse(req.body.details);
                req.body.features = JSON.parse(req.body.features);
                req.body.services = JSON.parse(req.body.services);

                // Images Array
                const oldImages = property.images || [];
                const currentImages = [];
                const updateImages = [];
                const files = req.files;

                // JSON Parse images if it's not undefined
                if (req.body.images !== undefined) {
                    for (let i = 0; i < req.body.images.length; i++) {
                        const image = req.body.images[i];
                        currentImages.push(JSON.parse(image));
                    }
                }
                console.log("currentImages:", currentImages);

                // Check unmatched
                const unmatchedImages = oldImages.filter(
                    (img) =>
                        !currentImages.some(
                            (image) => image.public_id === img.public_id
                        )
                );
                console.log("unmatchedImages :", unmatchedImages);

                //Deleting Images From AWS S3
                await deleteFiles(unmatchedImages);

                // Upload Images
                const result = await uploadFile(files);

                if (currentImages.length === 0) {
                    for (let i = 0; i < result.length; i++) {
                        updateImages.push({
                            public_id: result[i].key,
                            url: result[i].Location,
                        });
                    }
                } else {
                    // Push current images and push new images (if have)
                    for (let i = 0; i < currentImages.length; i++) {
                        updateImages.push({
                            public_id: currentImages[i].public_id,
                            url: currentImages[i].url,
                        });
                    }
                    for (let i = 0; i < result.length; i++) {
                        updateImages.push({
                            public_id: result[i].key,
                            url: result[i].Location,
                        });
                    }
                }

                req.body.images = updateImages;

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

                //Deleting Images From AWS S3
                await deleteFiles(property.images);

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

export const config = {
    api: {
        bodyParser: false,
    },
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
