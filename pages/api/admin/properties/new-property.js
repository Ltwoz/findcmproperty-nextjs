import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Property from "@/models/property";
import cloudinary from "@/lib/cloudinary";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "50mb",
        },
    },
};

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const newImages = req.body.images || [];
                const updateImages = [];

                const uploadPromises = [];

                for (let i = 0; i < newImages.length; i++) {
                    uploadPromises.push(
                        cloudinary.uploader.upload(
                            newImages[i],
                            function (result) {
                                console.log(result);
                            },
                            {
                                upload_preset: "ml_default",
                            }
                        )
                    );
                }

                const uploadedImages = await Promise.all(uploadPromises);

                for (let i = 0; i < uploadedImages.length; i++) {
                    updateImages.push({
                        public_id: uploadedImages[i].public_id,
                        url: uploadedImages[i].secure_url,
                    });
                }

                req.body.user = req.user.id;
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

export default isAuthenticatedUser(authorizeRoles(handler, "admin"));
