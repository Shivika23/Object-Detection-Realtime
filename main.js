status_n = ""
objects = [];

function setup() {
    canvas = createCanvas(580, 420)
    canvas.center()

    camera = createCapture(VIDEO)
    camera.hide()

}

function start() {
    cocossd_model = ml5.objectDetector('cocossd', model_loaded)
    document.getElementById("result").innerHTML = "Status: Object detection in progress"
}

function model_loaded() {
    console.log("Model Loaded successfully")
    status_n = true;
}


function got_results(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results;
    }
}

function draw() {
    image(camera, 0, 0, 580, 420)

    // we are picking up 3 variables to store 3 random colors red, green, blue.
    r = random(255)
    g = random(255)
    b = random(255)


    if (status_n != "") {
        cocossd_model.detect(camera, got_results)

        for (i = 0; i < objects.length; i++) {
            document.getElementById("result").innerHTML = "Status: Object detected"
            document.getElementById("o_n").innerHTML = "Number of objects identified " + objects.length;
            object_name = objects[i].label
            object_acc = floor(objects[i].confidence * 100)
            object_w = objects[i].width
            object_h = objects[i].height
            object_x = objects[i].x
            object_y = objects[i].y


            fill(r, g, b)
            stroke("black")
            textSize(20)
            text(object_name + " " + object_acc + "%", object_x + 50, object_y + 50)
            noFill()
            rect(object_x, object_y, object_w, object_h)
        }

    }
}