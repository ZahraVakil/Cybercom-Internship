function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var city = document.getElementsByName('city')[0].value;
    var state = document.getElementsByName('state')[0].value;
    var termsCheckbox = document.getElementById('terms').checked;

    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('cityError').textContent = '';
    document.getElementById('stateError').textContent = '';
    document.getElementById('termsError').textContent = '';

    if (name === '') {
        document.getElementById('nameError').textContent = 'Please enter your name';
    }

    if (email === '') {
        document.getElementById('emailError').textContent = 'Please enter your email';
    }

    if (password === '') {
        document.getElementById('passwordError').textContent = 'Please enter your password';
    }

    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
    }

    if (city === '') {
        document.getElementById('cityError').textContent = 'Please select your city';
    }

    if (state === '') {
        document.getElementById('stateError').textContent = 'Please select your state';
    }

    if (!termsCheckbox) {
        document.getElementById('termsError').textContent = 'Please accept the Terms & Conditions';
    }

    if (name !== '' && email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword && city !== '' && state !== '' && termsCheckbox) {
        
        document.getElementById('formRegister').submit(); 

        if(registerAdmin()){

            alert('Form submitted successfully!');
        }
       
    }
}

document.getElementById('formRegister').addEventListener('submit', function(event){
    event.preventDefault();
});

const existingAdmin = localStorage.getItem('admin');
if (existingAdmin) {
    alert('Admin already registered!');
}

function registerAdmin() {
    const existingAdmin = localStorage.getItem('admin');
    if (existingAdmin) {
       alert( 'Admin already registered!');
       return false;
      console.log("in if");
    } else {
        console.log("in else");

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const adminData = {
            email,
            password
        };

        localStorage.setItem('admin', JSON.stringify(adminData));
        return true;
        
    }
}
