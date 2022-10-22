const azureStorage = require('azure-storage');

uploadFileToBlob = async (directoryPath, file) => {

    const azureStorageConfig = {
        accountName: process.env.AZURE_ACCOUNT_NAME,
        accountKey: process.env.AZURE_ACCOUNT_KEY,
        blobURL: process.env.AZURE_BLOB_URL,
        containerName: process.env.AZURE_CONTAINER_NAME
    };

    return new Promise((resolve, reject) => {

        const blobName = file.originalname;
        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);
        blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, err => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    filename: blobName,
                    originalname: file.originalname,
                    size: streamLength,
                    path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
                    url: `${azureStorageConfig.blobURL}/${directoryPath}/${blobName}`
                });
            }
        });
    });
};  
