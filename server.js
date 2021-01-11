"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// import nfetch from "node-fetch"
var mozilla_readability_1 = require("mozilla-readability");
var jsdom_1 = require("jsdom");
var fs_1 = require("fs");
var GoogleTTS = require("./google-tts.js");
console.log("Started");
// function anouncetitle(maindiv: element, docmetadata) {
// let title = jdocument.createelement("p")
//   if ((docmetadata.title === '')) {
//     title.innerhtml = "<h1 >there is no title for this article<h1>"
//   } else {
//     title.innerhtml = `<h1>the title of of this is: ${docmetadata.title}<h1>`
//   }
//   maindiv.prepend(title)
// }
function add_headings_preview(mainDiv) {
    function addBefore(tagType, referenceNode, innerHTML_) {
        var newElement = jdocument.createElement(tagType);
        newElement.innerHTML = innerHTML_;
        referenceNode.before(newElement);
    }
    var refNode = mainDiv.firstElementChild.firstElementChild;
    var h2s = jdocument.querySelectorAll("h2");
    addBefore("p", refNode, "Alright, so the document has " + h2s.length + " headings:<br><break time=\"2s\"></break>");
    var counter = 1;
    h2s.forEach(function (element) {
        addBefore("p", refNode, "<emphasis level=\"moderate\">The <say-as interpret-as=\"ordinal\">" + counter + "</say-as> is:<break time=\"200ms\"></break></emphasis> " + element.textContent + ".<break time=\"2s\"></break><br>");
        counter += 1;
    });
    addBefore("p", refNode, "And that is all the headings.");
    mainDiv.prepend(refNode);
}
function fix_paragraphs() {
    var p = jdocument.querySelectorAll("#readability-page-1 > div > p");
    var paragraphAudio = "<audio src=\"https://www.dropbox.com/s/99psaea4mdemn35/next%20paragraph.mp3?dl=1\"></audio>";
    p.forEach(function (element) {
        element.innerHTML = element.textContent + " <break time=\"500ms\"></break> " + paragraphAudio + " <break time=\"500ms\"></break> ";
    });
}
function add_h2_progress() {
    var h2s = jdocument.querySelectorAll("h2");
    var sectionAudio = "<audio src=\"https://www.dropbox.com/s/5kv2s0fbaoqdakr/new%20section.mp3?dl=1\"></audio>";
    var counter = 1;
    h2s.forEach(function (element) {
        element.innerHTML = sectionAudio + " This next section is the <say-as interpret-as=\"ordinal\">" + counter + "</say-as> out of " + h2s.length + ". <break time=\"500ms\"></break> " + element.textContent + ".<break time=\"2s\"></break><br>";
        counter += 1;
    });
}
function fix_lists() {
    var newListAudio = "<audio src=\"https://www.dropbox.com/s/jmevgv798co1eab/new_list.mp3?dl=1\"></audio>";
    var uls = jdocument.querySelectorAll("ul, ol");
    uls.forEach(function (ul) {
        var div = jdocument.createElement("div");
        div.innerHTML = "<break time=\"500ms\"></break> " + newListAudio + " <break time=\"500ms\"></break>";
        var counter = 1;
        var children = __spreadArrays(ul.children);
        children.forEach(function (child) {
            child.innerHTML = newListAudio + " <say-as interpret-as=\"ordinal\">" + counter + "</say-as> point: <break time=\"500ms\"></break> " + child.innerHTML + " <break time=\"3s\"></break>";
            counter++;
        });
    });
}
var scottHtml = fs_1["default"].readFileSync("Scott_H_Young.html");
var oldDoc = new jsdom_1.JSDOM(scottHtml);
var readabilityObj = new mozilla_readability_1["default"](oldDoc.window.document);
var article = readabilityObj.parse();
var dom = new jsdom_1.JSDOM(article.content);
var jdocument = dom.window.document;
var mainDiv = jdocument.querySelector("#readability-page-1 div");
add_headings_preview(mainDiv);
fix_paragraphs();
add_h2_progress();
fix_lists();
var innerHTML = mainDiv.innerHTML;
fs_1["default"].writeFileSync("new_Scott_Article.html", innerHTML);
GoogleTTS.quickStart(innerHTML);
console.log("Done");
// announceTitle(mainDiv, docMetaData) //todo I will need to make sure to include the heading when the sever sends this back to me
// url = "https://www.scotthyoung.com/blog/2020/10/26/foundation-practices/"
// fetch(url).then(response => response.text())
// .then(html => {
//   let _ = getSimplifiedDom(html)
//   modifyDom(_)
// })
// .catch(err => console.log(err));
