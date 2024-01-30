let elements = document.getElementsByClassName('child');

for (var i = 0; i < elements.length; i++) {
    console.log(elements[i].textContent);
    // Output: First element with class.
    // Output: Second element with class.
}
// console.log(elements);