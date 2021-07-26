const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {

    const record = event.Records[0].s3;
    const bucketName = record.bucket.name;
    const file = record.object;

    const parameters = {
        Bucket: bucketName,
        Key: 'images.json'
    };

    const uploadParameters = {
        Body: file,
        contentType: 'json',
        Bucket: bucketName,
        Key: 'images.json'
    };
    const uploadImage = async () => {
        let res = await new Promise((resolve, reject) => {
            s3.putObject(parameters, (err, result) => {
                if (!err) resolve(result);
            });
        });
        return res;
    };

    s3.getObject(parameters, (err, res) => {
        if (!err) {
            let data = res.Body;
            data.push(file);
            uploadParameters.Body = data;
        }
    });

    return uploadImage();
};