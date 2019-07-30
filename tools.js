const request = require('request');
const mysql = require('mysql');

module.exports = {

    /**
    * Return random image URLs from an API
    * @param string keyword - search term
    * @param int    imageCount - number of random images
    * @return array of image URLs
    */
    getRandomImages_cb: function (keyword, imageCount, callback) {
         var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=b6c3405357b3cfe3cbba3a2cd593da04c1399dfd059de042095747956b08b4f1&orientation=landscape";
         request(requestURL, function(error, response, body) {
            if (!error) {
                var parsedData = JSON.parse(body);
                var imageURLs = [];

                for (let i = 0; i < 9; i++) {
                    imageURLs.push(parsedData[i].urls.regular);
                }

                //return imageURLs;
                callback(imageURLs);
            } else {
                console.log("error", error);
            }
        });
    },


    /**
    * Return random image URLs from an API
    * @param string keyword - search term
    * @param int    imageCount - number of random images
    * @return array of image URLs
    */
    getRandomImages: function (keyword, imageCount) {
         var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=b6c3405357b3cfe3cbba3a2cd593da04c1399dfd059de042095747956b08b4f1&orientation=landscape";

         return new Promise(function (resolve, reject) {
            request(requestURL, function(error, response, body) {
                if (!error) {
                    var parsedData = JSON.parse(body);
                    var imageURLs = [];

                    for (let i = 0; i < imageCount; i++) {
                        imageURLs.push(parsedData[i].urls.regular);
                    }

                    resolve(imageURLs);
                } else {
                    console.log("error", error);
                }
            });
        });
    },


    /**
     * creates a databse cconnection
     * @return connection object
     * */
    createConnection: function(){
        var conn = mysql.createConnection({
            host: "us-cdbr-iron-east-02.cleardb.net",
            user: "b556860711a039",
            password: "b97e025f",
            database: "heroku_69e93fad5cd5235"
        });
        return conn;
    }
};