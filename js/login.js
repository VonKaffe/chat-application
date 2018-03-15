// Login
function login() {
    let userEmail = document.getElementById("emailField").value;
    let userPass = document.getElementById("passField").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function () {
        var user = firebase.auth().currentUser;
        console.log(user);

        // Sign-In successful.
        database.ref("usersOnline/" + firebase.auth().currentUser.uid).set({displayName: firebase.auth().currentUser.displayName});

        window.location.assign("../views/index.html");
        //console.log(firebase.database().ref().child("usersOnline").set({displayName: firebase.auth().currentUser.displayName}));


    }).catch(function (error) {
        // An error happened.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
    });
}