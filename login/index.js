function login() {
    let userEmail = document.getElementById("emailField").value;
    let userPass = document.getElementById("passField").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function () {
        var user = firebase.auth().currentUser;
        console.log(user);

        // Sign-In successful.
        database.ref("usersOnline/" + firebase.auth().currentUser.uid).set({displayName: firebase.auth().currentUser.displayName});
        window.location.assign("chat.html");
        //console.log(firebase.database().ref().child("usersOnline").set({displayName: firebase.auth().currentUser.displayName}));


    }).catch(function (error) {
        // An error happened.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
    });
}




function register() {
    let userEmail = document.getElementById("email").value;
    let userPass = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function () {
        let userName = document.getElementById("username").value;
        let fullname = document.getElementById("fullname").value;

        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: userName
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });

        database.ref("users/" + user.uid).set({fullname: fullname});

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        // ...
    });


    /*
    let userName = document.getElementById("username").value;
    let fullname = document.getElementById("fullname").value;
    let userPass = document.getElementById("password").value;
    let userEmail = document.getElementById("email").value;

    let users = {
        username:userName,
        fullname:fullname,
        password:userPass,
        email:userEmail
    };

    database.child("users").push(users);
    */

}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log(user.currentUser);


    } else {
        // No user is signed in.

    }
});


function logout() {
    firebase.database().ref("usersOnline/" + firebase.auth().currentUser.uid).remove();
    firebase.auth().signOut();
    window.location = 'login.html';
}