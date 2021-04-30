prediction_1 = "";
prediction_2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src=" + data_uri + ">";
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1Ye-CIWsK/model.json', modelloaded);
function modelloaded() {
    console.log('modelloaded');
}
function speak() {
    var synth = window.speechSynthesis;
    speakdata1 = "the first prediction " + prediction_1;
    speakdata2 = "and the second prediction " + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    synth.speak(utterthis);
}
function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotresults);
}
function gotresults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        speak();
        if (prediction_1 == "Happy") {
            document.getElementById("update_emoji").innerHTML ="✌🏻";
        }

        if (prediction_1 == "Sad") {
            document.getElementById("update_emoji").innerHTML ="👊🏻";
        }

        if (prediction_1 == "Angry") {
            document.getElementById("update_emoji").innerHTML ="👌🏻";
        }


        if (prediction_2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML ="✌🏻";
        }

        if (prediction_2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML ="👊🏻";
        }

        if (prediction_2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML ="👌🏻";
        }

    }
}