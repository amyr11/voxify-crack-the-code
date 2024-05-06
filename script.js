const voicesDropdown = document.querySelector("#voices");
const rateInput = document.querySelector("#rate");
const pitchInput = document.querySelector("#pitch");
const textarea = document.querySelector("#textarea");
const stopButton = document.querySelector("#stop-button");
const speakButton = document.querySelector("#speak-button");

const message = new SpeechSynthesisUtterance(textarea.value);
let voices = [];

function populateVoices() {
    voices = this.getVoices();
    for (let index = 0; index < voices.length; index++) {
        const voiceOption = document.createElement("option");
        voiceOption.setAttribute("value", voices[index].name);
        voiceOption.innerHTML = `${voices[index].name} (${voices[index].lang})`;
        voicesDropdown.appendChild(voiceOption);
    }
}

function setVoice() {
    for (let index = 0; index < voices.length; index++) {
        if (voicesDropdown.value === voices[index].name) {
            message.voice = voices[index];
        }
    }
}

function setRate() {
    message.rate = rateInput.value;
}

function setPitch() {
    message.pitch = pitchInput.value;
}

function setText() {
    message.text = textarea.value;
}

function stopVoice() {
    speechSynthesis.cancel();
}

function speakVoice() {
    speechSynthesis.speak(message);
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
rateInput.addEventListener("change", setRate);
pitchInput.addEventListener("change", setPitch);
textarea.addEventListener("change", setText);
voicesDropdown.addEventListener("change", setVoice);
stopButton.addEventListener("click", () => speechSynthesis.cancel());
speakButton.addEventListener("click", () => speechSynthesis.speak(message));