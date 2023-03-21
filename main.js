var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var song = "";
var score_leftWrist = 0;
var score_rightWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + score_leftWrist);
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = " + score_rightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX);
        console.log("leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX);
        console.log("rightWristY = " + rightWristY);
    }
}
function modelLoaded(){
    console.log("Model is Initialized");
}
function draw(){
    image(video,0, 0, 600, 500);
    fill("#00FF00");
    stroke("#000000");
    if(score_rightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed_info").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed_info").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed_info").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed_info").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed_info").innerHTML = "Speed = 2.5x";
            song.rate(2.5);        
        }
    }
    if(score_leftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        int_lwY = Number(leftWristY);
        LwristY = floor(int_lwY);
        volume = LwristY/500;
        document.getElementById("volume_info").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
