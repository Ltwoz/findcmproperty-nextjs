import dbConnect from "@/lib/db-connect";
import { authorizeRoles, isAuthenticatedUser } from "@/middlewares/auth";
import Property from "@/models/property";
import axios from "axios";

const cloudName = process.env.CLOUDINARY_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const handler = async (req, res) => {
    await dbConnect();

    switch (req.method) {
        case "POST":
            try {
                const folderName = req.query.id;

                const { data } = await axios.post(
                    `https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/folders/properties/${folderName}`
                );

                console.log("Logs from api/cloudinary-create-folder.js |", data);

                res.status(201).json({ success: true, message: "Folder created" });
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
