import AWS from "aws-sdk";
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const uploadFile = async (files) => {
    console.log("files to upload s3 :", files);

    const uploadPromises = files.map(async (file) => {
        console.log("file :", file);
        const fileStream = fs.createReadStream(file.path);

        const s3 = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
            signatureVersion: "v4",
        });

        const params = {
            Bucket: bucketName,
            Body: fileStream,
            Key: `test/${file.filename}`,
        };

        const uploadResult = await s3.upload(params).promise();
        return uploadResult;
    });

    return Promise.all(uploadPromises);
};

export default uploadFile;