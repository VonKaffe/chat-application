function login() {
    let userEmail = document.getElementById("emailField").value;
    let userPass = document.getElementById("passField").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function() {
        // Sign-In successful.
        window.location.assign("chat.html");

    }).catch(function(error) {
        // An error happened.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        let user = firebase.auth().currentUser;
        if (user != null) {
            email = user.email;
            document.getElementById("usernameHeader").innerText = email;
            liUser = document.createElement('li');
            liUser.innerHTML = email;
            document.getElementById('userUl').appendChild(liUser);

        }
    } else {
        // No user is signed in.

    }
});

function logout(){
    firebase.auth().signOut();
    window.location = 'login.html';

}



