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
    'alice-in-wonderland.html': 'alice.ejs',
    'bionews-online-newsletter.html': 'bionews.ejs',
    'eco-club.html': 'eco.ejs',
    'reef-protectors.html': 'reef.ejs',
    'saba-sea-scouts.html': 'seascouts.ejs',
    'homestyle.html': 'homestyle.ejs'
};

var CSS_FOLDER = path.join(__dirname, '..', 'public', 'styles');
var OUT_CSS_FOLDER = path.join(__dirname, '..', 'static', 'styles');

function buildTemplates() {
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

        htmlStr = postprocess(htmlStr);

        fs.writeFileSync(
            path.join(OUT_FOLDER, fileName),
            htmlStr,
            'utf8'
        );
    }
}

function postprocess(htmlStr) {
    return htmlStr
        .replace(/href="([\w\/]+)\.css"/g, replaceCSS);

    function replaceCSS(x, p1) {
        if (p1 === 'styles/style') {

            return 'href="styles/build-style.css"';
        }

        return x;
    }
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

function buildCSS() {
    var styleFileName = path.join(CSS_FOLDER, 'style.css');

    var styleText = fs.readFileSync(styleFileName, 'utf8');

    styleText = styleText
        .replace(/\@import url\("([\w-\.]+)"\);/g, replaceImport);

    var buildFileName = path.join(OUT_CSS_FOLDER, 'build-style.css');

    fs.writeFileSync(buildFileName, styleText, 'utf8');

    function replaceImport(x, p1) {
        var contentFilename = path.join(CSS_FOLDER, p1);
        var contentText = fs.readFileSync(contentFilename, 'utf8');

        return contentText;
    }
}

function main() {
    cpr(
        path.join(__dirname, '..', 'public'),
        path.join(__dirname, '..', 'static'),
        onCopy
    );

    function onCopy() {
        console.log('copy complete');

        buildCSS();
        console.log('css build');
        buildTemplates();
        console.log('templates build');
    }
}

main();
