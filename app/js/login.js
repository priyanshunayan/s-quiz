(function () {

    // Initialize the FirebaseUI Widget using Firebase.
    var config = {
        apiKey: "AIzaSyAEfrpjSp8pG1GG__lGUyigkYNYAfu9Z2w",
        authDomain: "squiz-36d6a.firebaseapp.com",
        databaseURL: "https://squiz-36d6a.firebaseio.com",
        projectId: "squiz-36d6a",
        storageBucket: "squiz-36d6a.appspot.com",
        messagingSenderId: "1046286292811"
      };
      firebase.initializeApp(config);
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'quiz.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users. 
            firebase.auth.EmailAuthProvider.PROVIDER_ID,

        ],
    };
      // The start method will wait until the DOM is loaded.
   ui.start('#firebaseui-auth-container', uiConfig);
  
    firebase.auth().onAuthStateChanged(function (user) {
        var uid = null;
        if (user) {
            // User is signed in.
            console.log("user ======>", user);
            window.location.replace("quiz.html");
            uid = user.uid;
        } else {
            uid = null;

        }
    });
}())