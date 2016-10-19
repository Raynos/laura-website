'use strict';

var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var cpr = require('cpr');

var TEMPLATE_FOLDER = path.join(__dirname, '..', 'views', 'pages');
var OUT_FOLDER = path.join(__dirname, '..', 'static');
var ROUTING_MAP = {
    'index.html': 'index.ejs',
    'about.html': 'about.ejs',
    'what-we-do.html': 'what-we-do.ejs',
    'feed.html': 'feed.ejs',
    'wayfare-magazine.html': 'wayfare.ejs',
    'dutch-postage-stamps-booklet.html': 'stamps.ejs',
    'chromium-tech-trade-show-banner.html': 'chromium.ejs',
    'discover-oman-identity.html': 'oman.ejs',
    'north-sea-jazz-poster.html': 'nsj.ejs',
    'metro-nova-type-specimen.html': 'metro.ejs',
    'logos.html': 'logos.ejs',
    '2001-a-space-odyssey.html': 'space.ejs',
    'alice-in-wonderland.html': 'alice.ejs'
};

var fileNames = Object.keys(ROUTING_MAP);
for (var i = 0; i < fileNames.length; i++) {
    var fileName = fileNames[i];
    var templateName = path.join(
        TEMPLATE_FOLDER, ROUTING_MAP[fileName]
    );

    var templateStr = fs.readFileSync(templateName, 'utf8');
    templateStr = preprocess(templateStr);


    var htmlStr = ejs.render(templateStr, {}, {
        filename: templateName
    });

    fs.writeFileSync(
        path.join(OUT_FOLDER, fileName),
        htmlStr,
        'utf8'
    );
}

function preprocess(templateStr) {
    return templateStr
        .replace(/href="\/([^"]+)"/g, replaceFunc)
        .replace(/prev: '\/([^']+)'/g, replacePrev)
        .replace(/next: '\/([^']+)'/g, replaceNext);

    function replaceFunc(x, p1) {
        if (p1 === '/' || p1 === '') {
            // return 'href="./"';
            return x;
        } else if (p1 === '#') {
            return x;
        } else if (p1[0] === '?') {
            // console.log('---', p1);

            // var str = 'href="./' + p1 + '"';
            // console.log('---', str);
            return x;
        }

        // if (p1[0] === '/') {
        //     p1 = p1.substr(1);
        // }

        // console.log('fff', p1);

        // console.log('matched', x, p1);
        return 'href="' + p1 + '.html"';
    }

    function replacePrev(x, p1) {
        return "prev: '" + p1 + ".html'";
    }

    function replaceNext(x, p1) {
        return "next: '" + p1 + ".html'";
    }
}

console.log('templates build');

cpr(
    path.join(__dirname, '..', 'public'),
    path.join(__dirname, '..', 'static'),
    onCopy
);

function onCopy() {
    console.log('copy complete');
}
