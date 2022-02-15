// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIKDQRG7mM1Wptz3yMkJbLi-7feuSkKIw",
    authDomain: "tsechatroom.firebaseapp.com",
    projectId: "tsechatroom",
    storageBucket: "tsechatroom.appspot.com",
    messagingSenderId: "666833532071",
    appId: "1:666833532071:web:c08e126c3a69f27e25d782",
    measurementId: "G-3SFFXEFGCQ"
};

const fireApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireApp);


// initialize firebase
firebase.initializeApp(config);

function createAccount(){
    // obtain user email and user password from HTML
    var userEmail = document.getElementById("floatingEmailR").value;
    var userPass = document.getElementById("floatingPasswordR").value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch((error) =>{
        //error code
        var errorCode = error.code

        //error message
        var errorMessage = error.message
    }).then(() => {
        //redirect the user to profile page
        window.location.assign("/profile");
    });
    sendVerificationEmail();
}

function login() {
    // obtain user email and user password from HTML
    var userEmail = document.getElementById("floatingEmail").value;
    var userPass = document.getElementById("floatingPassword").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        //error code
        var errorCode = error.code
        //errod message
        var errorMessage = error.message
        //show error message
        window.alert("Error : " + errorMessage);
    }).then(() => {
        //redirect the user to profile page
        window.location.assign("/chatroom");
    });
    console.log('test');
}
const user = firebase.auth().currentUser;

// send verification email
function sendVerificationEmail() {
    // extracting the user from the firebase
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        window.alert("Verification link sent to your email. Kindly check to verify your account")
    }).catch(function(error) {
        // An error happened.
    });
}