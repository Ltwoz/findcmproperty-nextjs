import dbConnect from "../../../lib/db-connect";
import Property from "../../../models/property";
import ApiFeatures from "../../../utils/api-features";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const resultPerPage = 15;
                const propertiesCount = await Property.countDocuments();

                const apiFeature = new ApiFeatures(Property.find(), req.query)
                    .search()
                    .filter()
                    .location()
                    .sort();

                let properties = await apiFeature.query;

                let filteredPropertiesCount = properties.length;

                apiFeature.pagination(resultPerPage);

                properties = await apiFeature.query.clone();

                const totalPageCount = Math.ceil(
                    filteredPropertiesCount / resultPerPage
                );

                res.status(200).json({
                    success: true,
                    properties,
                    filteredPropertiesCount,
                    resultPerPage,
                    propertiesCount,
                    totalPageCount
                });
            } catch (error) {
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
}
