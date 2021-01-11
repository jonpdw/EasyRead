const fetch = require('node-fetch');
const {Readability} = require('@mozilla/readability');
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs')
  


function getSimplifiedDom(html) {
  var doc = new JSDOM(html)
  let reader = new Readability(doc.window.document);
  let article = reader.parse();
  return [new JSDOM(article.content), article]
}

function anounceTitle(document, maindiv, docMetaData) {
  let title = document.createElement("p")
  if ((docMetaData.title === '')) {
    title.innerHTML = "<h1 >There is no title for this article<h1>"
  } else {
    title.innerHTML = `<h1>The title of of this is: ${docMetaData.title}<h1>`
  }
  maindiv.prepend(title)
}

function h1Headings(document, maindiv) {
  let h2s = document.querySelectorAll("h2")
  let str = `Alright, so the document has ${h2s.length} headings. `
  let counter = 1
  h2s.array.forEach(element => {
    str += `Number ${counter} is ${element.textContent}.`
    counter += 1
  });
  str += "And that is all the headings."
  let headings = document.createElement("p")
  headings.innerHTML = str
  maindiv.prepend(headings)
}


function modifyDom([dom, docMetaData]){
  let document = dom.window.document
  let maindiv = document.querySelector("#readability-page-1 div")
  h1Headings(document, maindiv)
  anounceTitle(document, maindiv, docMetaData)
  fs.writeFileSync("output.html", dom.serialize())
  console.log("Done")
}

url = "https://www.scotthyoung.com/blog/2020/10/26/foundation-practices/"
fetch(url).then(response => response.text())
.then(html => {
  let _ = getSimplifiedDom(html)
  modifyDom(_)
})
.catch(err => console.log(err));


// let scottHtml = fs.readFileSync("scott.html")

// var doc = new JSDOM(scottHtml)
// let readabilityObj = new Readability(doc.window.document);
// let article = readabilityObj.parse();
// var content = new JSDOM(article.content)

