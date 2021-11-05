detection_status = "";
input_text = "";

function setup() {
    canvas = createCanvas(500, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    cocossd_model = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects...";
    input_text = document.getElementById("input").value;
}

function model_loaded() {
    console.log("Model is not loaded");
    detection_status = true;
}

function gotresult(result, error) {
    if (result) {
        console.log(result);
    } else {
        console.error(error);
    }
}

function draw() {
    image(video, 0, 0, 500, 300);
    if (detection_status != "") {
        cocossd_model.detect(video, gotresult);
        for (i = 0; i < result.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object(s) Detected";
            fill("turquoise");
            confidence = floor(result[i].confidence * 100);
            text(result[i].label + " " + confidence + "%", result[i].x + 15, result[i].y + 15);
            noFill();
            stroke();
            rect(result[i].x, result[i].y, result[i].width, result[i].height);
            if (objects[i].label == object_name) {
                video.stop();
                cocossd_model.detect(video, gotresult);
                document.getElementById("status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            } else { document.getElementById("status").innerHTML = object_name + " Not Found"; }
        }
    }
}