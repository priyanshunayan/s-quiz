let app_firebase = {};

(function () {
      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAEfrpjSp8pG1GG__lGUyigkYNYAfu9Z2w",
    authDomain: "squiz-36d6a.firebaseapp.com",
    databaseURL: "https://squiz-36d6a.firebaseio.com",
    projectId: "squiz-36d6a",
    storageBucket: "squiz-36d6a.appspot.com",
    messagingSenderId: "1046286292811"
  };

  firebase.initializeApp(config);
  app_firebase = firebase;

/*   const preObject = document.getElementById('object');
  const ulList = document.getElementById('list');
  //create references

  const dbRefObject = firebase.database().ref().child('object');
  const dbRefList = dbRefObject.child('hobbie');
  //sync Object Changes

  dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3);
  })
  dbRefList.on('child_added', snap => {
    console.log(snap.val());
  }) */
  //To Write Data on Database
/*   function writeUserData(userId, name, score) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      score: score
    });
  }
  writeUserData("4567890", "Priyanshu", [3,4,5,6,7]);
  writeUserData("q34567890", "Suprabhat", [ 4, 5,6,7]); */

}())