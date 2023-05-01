import Script from "next/script";
import { useEffect, useState } from "react";

const CloudinaryButton = ({ id, cloudName, apiKey, insertHandler }) => {
    const [cloudinaryState, setCloudinaryState] = useState();

    function showWidget() {
        const ml = cloudinaryState.createMediaLibrary(
            {
                cloud_name: cloudName,
                api_key: apiKey,
                remove_header: true,
                folder: {
                    path: `properties/${id}`,
                },
                max_files: 100,
            },
            {
                insertHandler: insertHandler,
            }
        );

        ml.show();
    }

    function handleOnLoad() {
        const cloud = window.cloudinary;
        setCloudinaryState(cloud);
    }

    useEffect(() => {
        const cloud = window.cloudinary;
        setCloudinaryState(cloud);
    }, []);

    return (
        <>
            <Script
                id="cloudinary"
                src="https://media-library.cloudinary.com/global/all.js"
                onLoad={handleOnLoad}
            ></Script>
            <div>
                <button type="button" onClick={showWidget} className="inline-flex items-center bg-gray-300 border rounded-md transition-all overflow-hidden py-2 px-4">
                    Open media library
                </button>
            </div>
        </>
    );
};

export default CloudinaryButton;
