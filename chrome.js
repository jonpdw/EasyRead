function anounceTitle(maindiv, docMetaData) {
    let title = document.createElement("p")
    if ((docMetaData.title === '')) {
        title.innerHTML = "<h1 >There is no title for this article<h1>"
    } else {
        title.innerHTML = `<h1>The title of of this is: ${docMetaData.title}<h1>`
    }
    maindiv.prepend(title)
  }
  
  function add_headings_preview(maindiv) {
  
    function addBefore(tagType, refereneNode, innerHTML_) {
        let newElement = document.createElement(tagType)
        newElement.innerHTML = innerHTML_
        refereneNode.before(newElement)
    }
  
    let refNode = maindiv.firstElementChild
    let h2s = document.querySelectorAll("h2")
    addBefore("p", refNode, `Alright, so the document has ${h2s.length} headings:<br><break time="2s"></break>`)
  
    let counter = 1
    h2s.forEach(element => {
        addBefore("p", refNode, `<emphasis level="moderate">The <say-as interpret-as="ordinal">${counter}</say-as> is:<break time="200ms"></break></emphasis> ${element.textContent}.<break time="2s"></break><br>`)
        counter += 1
    });
  
    addBefore("p", refNode, "And that is all the headings.")
    maindiv.prepend(refNode)
  }
  
  function fix_paragraphs(maindiv) {
    let p = document.querySelectorAll("#readability-page-1 > div > p")
    let paragraphAudio = `<audio src="https://www.dropbox.com/s/99psaea4mdemn35/next%20paragraph.mp3?dl=1"></audio>`
    p.forEach(element => {
        element.innerHTML = `${element.textContent} <break time="500ms"></break> ${paragraphAudio} <break time="500ms"></break> `
    })
  }
  
  function add_h2_progress(maindiv) {
    let h2s = document.querySelectorAll("h2")
    let sectionAudio = `<audio src="https://www.dropbox.com/s/5kv2s0fbaoqdakr/new%20section.mp3?dl=1"></audio>`
    let counter = 1
    h2s.forEach(element => {
        element.innerHTML = `${sectionAudio} This next section is the <say-as interpret-as="ordinal">${counter}</say-as> out of ${h2s.length}. <break time="500ms"></break> ${element.textContent}.<break time="2s"></break><br>`
        counter += 1
    });
  }
  
  function fix_lists(maindiv) {
    let newListAudio = `<audio src="https://www.dropbox.com/s/jmevgv798co1eab/new_list.mp3?dl=1"></audio>`
    let uls = document.querySelectorAll("ul, ol")
  
    uls.forEach(ul => {
        let div = document.createElement("div")
        div.innerHTML = `<break time="500ms"></break> ${newListAudio} <break time="500ms"></break>`
        let counter = 1
        let children = [...ul.children]
        children.forEach( child => {
            child.innerHTML = `${newListAudio} <say-as interpret-as="ordinal">${counter}</say-as> point: <break time="500ms"></break> ${child.innerHTML} <break time="3s"></break>`
            counter++
        })
    })
  }
  
//   let scottHtml = fs.readFileSync("Scott_H_Young.html")
//   var oldDoc = new JSDOM(scottHtml)
//   let readabilityObj = new Readability(oldDoc.window.document);
//   let article = readabilityObj.parse();
//   let dom = new JSDOM(article.content)
//   let document = dom.window.document
  
  let maindiv = document.querySelector("#readability-page-1 div")
  add_headings_preview(maindiv)
  fix_paragraphs(maindiv)
  add_h2_progress(maindiv)
  fix_lists(maindiv)

  maindiv.innerHTML

//   fs.writeFileSync("new_Scott_Article.html", dom.serialize())
  
  
//   console.log("Done")