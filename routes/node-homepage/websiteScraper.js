const scrape = require('website-scraper');

let options = {
    urls: ['http://zazabackpackers.com/'],
    directory: './a',
    sources: [
        {selector: 'img', attr: 'src'},
        {selector: 'script', attr: 'src'}
    ]
};

scrape(options).then((result) => {
    console.log("Website succesfully downloaded");
}).catch((err) => {
    console.log("An error ocurred", err);
});