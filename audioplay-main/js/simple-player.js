const audio = new Audio();
const img = new Image();
const button = document.getElementById("play-pause-button");
const trackTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");
const testimg = document.getElementById("testimg");
const volslider = document.getElementById("myRange");
let seeking = false;
let trackNumber = 0;

const track1Button = document.getElementById("track1");
track1Button.onclick = function () {
    audio.src = "audio/track1.webm"
    testimg.src = "images/sunrise.gif"
    trackNumber = 0;
};
const track2Button = document.getElementById("track2");
track2Button.onclick = function () {
    audio.src = "audio/track2.webm"
    testimg.src = "images/sunset.gif"
    trackNumber = 1;

};
const track3Button = document.getElementById("track3");
track3Button.onclick = function () {
    audio.src = "audio/track3.webm"
    testimg.src = "images/twilight.gif"
    trackNumber = 2;

};

button.onclick = function () {
    if (audio.paused) {
        audio.play();

        if (trackNumber == 0) {
            testimg.src = "images/sunrise.gif"
        }
        if (trackNumber == 1) {
            testimg.src = "images/sunset.gif"
        }
        if (trackNumber == 2) {
            testimg.src = "images/twilight.gif"
        }
    } else {
        audio.pause();
        testimg.src = "images/play-retro.gif"

    }

}
audio.oncanplaythrough = () => {
    button.disabled = false;
    seekBar.disabled = false;
};
audio.onplay = function () {
    button.src = "images/pause.svg";

    audio.onpause = function () {
        button.src = "images/play.svg";
    };
};
audio.onended = function () {
    button.src = "images/play.svg";
    trackTime.innerHTML = formatTime(0);
    seekBar.value = 0;
};
audio.onloadedmetadata = function () {
    trackTime.innerHTML = formatTime(0);
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;
    button.src = "images/play.svg";
};
audio.ontimeupdate = function () {
    trackTime.innerHTML = formatTime(audio.currentTime);
    if (!seeking) {
        seekBar.value = Math.floor(audio.currentTime);
    }
};
seekBar.oninput = function () {
    seeking = true;
};
seekBar.onchange = function () {
    audio.currentTime = seekBar.value;
    if (!audio.paused) {
        audio.play();
    }
    seeking = false;
};

function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;

    }
};
// volume slider
volslider.addEventListener("input", (event) => {
    const value = event.target.value;
// have to divide it by 100 because it can only go from 0 to 1
    audio.volume = value/100;
});
