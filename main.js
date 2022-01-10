song1 = "";
song2 ="";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreLeftWrist = "";
scoreRightWrist = "";
song1_status = "";
song2_status = "";

function preload(){
    song1 = loadSound("peter_pan.mp")
    song2 = loadSound("harry_potter.mp3");
}

function setup(){
    canvas = createCanvas(400,300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}



function draw(){
    image(video,0,0,400,300);

    fill("#FF0000");
    stroke("#FF0000");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);

        song2.stop();
    

    if (song1_status == false) {
        song1.play();

        document.getElementById("currently_playing").innerHTML = "Currently Playing - " + song1;
    }
}

if (scoreRightWrist > 0.2) {
    circle(rightWristX,rightWristY,20);
    song1.stop();

    if (song2_status == false) {
        song2.play();

        document.getElementById("currently_playing").innerHTML ="Currently Playing - " + song2;
    }
}
}

function play(){
    song.play();
    song1.setVolume(1);
    song2.setVolume(1);
}

function gotPoses(){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY =" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + "rightWristY =" + rightWristY);
    }
}
