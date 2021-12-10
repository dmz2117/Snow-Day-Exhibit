let doodleClassifier;
let video;
let detection=[];

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      if (deviceInfo.kind == "videoinput") {
          console.log(deviceInfo);
      }
  }
}

function streamCameras() {
  for (var i = 0; i < 2; i++) {
      console.log(videolist[i]);
  }
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowHeight*1.333, windowHeight);
  video.hide();

  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  frameRate(10);
}

function modelReady() {
  console.log('model loaded');
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  detection = results;
  doodleClassifier.classify(canvas, gotResults);
}

function finishImage() {
  let myImg = get((windowWidth/2)-((windowHeight*1.333)/2), 0, windowHeight*1.333, windowHeight);
  
}

function draw() {
  clear();
  image(video, (windowWidth/2)-((windowHeight*1.333)/2), 0, windowHeight*1.333, windowHeight);
  filter(THRESHOLD, 0.5);
  fill(0);
  textSize(25);

  if (detection.length != 0) {
    let guess1 = detection[0];
    let guess2 = detection[1];
    let guess3 = detection[2];
    let x=50;
    let y=50;
    text('I mostly see a ' + guess1.label +' '+ round(guess1.confidence * 100, 0) +'%', x, y);
    textSize(20);
    text('or maybe a '+ guess2.label +' '+ round(guess2.confidence * 100, 0) +'%', x, y+30);

    if(guess1.confidence<0.3){
      textSize(25);
      text("but I'm not really sure!", x, y+60)
    }
  }

  

}
