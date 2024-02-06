function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    if (email === '') {
        document.getElementById('emailError').textContent = 'Please enter your email';
    }

    if (password === '' ) {
        document.getElementById('passwordError').textContent = 'Please enter your password';
    }

    // if (password < 5) {
    //     document.getElementById('passwordError').textContent = 'Password should be atleast 5 characters';
    // }


    if (email !== '' && password !== '') {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        loginAdmin(email,password);
        alert('Form submitted successfully!');
        document.getElementById('loginForm').submit(); 
}


}

document.getElementById('formLogin').addEventListener('submit', function(event){
    event.preventDefault();
});



function loginAdmin(email, password) {
    const existingAdminString = localStorage.getItem('admin');

    if (existingAdminString) {
        const existingAdmin = JSON.parse(existingAdminString);

        if (email === existingAdmin.email && password === existingAdmin.password) {
            window.location.href = '../dashboard/dashboard.html';
        } else {
            console.log('Invalid email or password');
        }
    } else {
        console.log('No admin data found');
    }
}







