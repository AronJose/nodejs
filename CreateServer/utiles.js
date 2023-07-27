function getReqData(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        // listen to data sent by the client
        req.on("data", (chunk) => {
            // append the string version to the body
            body += chunk.toString();
        });

        // listen till the end
        req.on("end", () => {
            // send back the data
            resolve(body);
        });

        // handle errors if any
        req.on("error", (error) => {
            reject(error);
        });
    });
}

module.exports = { getReqData };