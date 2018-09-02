let scoreScored;
let scoreObject = [];
let words = [];
let wordObjects = [];



function readData() {
    database = firebase.database();
    firebase.auth().onAuthStateChanged(function (user) {
        var uid = null;
        if (user) {
            // User is signed in.
            console.log("user ==========>", user);
            uid = user.uid;
            const ref = database.ref(uid);
            ref.on('value', gotData, errData);

            function gotData(data) {
                const scores = data.val();
                scoreScored = Object.values(scores.score);
                words = Object.keys(scores.word);
                for (i = 0; i < words.length; i++) {
                    let wordObject = scores.word[words[i]];
                    wordObjects.push(wordObject);
                }
                for (i = 0; i < scoreScored.length; i++) {
                    scoreObject.push({
                        y: scoreScored[i] * 50
                    })
                }
                chartRender();
                displayWords();
            }

            function errData(err) {
                console.log("Error", err);
            }
        } else {
            uid = null;
            window.location.replace("login.html");
        }
    });

}

readData();
console.log(scoreObject);

function chartRender() {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Simple Line Chart"
        },
        axisY: {
            includeZero: false
        },
        data: [{
            lineColor: "#1c7ed6",
            markerColor: "#1c7ed6",
            lineThickness: 5,
            type: "line",
            dataPoints: scoreObject
        }]
    });
    chart.render();
}

function displayWords() {
    console.log("called");
    wordObjects.forEach(word => {
        console.log("inside");
        document.getElementById('data').innerHTML += "<p>" + word.word + " :" + word.def + "</p>";
    })
}