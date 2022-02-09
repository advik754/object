img="";
status1="";
objects = [];
function preload() {
    img = loadImage("desk.jpg");
}
function setup() {
    canvas = createCanvas(650, 500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    objectDetector.detect(img, gotResult);
}
function draw() {
    image(img, 0, 0, 650, 500);
    if (status1 != "") {
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "There are 7 big objects from which cocossd has detected 2 objects.";
            percent = floor(objects[i].confidence * 100);
            fill("#ff0000");
            stroke("#ff0000");
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}