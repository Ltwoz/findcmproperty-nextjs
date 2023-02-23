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
        case "POST":
            try {
                let images = [];

                if (typeof req.body.images === "string") {
                    images.push(req.body.images);
                } else {
                    images = req.body.images;
                }

                const imagesLinks = [];

                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i], {
                        folder: "properties",
                    });

                    imagesLinks.push({
                        public_id: result.public_id,
                        url: result.secure_url,
                    });
                }

                req.body.user = req.user.id;
                req.body.images = imagesLinks;

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
