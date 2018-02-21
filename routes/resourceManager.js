// 모듈 로드
var client = require('cheerio-httpcli');
var request = require('request');
var fs = require('fs');
var URL = require('url');
const resourceType = require('./resourceType');
const savedir = __dirname + "/resources";                                //set save file name
if (!fs.existsSync(savedir)) {
    fs.mkdirSync(savedir);
}


/*
Download all resource from page what user request
resource type is defined in resourceType.js file
*/
var resourceDownloader = function (url) {
    client.fetch(url, function (err, $, res) {                       // Get HTML file
        if (err) {
            console.log("error");
            return;
        }
        for (i in resourceType) {                   //Modify every resource path
            $(i).each(function (idx) {                              //Download the file in the html file
                var path = $(this).attr(resourceType[i]);
                if (path != undefined) {
                    path = URL.resolve(url, path);                                      //change relative path to absolute(http://abc.com/image/a.jpg)
                    var fname = URL.parse(path).pathname;                                //Set the save file name
                    fname = savedir + "/" + fname.replace(/[^a-zA-Z0-9\.]+/g, '_');     //remove special character( '/' to '_')
                    request(path).pipe(fs.createWriteStream(fname));                     //Download
                }
            });
        }
    });
    console.log('downlaoder');
}

module.exports.resourceDownloader = resourceDownloader;


