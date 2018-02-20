firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        document.getElementById("user").style.display = "block";
        document.getElementById("login").style.display = "none";

        let user = firebase.auth().currentUser;

        if(user != null){

            let email_id = user.email;

            document.getElementById("welcome").innerHTML = "Welcome User : " + email_id

        }
    } else {
        // No user is signed in.

        document.getElementById("user").style.display = "none";
        document.getElementById("login").style.display = "block";
    }
});

function login() {
    let userEmail = document.getElementById("emailField").value;
    let userPass = document.getElementById("passField").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
    });
}

function logout(){
    firebase.auth().signOut();

}
