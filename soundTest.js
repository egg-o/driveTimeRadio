//drums from https://www.youtube.com/watch?v=tfIeJigRWzk

var currIns = 1;//1 = drums, 2 = piano, 3 = bass
//drums
let drumBeats, d1, d2, d3;
let currDrum;
let drumInd = 0;

//piano
let currPiano;
let pianoMels, p1, p2, p3;
let pianoInd = 0

//bass
let currBass;
let bassMels, b1, b2, b3;
let bassInd = 0

//FX
let rain
let vinyl

function setup() {
    soundFormats('wav, mp3')
    d1 = 'drum-files/drum1.mp3'
    d2 = 'drum-files/drum2.mp3'
    d3 = 'drum-files/drum3.mp3'
    p1 = 'piano/piano1.mp3'
    p2 = 'piano/piano6.mp3'
    p3 = 'piano/piano3.mp3'
    b1 = 'bass-melodies/bass1.mp3'
    b2 = 'bass-melodies/bass2.mp3'
    b3 = 'bass-melodies/bass3.mp3'
    
    createCanvas(600, 600)
    background(50)

    drumBeats = [d1, d2, d3]
    pianoMels = [p1, p2, p3]
    bassMels = [b1, b2, b3]
    currDrum = drumBeats[0]
    currPiano = pianoMels[0]
    currBass = bassMels[0]
}

function draw() {
    background(30)
    push()
    textSize(32)
    fill(255)
    if (currIns == 1) { // Drums
        text('drums', 30, 50);
    }
    else if (currIns == 2) { // Piano
        text('piano', 30, 50);
    }
    else if (currIns == 3) { // Bass
        text('bass',  30, 50);
    }
    text('dB', 30, 100);
    text(drumInd, 100, 100);
    text('pB', 30, 150);
    text(pianoInd, 100, 150);
    text('bB', 30, 200);
    text(bassInd, 100, 200);

    pop()
}

//key mappings
// A = change instrument
// S = change chord / change pattern
// D = play / pause
// Z/X/C/V = Change ambiance
// Q = switch from chords to song
function keyTyped(){
    if (key === 'a' || keyCode == RIGHT_ARROW) { // A - instrument change
        currIns += 1;
        if (currIns > 3) {
            currIns = 1;
        }
    }
    if (key === 's') { // S -  switch
        if (currIns == 1) { // Drums
            drumInd += 1
            if (drumInd >= drumBeats.length) {
                drumInd = 0
            }
            currDrum = drumBeats[drumInd]
            // setTimeout(playTheDrum, 500)
        }
        else if (currIns == 2) { // Piano
            pianoInd += 1
            if (pianoInd >= pianoMels.length) {
                pianoInd = 0
            }
            currPiano = pianoMels[pianoInd]
            // setTimeout(playThePiano, 500)
        }
        else if (currIns == 3) { // Bass
            bassInd += 1
            if (bassInd >= bassMels.length) {
                bassInd = 0
            }
            currBass = bassMels[bassInd]
            // setTimeout(playtheBass, 500)
        }
    }
    if (key === 'd') { // D - play/pause
        if (currIns == 1) {
            currDrum = loadSound(d1)
            currDrum.play()
        }
        else if (currIns == 2) {
            currPiano.play()
            
        }
        else if (currIns == 3) {
            currBass.play()
            
        }
    }
    if (keyCode == 90) { // Play Ambience Rain
        if (isPlaying(rain)) {
            rain.stop()
        } else {
            rain.play()
        }   
    }
    if (keyCode == 120) { // Play Ambience Rain
        if (isPlaying(vinyl)) {
            vinyl.stop()
        } else {
            vinyl.play()
        }   
    }  
}

function playTheDrum() {
    currDrum.loop()
}
function playThePiano() {
    currPiano.loop()
}
function playTheBass() {
    currBass.loop()
}

//console.log("sound done")