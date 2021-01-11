async function main() {

  const playButton = document.getElementById('play-button')
  const pauseButton = document.getElementById('pause-button')
  const stopButton = document.getElementById('stop-button')
  const resumeButton = document.getElementById('resume-button')
  const textInput = document.getElementById('text')
  const speedInput = document.getElementById('speed')
  let currentCharacter;

  async function getLisa() {
    let voices = await new Promise(
      function (resolve, reject) {
        let synth = window.speechSynthesis;
        let id;

        id = setInterval(() => {
          if (synth.getVoices().length !== 0) {
            resolve(synth.getVoices());
            clearInterval(id);
          }
        }, 10);
      }
    )
    return voices.filter(x => x.voiceURI === "Lisa Infovox iVox HQ")[0]
  }

  let lisa = await getLisa()

  let audio = new Audio("{{ url_for('static', filename='Blow.mp3') }}");

  playButton.addEventListener('click', () => {playText(textInput.value, lisa)})
  pauseButton.addEventListener('click', pauseText)
  resumeButton.addEventListener('click', resumeText)
  stopButton.addEventListener('click', stopText)
  speedInput.addEventListener('input', () => {stopText(); playText(utterance.text.substring(currentCharacter), lisa)})
  audio.addEventListener("ended", resumeText)

  const utterance = new SpeechSynthesisUtterance()
  let currentSpokenWord = ""

  utterance.addEventListener('boundary', e => {
    console.log(currentSpokenWord)
    let nextWord = utterance.text.substring(e.charIndex, e.charIndex + e.charLength)
    if (currentSpokenWord === "way") {
      speechSynthesis.pause()
      audio.play();
    }
    currentSpokenWord = nextWord
    
  })


  function playText(text, lisa1) {
    if (speechSynthesis.paused && speechSynthesis.speaking) {
      return speechSynthesis.resume()
    }
    if (speechSynthesis.speaking) return
    utterance.text = text
    utterance.voice = lisa1
    utterance.rate = speedInput.value || 1
    textInput.disabled = true
    speechSynthesis.speak(utterance)
  }

  utterance.addEventListener('end', () => {
    textInput.disabled = false
  })

  function pauseText() {
    if (speechSynthesis.speaking) speechSynthesis.pause()
  }

  function resumeText() {
    speechSynthesis.resume()
  }

  function stopText() {
    speechSynthesis.resume()
    speechSynthesis.cancel()
  }


}
main()

