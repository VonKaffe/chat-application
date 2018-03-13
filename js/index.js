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
            window.location = '../views/login.html';
        }).catch(function (error) {
            // An error happened.
        });

        database.ref("users/" + user.uid).set({fullname: fullname,
                                                displayName: userName});



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



var app = angular.module('chatRoom', ['firebase']);
app.run(function($rootScope){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            $rootScope.currentUser = firebase.auth().currentUser;
            document.getElementById("usernameHeader").innerHTML = user.displayName;
            console.log(user.currentUser);


        } else {
            // No user is signed in.
            window.location = '../views/login.html';

        }
    });
    $rootScope.selectedRoom = 1;

    console.log(firebase.auth().currentUser);
});

// Room1
app.controller('ChatController', function ($scope, $rootScope, $firebaseArray) {
    var ref = firebase.database().ref().child('messages/room1');
    $scope.messages = $firebaseArray(ref);
    $scope.data = {};

    $scope.send =function () {
        $scope.messages.$add({
            user: firebase.auth().currentUser.displayName,
            userid: firebase.auth().currentUser.uid,
            message: $scope.data.messageText,
            date: Date.now()
        });
    }
});

// Room2
app.controller('ChatController2', function ($scope, $rootScope, $firebaseArray) {
    var ref = firebase.database().ref().child('messages/room2');
    $scope.messages = $firebaseArray(ref);
    $scope.data = {};

    $scope.send =function () {
        $scope.messages.$add({
            user: firebase.auth().currentUser.displayName,
            userid: firebase.auth().currentUser.uid,
            message: $scope.data.messageText,
            date: Date.now()
        })
    }
});

// Room3
app.controller('ChatController3', function ($scope, $rootScope, $firebaseArray) {
    var ref = firebase.database().ref().child('messages/room3');
    $scope.messages = $firebaseArray(ref);
    $scope.data = {};

    $scope.send =function () {
        $scope.messages.$add({
            user: firebase.auth().currentUser.displayName,
            userid: firebase.auth().currentUser.uid,
            message: $scope.data.messageText,
            date: Date.now()
        })
    }
});

app.controller('SelectRoomController', function ($scope, $rootScope) {
    $scope.selectRoom =function (room) {
        $rootScope.selectedRoom = room;
    }
});


function logout() {
    firebase.database().ref("usersOnline/" + firebase.auth().currentUser.uid).remove();
    firebase.auth().signOut();
    window.location = '../views/login.html';
}