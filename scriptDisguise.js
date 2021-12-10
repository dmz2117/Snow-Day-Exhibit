let video;
let detector;
let detections = [];
let mobilenet;
let label = '';
let poseNet;
let pose;
let skeleton;

//Object detection - WHITE
function preload() {
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

//Image classification - PINK
// function modelReady() {
//   console.log('Image classification ready');
//   mobilenet.predict(gotResults);
// }
//
// function gotResults(error, results) {
//   if (error) {
//     console.error(error);
//   } else {
//     label = results[0].label;
//     mobilenet.predict(gotResults);
//   }
// }

//PoseNet - RED
// function gotPoses(poses) {
//   if (poses.length > 0) {
//     pose = poses[0].pose;
//     skeleton = poses[0].skeleton;
//   }
// }
//
// function modelLoaded() {
//   console.log('poseNet ready');
// }

//SETUP
function setup() {
  createCanvas(windowHeight*1.333, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowHeight*1.333, windowHeight);
  video.hide();
  frameRate(10);

  //Object Detection - WHITE
  detector.detect(video, gotDetections);

  // //Image classification - PINK
  // mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
  //
  // //PoseNet - RED
  // poseNet = ml5.poseNet(video, modelLoaded);
  // poseNet.on('pose', gotPoses);
}


function draw() {
  image(video, 0, 0, windowHeight*1.333, windowHeight);

  //Object detection - WHITE
  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0);
    strokeWeight(0.5);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(0);
    textSize(25);
    text('I see a ' + object.label +' '+ round(object.confidence * 100, 0) +'%', object.x, object.y - 10);
    if(object.confidence<0.3){
      textSize(20);
      text('but I am really not sure!', object.x, object.y - 10)
    }
  }

  // //Image classification - PINK
  // fill('#fae');
  // textSize(15);
  // text(label, 10, 20);
  //
  // //PoseNet - RED
  // if (pose) {
  //   for (let i = 0; i < pose.keypoints.length; i++) {
  //     let x = pose.keypoints[i].position.x;
  //     let y = pose.keypoints[i].position.y;
  //     fill('red');
  //     ellipse(x, y, 7, 7);
  //   }
  //}
}
