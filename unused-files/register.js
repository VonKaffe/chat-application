var name = document.getElementById('name');
var password = document.getElementById('password');

// storing input from register-form
function store() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('password', password.value);
}

// check if stored data from register-form is equal to entered data in the   views-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('password');

    // entered data from the views-form
    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    // check if stored data from register-form is equal to data from views form
    if(userName.value !== storedName || userPw.value !== storedPw) {
        alert('ERROR');
    }else {
        alert('You are loged in.');
    }
}