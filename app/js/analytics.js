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
                console.log("inside got data");
                const scores = data.val();
                scoreScored = Object.values(scores.score);
                words = Object.keys(scores.word);
                for (i = words.length-1; i >=0; i--) {
                    let wordObject = scores.word[words[i]];
                    wordObjects.push(wordObject);
                }
                for (i = 0; i < scoreScored.length; i++) {
                    scoreObject.push({
                        y: scoreScored[i] * 50
                    })
                }
                document.getElementById('loader-rotate').style.display = 'none';
                document.getElementById('loader-rotate-2').style.display = 'none';
                document.getElementById('playAgainBtn').style.display = 'inline';
                document.getElementById('logOut').style.display = 'inline';
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

function chartRender() {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light1",
        axisX:{
            minimum:1,
            labelFontColor: "#4dabf7",
            tickLength: 0
        },
        axisY: {
            includeZero: false,
            tickLength: 0,
            includeZero: false,
            gridColor: "#ced4da",
            labelFontColor: "#4dabf7"
        },
        data: [{
            lineColor: "#1c7ed6",
            markerColor: "#1c7ed6",
            markerSize: 3,
            lineThickness: 2,
            type: "line",
            dataPoints: scoreObject
        }]
    });
    chart.render();
}

function displayWords() {
    console.log("called");
    wordObjects.forEach(word => {
        document.getElementById('data').innerHTML += "<p>" + word.word + " :" + word.def + "</p>";
    })
}
const logout = document.getElementById("logOut");
logout.addEventListener("click", () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.replace('index.html');
      }, function(error) {
        // An error happened.
        console.log("Error", error);
      });
})
