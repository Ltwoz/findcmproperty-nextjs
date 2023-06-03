import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import uploadFile from "@/utils/s3";
import multer from "multer";
import { promisify } from "util";

// Create a multer instance and configure it
const uploadMiddleware = multer({ dest: 'uploads/' }).array("images");

const uploadMiddlewareAsync = promisify(uploadMiddleware);

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                await uploadMiddlewareAsync(req, res);

                const files = req.files;
                console.log("Uploaded files:", files);

                const result = await uploadFile(files);
                console.log("result:", result);

                return res.status(200).json({ success: true, result });
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
