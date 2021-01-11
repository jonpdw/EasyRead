// import nfetch from "node-fetch"
import Readability from "mozilla-readability"
import {JSDOM} from "jsdom"
import fs from "fs"
import * as GoogleTTS from "./google-tts.js"

console.log("Started")

// function anouncetitle(maindiv: element, docmetadata) {
  // let title = jdocument.createelement("p")
//   if ((docmetadata.title === '')) {
//     title.innerhtml = "<h1 >there is no title for this article<h1>"
//   } else {
//     title.innerhtml = `<h1>the title of of this is: ${docmetadata.title}<h1>`
//   }
//   maindiv.prepend(title)
// }

function add_headings_preview(mainDiv: Element) {

  function addBefore(tagType: string, referenceNode: Element, innerHTML_: string) {
    let newElement = jdocument.createElement(tagType)
    newElement.innerHTML = innerHTML_
    referenceNode.before(newElement)
  }

  let refNode = mainDiv.firstElementChild!.firstElementChild!
  let h2s = jdocument.querySelectorAll("h2")
  addBefore("p", refNode, `Alright, so the document has ${h2s.length} headings:<br><break time="2s"></break>`)

  let counter = 1
  h2s.forEach(element => {
    addBefore("p", refNode, `<emphasis level="moderate">The <say-as interpret-as="ordinal">${counter}</say-as> is:<break time="200ms"></break></emphasis> ${element.textContent}.<break time="2s"></break><br>`)
    counter += 1
  });

  addBefore("p", refNode, "And that is all the headings.")
  mainDiv.prepend(refNode)
}

function fix_paragraphs() {
  let p = jdocument.querySelectorAll("#readability-page-1 > div > p")
  let paragraphAudio = `<audio src="https://www.dropbox.com/s/99psaea4mdemn35/next%20paragraph.mp3?dl=1"></audio>`
  p.forEach(element => {
    element.innerHTML = `${element.textContent} <break time="500ms"></break> ${paragraphAudio} <break time="500ms"></break> `
  })
}

function add_h2_progress() {
  let h2s = jdocument.querySelectorAll("h2")
  let sectionAudio = `<audio src="https://www.dropbox.com/s/5kv2s0fbaoqdakr/new%20section.mp3?dl=1"></audio>`
  let counter = 1
  h2s.forEach(element => {
    element.innerHTML = `${sectionAudio} This next section is the <say-as interpret-as="ordinal">${counter}</say-as> out of ${h2s.length}. <break time="500ms"></break> ${element.textContent}.<break time="2s"></break><br>`
    counter += 1
  });
}

function fix_lists() {
  let newListAudio = `<audio src="https://www.dropbox.com/s/jmevgv798co1eab/new_list.mp3?dl=1"></audio>`
  let uls = jdocument.querySelectorAll("ul, ol")

  uls.forEach(ul => {
    let div = jdocument.createElement("div")
    div.innerHTML = `<break time="500ms"></break> ${newListAudio} <break time="500ms"></break>`
    let counter = 1
    let children = [...ul.children]
    children.forEach(child => {
      child.innerHTML = `${newListAudio} <say-as interpret-as="ordinal">${counter}</say-as> point: <break time="500ms"></break> ${child.innerHTML} <break time="3s"></break>`
      counter++
    })
  })
}

let scottHtml = fs.readFileSync("Scott_H_Young.html")
var oldDoc = new JSDOM(scottHtml)
let readabilityObj = new Readability(oldDoc.window.document);
let article = readabilityObj.parse()!;
let dom = new JSDOM(article.content)
let jdocument = dom.window.document

let mainDiv = jdocument.querySelector("#readability-page-1 div")!
add_headings_preview(mainDiv)
fix_paragraphs()
add_h2_progress()
fix_lists()

let innerHTML = mainDiv.innerHTML
fs.writeFileSync("new_Scott_Article.html", innerHTML)
GoogleTTS.quickStart(innerHTML)

console.log("Done")


// announceTitle(mainDiv, docMetaData) //todo I will need to make sure to include the heading when the sever sends this back to me


// url = "https://www.scotthyoung.com/blog/2020/10/26/foundation-practices/"
// fetch(url).then(response => response.text())
// .then(html => {
//   let _ = getSimplifiedDom(html)
//   modifyDom(_)
// })
// .catch(err => console.log(err));

