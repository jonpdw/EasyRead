const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();
export async function quickStart(text: string) {
  
  const ssml_text = `<speak>${text}</speak>`

  const request = {
    input: {ssml: ssml_text},
    voice: {languageCode: 'en-US', name: 'en-US-Wavenet-J'},
    audioConfig: {audioEncoding: 'MP3', speakingRate: 1.3},
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
// quickStart(); 

// module.exports.quickStart = quickStart

