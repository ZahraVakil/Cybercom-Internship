function validateForm() {
    var user = document.getElementById('user').value;
    var password = document.getElementById('password').value;

    document.getElementById('userError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    if (user === '') {
        document.getElementById('userError').textContent = 'Please enter your UserName';
    }

    if (password === '' ) {
        document.getElementById('passwordError').textContent = 'Please enter your password';
    }

    if (user !== '' && password !== '') {
        loginUser();
      
}
}

document.getElementById('formLogin').addEventListener('submit', function(event){
    event.preventDefault();
});

function loginUser() {
    var username = document.getElementById('user').value;
    var password = document.getElementById('password').value;

    var storedUsers = JSON.parse(localStorage.getItem('allUsers'));

    if (storedUsers) {
        var foundUser = storedUsers.find(function(user) {
            return user.userName === username && user.password === password;
        });

        if (foundUser) {
            if (foundUser.usertype === 'Doctor') {
                window.location.href = 'doctor_dashboard.html';
            } else if (foundUser.usertype === 'Patient') {
                window.location.href = 'patient_dashboard.html';
            }
        } else {
            alert('Invalid username or password!');
        }
    } else {
        alert('No registered users found!');
    }
}
