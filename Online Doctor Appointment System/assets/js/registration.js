document.getElementById('formRegister').addEventListener('submit', function(event){
    event.preventDefault();
  
});

function validateForm() {
    var name = document.getElementById('FullName').value;
    var user = document.getElementById('UserName').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var userOptions = document.getElementById('option').value;
   
    document.getElementById('FullnameError').textContent = '';
    document.getElementById('nameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('optionError').textContent = '';
    
    if (name === '') {
        document.getElementById('FullnameError').textContent = 'Please enter your Full Name';
        return;
    }

    if (user === '') {
        document.getElementById('nameError').textContent = 'Please enter your UserName';
        return;
    }

    if (password === '') {
        document.getElementById('passwordError').textContent = 'Please enter your password';
        return;
    }

    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        return;
    }

    if (userOptions === '') {
        document.getElementById('optionError').textContent = 'Please select your User Type';
        return;
    }

    addAndStoreUser();
    
    document.getElementById('formRegister').submit();
    alert('Registered Successfully!');
    window.location.href = 'login.html';
}

function addAndStoreUser() {
    var name = document.getElementById('FullName').value;
    var user = document.getElementById('UserName').value;
    var password = document.getElementById('password').value;
    var userOptions = document.getElementById('option').value;

    var allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

    var newUser = {
        userId: Date.now(),
        fullName: name,
        userName: user,
        password: password,
        usertype: userOptions
    };

    allUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

