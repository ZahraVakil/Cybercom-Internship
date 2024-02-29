document.addEventListener('DOMContentLoaded', function() {
    var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    console.log(loggedInUser);

    var welcomeMessage = document.querySelector('.welcome-section h2');
    welcomeMessage.textContent = "Welcome, " + loggedInUser.fullName + "!";

    var userDetailsTable = document.createElement('table');
    userDetailsTable.classList.add('user-details-table');
    userDetailsTable.style.border = '2px solid black';

    var tableContent = `
        <tr>
            <td><strong>Full Name:</strong></td>
            <td>${loggedInUser.fullName}</td>
        </tr>
        <tr>
            <td><strong>Username:</strong></td>
            <td>${loggedInUser.userName}</td>
        </tr>
        <tr>
            <td><strong>User Type:</strong></td>
            <td>${loggedInUser.usertype}</td>
        </tr>
    `;

   
    userDetailsTable.innerHTML = tableContent;

    var tableCells = userDetailsTable.querySelectorAll('td');
    tableCells.forEach(function(cell) {
        cell.style.border = '1px solid black'; // Example inner border style, adjust as needed
        cell.style.padding = '8px'; // Example padding, adjust as needed
    });


    // Append the table to the header
    var div = document.querySelector('.user-details');
    div.appendChild(userDetailsTable);
});