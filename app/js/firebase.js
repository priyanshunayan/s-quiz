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

}())