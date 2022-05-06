//WILL NOT RUN ON P5.JS WEBSITE B/C HE'S TOO CHONKY
//AND WONT LOAD SOUND FAST ENOUGH >:(
//car Vs
let car;
let Zturn;
var baseSpeed = 10;
var spdMultiplier = baseSpeed;
var carHeight = 40;
var carTurnInput = 0;
var carForward = 0;

//landascape variables
let yStart = 400;
let heightMultiplier = 0;

//audio vars
let song;
var amp;
var fft;

//The Radio Bit
showingRadio = true
rClrs = ["#68A7AD", "#99C4C8", "#E5CB9F", "#EEE4AB" ]
let inconsolata;
let instruments = ["a", "Drums", "Piano", "Bass", "Harp"]
let currIns = 1 ;
let drumInd = 0;
let pianoInd = 0;
let bassInd = 0;
let harpInd = 0;
let ambi = "None"

//controller
let controllers = []

//Note: open with live server for processing speed

function preload() {
    //car setup
    car = loadModel('car.obj');

    //music setup
    soundFormats('wav', 'mp3')
    song = loadSound('sfir.mp3');

    inconsolata = loadFont('RadioCanada-Regular.ttf');
}

function setup() {
    createCanvas(700, 400, WEBGL)
    angleMode(DEGREES)
    noiseDetail(4)

    frameRate(30)

    //music setup
    // amp = new p5.Amplitude();
    amp = new p5.AudioIn();
    amp.start();


    // controller
    window.addEventListener("gamepadconnected", function(e) {
        gamepadHandler(e, true);
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
          e.gamepad.index, e.gamepad.id,
          e.gamepad.buttons.length, e.gamepad.axes.length);      
        });
    window.addEventListener("gamepaddisconnected", function(e) {
        console.log("Gamepad disconnected from index %d: %s",
          e.gamepad.index, e.gamepad.id);      
          colour=color(120,0,0)
          gamepadHandler(e, false);
    });   
      
}

function gamepadHandler(event, connecting) {
    let gamepad = event.gamepad;
    if (connecting) {
            print("Connecting to controller "+gamepad.index)
      controllers[gamepad.index] = gamepad
    } else {
      delete controllers[gamepad.index]
    }
}
  
function draw() {

    var amplvl = amp.getLevel() * 5;

    background(30)

        push()
        //neg y moves up 
        translate(0, -height/2, -width)
        drawBack()
        pop()

    push()
        translate(0, 0, -200)
        rotateX(70)
        //rotateZ(frameCount)
        if (keyIsDown(UP_ARROW)) {
            spdMultiplier += 0.5
            carForward += 0.1 + noise(frameCount) * 0.05
        }    
        else
        {
            if (spdMultiplier > baseSpeed) {
                spdMultiplier = spdMultiplier*0.85
            }
            if (carForward > 0) {
                carForward -= 0.1
            }

        }

        song.rate(1 + 1 * map(spdMultiplier, 10, 100, 0, 1))

        var turnBy = 3

        if (keyIsDown(LEFT_ARROW)) {
            if (carTurnInput > -10) {
                carTurnInput -= turnBy
            }
        } else if (keyIsDown(RIGHT_ARROW)) {
            if (carTurnInput < 10) {
                carTurnInput += turnBy
            }
        } else {
            if (carTurnInput!= 0) {
                if (carTurnInput > 0) {
                    carTurnInput -= turnBy
                } else {
                    carTurnInput += turnBy
                }
            }
        }  
    
        var gamepads = navigator.getGamepads()
  
        for (let i in controllers) {
      
            //controller
            let controller=gamepads[i]//controllers[i]
            if (controller.axes) {
                let axes=controller.axes
                if (controller.axes[3] < -0.5) {
                    spdMultiplier = 100
                    carForward += 0.1 + noise(frameCount) * 0.05
                }     
                if (controller.axes[2] < -0.3) { //left
                    if (carTurnInput > -10) {
                        carTurnInput -= turnBy
                    }
                } else if (controller.axes[2] > 0.3) {
                    if (carTurnInput < 10) {
                        carTurnInput += turnBy
                    }
                }   
            }
        }
        
    // rotateZ(map(carTurnInput, -50, 50, -30, 30))

        //landscapeLogic
        var w = 30
        var start = frameCount / 100

        var yoff = 0
        var yCol = -300

        yStart += 1 * spdMultiplier
        heightMultiplier = map(amplvl, 0, 2, 1, 4); // set equal to amplitude


        for (var y = yStart; y >= -height; y -= w) {
            xoff = 0;

            if (y > height) {
                //dont render if y is below screen height
                xoff += 0.1
                yoff += 0.1
                continue;
            }
            if (y > 0) {
                //rendering the area near the car
                for (var x = -750 + 14; x <= -105; x += w) {
                    var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 30) * heightMultiplier

                    var r = map(sin(y / 2), -1, 1, 100, 200)
                    var g = map(y + 200, 0, 50, 100, 200)
                    var b = map(cos(frameCount), -1, 1, 200, 100)
                    
                    push()
                    fill(r, g, b)
                    translate(x, y, -h/2)
                    box(w,w,h)
                    pop()

                    xoff += 0.1

                }
                for (var x = -105; x <= 105; x += w) {
                    if (y < 100 ) {
                        var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 30) * heightMultiplier * ((180-y)/180)
                    }
                    else 
                    {
                        var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 30) * 0.5
                    }

                    var r = map(sin(y - frameCount / 2), -1, 1, 100, 200)
                    var g = map(y + 200, 0, 50, 100, 200)
                    var b = map(cos(frameCount), -1, 1, 200, 100)
                    
                    push()
                    fill(r, g, b)
                    translate(x, y, -h/2)
                    box(w,w,h)
                    pop()

                    xoff += 0.1
                }
                for (var x = 105; x <= 750-14 ; x += w) {
                    var h = map(noise(xoff + start, yoff +  start), 0, 1, -100, 30) * heightMultiplier

                    var r = map(sin(y / 2), -1, 1, 100, 200)
                    var g = map(y + 200, 0, 50, 100, 200)
                    var b = map(cos(frameCount), -1, 1, 200, 100)
                    
                    push()
                    fill(r, g, b)
                    translate(x, y, -h/2)
                    box(w,w,h)
                    pop()

                    xoff += 0.1
                }
            } 
            else {
                //rendering all the front area
                for (var x = -750 + 14; x <= 750-14; x += w) {
                    var h = map(noise(xoff + start, yoff + start), 0, 1, -100, 30) * heightMultiplier

                    var r = map(sin(y / 2), -1, 1, 100, 200)
                    var g = map(y + 200, 0, 50, 100, 200)
                    var b = map(cos(frameCount), -1, 1, 200, 100)
                    
                    push()
                    fill(r, g, b)
                    translate(x, y, -h/2)
                    box(w,w,h)
                    pop()

                    xoff += 0.1
                }
            }
            yCol += 30
            yoff += 0.1
        }

        //carLogic
        carDraw()
    pop()

}

function drawRadio() {
    push()
    translate(-width/2 - 200, -height/2 - 200, 200)
    textFont(inconsolata);
    textAlign(LEFT)
    translate(10, 100)
    fill(255)
    textSize(100)
    text(instruments[currIns], 10, 35)
    textSize(50)
    
    text("Playing Track: ", 10, 95)
    if (currIns == 1) {
        text(str(drumInd), 350, 95)
    }
    else if (currIns == 2) {
        text(str(pianoInd), 350, 95)      
    }
    else if (currIns == 3) {
        text(str(bassInd), 350, 95)        
    }
    else if (currIns == 4) {
        text(str(harpInd), 350, 95)        
    }

    text("Ambiance: " + ambi, 10, 160)
    pop()
}

function drawRadioB() {
    push()

    fill(rClrs[1])
    stroke(rClrs[1])
    translate(-width/2, -height/2)
    translate(width / 10, height/10)
    rect(0,0,8*width/10, 8*height/10, 20)

    fill(rClrs[0])
    stroke(rClrs[0])
    translate(3, 3)
    rect(0,0,8*width/10-6, 8*height/10-6, 20)

    textFont(inconsolata);
    textAlign(LEFT)
    translate(10, 100)
    fill(0)
    textSize(30)
    text(instruments[currIns], 10, 35)
    textSize(20)
    
    text("Playing Track: ", 10, 65)
    if (currIns == 1) {
        text(str(drumInd), 150, 65)

    }
    else if (currIns == 2) {
        text(str(pianoInd), 150, 65)      
    }
    else if (currIns == 3) {
        text(str(bassInd), 150, 65)        
    }
    else if (currIns == 4) {
        text(str(harpInd), 150, 65)        
    }

    text("Ambiance: " + ambi, 10, 95)
    pop()

}

function carDraw() {

    //idea: set a rectangle around the car and anything in this rectagle height goes to 0
    push()
    //need to move Carheight Dynamically
    carHeight = map(noise(frameCount), 0, 1, 40 - 2, 40 + 2)
    translate(0, 250, carHeight)
    scale(40);
    rotateY(180)
    rotateX(270)

    //moves car forward a little bit when adding speed
    if (carForward > .3) {
        carForward -= 0.15
    }
    translate(0,0,-carForward)

    var carTurn = map(carTurnInput, -50, 50, -10, 10)
    var carMove = map(carTurnInput, -100, 100, 5, -5)
    translate(carMove, 0, 0)
    rotateY(carTurn)
    rotateX(-abs(carTurn)) // add to Y to turn in a direction

   normalMaterial()
   model(car);
    pop()
}

function drawBack() {
    //var amplvl = map(noise(frameCount), 0, 1, 0, 400); 

    var color1 = color(0, 0, 153);
    var color2 = color(204, 51, 0);

    // setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");

    if (showingRadio) {
        push()
        drawRadio()
        pop()
    }

    var size = map(amp.getLevel(), 0, 1, 100, 500);
    stroke("#ffcc5f")
    strokeWeight(100)
    noFill()
    stroke("#fb7200")
    ellipse(0, 0, size * 2.5, size * 2.5)
    stroke("#ffcc5f")
    ellipse(0, 0, size, size)
    ellipse(0, 0, size * 2, size * 2)

}


function keyPressed(){
    if (keyCode === BACKSPACE) { 
        showingRadio = !showingRadio
    }
    if (key === 'a' || keyCode ===  RIGHT_ARROW) { // A - instrument change
        currIns += 1;
        if (currIns > 4) {
            currIns = 1;
        }
    }
    if (keyCode === LEFT_ARROW) {
        currIns -= 1;
        if (currIns < 1) {
            currIns = 4;
        }
    }
    if (key === 's' || key === ' ') { // S -  switch
        if (currIns == 1) { // Drums
            drumInd += 1
            if (drumInd >= 2) {
                drumInd = 0
            }
        }
        else if (currIns == 2) { // Piano
            pianoInd += 1
            if (pianoInd >= 5) {
                pianoInd = 0
            }
        }
        else if (currIns == 3) { // Bass
            bassInd += 1
            if (bassInd >= 5) {
                bassInd = 0
            }
        }
        else if (currIns == 4) {
            harpInd += 1
            if (harpInd >= 2) {
                harpInd = 0
            }
        }
    }
    if (key === 'z') {
        ambi = "Fire"
    }
    if (key === 'x') {
        ambi = "Jungle"
    }   
    if (key === 'c') {
        ambi = "Wind"
    }  
    if (key === 'v') {
        ambi = "None"
    } 
    if ( key === 'q') {
        spdMultiplier = 0
    } 
    if (key === 'w' ){ 
        spdMultiplier = 15
    }
    if ( key === 'e') {
        if (!song.isPlaying()) {
            song.play()
        }
        else{
            song.pause()
        }
    }
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == "Y") {  // Top to bottom gradient
      for (let i = y; i <= y+h; i++) {
        var inter = map(i, y, y+h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x+w, i);
      }
    }  
    else if (axis == "X") {  // Left to right gradient
      for (let j = x; j <= x+w; j++) {
        var inter2 = map(j, x, x+w, 0, 1);
        var d = lerpColor(c1, c2, inter2);
        stroke(d);
        line(j, y, j, y+h);
      }
    }
  }