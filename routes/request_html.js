var client = require("cheerio-httpcli");
var URL = require('url');
const resourceType = require('./resourceType');
const savedir = 'http://localhost:3000' + '\\resources\\';     //set save file name


/*
Get HTML file
 */
var reqHTML = function (url, callback) {
    client.fetch(url, function (error, $, res) {
        if (error) throw error;
        for (i in resourceType) {                   //Modify every resource path
            $ = resourcePath('d', i, url, $);    //if define first parameter, use the downloaded local path(null or 'download')
        }
        callback($.html());
    });
};


/*
Setting the path
TYPE is defined in resourceType.js
*/
var resourcePath = function (pathType, TYPE, url, $) {
    $(TYPE).each(function () {
        var path = $(this).attr(resourceType[i]);
        if (path != undefined) {
            var path = URL.resolve(url, path);
            $(this).attr(resourceType[i], path);

            /*
            Setting the downloaded local path that downloaded
            */
            if (pathType != null) {
                var modifiedPath = savedir + URL.parse(path).pathname.replace(/[^a-zA-Z0-9\.]+/g, '_');
                $(this).attr(resourceType[i], modifiedPath);
            }
        }
    });
    return $;
};



module.exports.reqHTML = reqHTML;

