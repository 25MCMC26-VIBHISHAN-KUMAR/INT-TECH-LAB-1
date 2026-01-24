document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("dob").addEventListener("change", validateDOB);
document.getElementById("phone").addEventListener("input", validatePhone);

document.getElementById("regForm").addEventListener("submit", function(e){
    if(!(validateName() & validateEmail() & validatePassword() & validateDOB() & validatePhone())){
        e.preventDefault();
        alert("Please fix errors before submitting");
    } else {
        alert("Form Submitted Successfully!");
    }
});

function validateName(){
    let name = document.getElementById("name").value;
    let regex = /^[A-Za-z ]+$/;
    if(name=="" || !regex.test(name)){
        document.getElementById("nameErr").innerText="Only alphabets allowed";
        return false;
    }
    document.getElementById("nameErr").innerText="";
    return true;
}

function validateEmail(){
    let email = document.getElementById("email").value;
    let regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!regex.test(email)){
        document.getElementById("emailErr").innerText="Invalid email format";
        return false;
    }
    document.getElementById("emailErr").innerText="";
    return true;
}

function validatePassword(){
    let pass = document.getElementById("password").value;

    if(pass.length < 8 ||
       !/[A-Z]/.test(pass) ||
       !/[a-z]/.test(pass) ||
       !/[0-9]/.test(pass) ||
       !/[^A-Za-z0-9]/.test(pass)){

        document.getElementById("passErr").innerText =
        "Password must be 8+ chars with uppercase, lowercase, number & special character";
        return false;
    }

    document.getElementById("passErr").innerText = "";
    return true;
}

function validateDOB(){
    let dob = document.getElementById("dob").value;
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    if(age<18){
        document.getElementById("dobErr").innerText="Must be 18 years or older";
        return false;
    }
    document.getElementById("dobErr").innerText="";
    return true;
}

function validatePhone(){
    let phone = document.getElementById("phone").value;
    let regex = /^[0-9]{10}$/;
    if(!regex.test(phone)){
        document.getElementById("phoneErr").innerText="Phone must be 10 digits";
        return false;
    }
    document.getElementById("phoneErr").innerText="";
    return true;
}
