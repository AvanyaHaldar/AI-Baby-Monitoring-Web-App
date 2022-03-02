status = "";
objects = [];
alarm_sound = "";

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);

}

function modelLoaded() {
  console.log("Cocossd Is Initialized");
  status = true;
}

function preload() {
  alarm_sound = loadSound("Alarm.mp3");
}

function draw() {
  image(video, 0, 0, 380, 380);

  /*fill("magenta");
  text("Dog", 300, 30);
  textSize(20);
  noFill();
  stroke("magenta");
  rect(270, 10, 250, 460);

  fill("purple");
  text("Cat", 110, 140);
  textSize(20);
  noFill();
  stroke("purple");
  rect(70, 110, 190, 370);*/

  if (status != "") {
    objectDetector.detect(video, gotResult);

    r = random(255);
    g = random(255);
    b = random(255);

    //console.log("r= " + r + "g= " + g + "b= " + b);
    for (i = 0; i < objects.length; i++) {
      
      document.getElementById("no_of_objects").innerHTML = "Number Of Objects Detected Are :" + objects.length;
      percent = Math.floor(objects[i].confidence * 100);

      if (objects[i].label=="person") {
        document.getElementById("status").innerHTML = "Status :" + " Baby Detected"; 
        alarm_sound.pause(); 
      }
      else{
        document.getElementById("status").innerHTML = "Status :" + " Baby Not Detected";
      alarm_sound.play();
      }

      //console.log(percent);

      fill(r, g, b);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    if (objects.length==0) {
      alarm_sound.play();
    }
  }
}

function gotResult(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    //console.log(result);
    objects = result;
  }
}

function stopSong() {
  alarm_sound.pause();
}