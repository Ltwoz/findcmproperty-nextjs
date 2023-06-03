import { useState } from "react";
import axios from "axios";

function TestS3() {
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        images.forEach((image) => {
            formData.append("images", image);
        });
        formData.set("name", "john")

        const { data } = await axios.post(
            "/api/admin/properties/s3url",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        setPreviewImages(data.result);

        console.log("response :", data.result);
        console.log("images :", images);
    };

    const onFileChange = (event) => {
        const files = Array.from(event.target.files);
        console.log(files);

        files.forEach((file) => {
            setImages((old) => [...old, file]);
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onFileChange}
                    type="file"
                    accept="image/*"
                    multiple
                />
                <button type="submit">Submit</button>
            </form>

            {previewImages.map((image) => (
                <div key={image.key}>
                    <img src={image.Location} alt="image"/>
                </div>
            ))}
        </div>
    );
}

export default TestS3;
