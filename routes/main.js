var reqHTML = require('./request_html');
var resourceManager = require('./resourceManager');


const hostName = "gmarket.co.kr";
const url = 'http://' + hostName;
var bring = function (req, res) {
    resourceManager.resourceDownloader(url);
    setTimeout(function () {
        reqHTML.reqHTML(url, function (reqBody) {

            var context = {results: reqBody};
            req.app.render('test1', context, function (err, html) {
                if (err) {
                    console.error('뷰 렌더링 중 에러 발생 : ' + err.stack);
                    return;
                }
                res.end(html);
                console.log('response');
            });
        });
    }, 100)
};


module.exports.bring = bring;
