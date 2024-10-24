function login() {
    var input1 = document.getElementById('input1').value;
    var input2 = document.getElementById('input2').value;
    var input3="vaishiva"
    var input4="1234"
    
    if (input1==input3 && input2==input4) {
        window.location.href="Home.html";
        alert('Logged in successfully!');
    } else {
        alert('Invalid username and password');
    }
}