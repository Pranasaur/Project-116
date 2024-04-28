function take_snapshot(){
    save('Moustache.png')
}

function preload() {
     moustache = loadImage('moustachio.jpeg')
}

function draw() {
    image(video, 0, 0, 300, 300);
    image(moustache, noseX, noseY, 30, 30);
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.position(110, 250);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x-15;
        noseY = results[0].pose.nose.y-15;
        console.log("nose x = " + results[0].pose.nose.x);
        console.log("nose y = " + results[0].pose.nose.y);
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
    poseNet.on('pose', gotPoses);
}