import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Property from "@/models/property";

import { uploadFile } from "@/utils/s3";
import multer from "multer";
import { promisify } from "util";

// Create a multer instance and configure it
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }).array("images");
const uploadMiddlewareAsync = promisify(uploadMiddleware);

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                await uploadMiddlewareAsync(req, res);

                req.body.details = JSON.parse(req.body.details);
                req.body.features = JSON.parse(req.body.features);
                req.body.services = JSON.parse(req.body.services);

                req.body.user = req.user.id;

                const files = req.files;
                const result = await uploadFile(files);

                const updateImages = [];

                for (let i = 0; i < result.length; i++) {
                    updateImages.push({
                        public_id: result[i].key,
                        url: result[i].Location,
                    });
                }

                req.body.images = updateImages;

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

export const config = {
    api: {
        bodyParser: false,
    },
};

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
