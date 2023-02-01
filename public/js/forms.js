const firstName = document.querySelector('#fname');
const lastName = document.querySelector('#lname');
const email = document.querySelector('#email');
const phoneNum = document.querySelector('#phone')
const city = document.querySelector('#city');
const zipCode = document.querySelector('#zip');
const country = document.querySelector('#country');
const birthday = document.querySelector('#birthday');
const gender = document.querySelector('#gender');
const citypd = document.querySelector('#city_pd');
const zippd = document.querySelector('#zip_pd');
const countrypd = document.querySelector('#country_pd');
const payment = document.querySelector('#wayofpayment');
const cn = document.querySelector('#ccn');
const cardholder = document.querySelector('#cardholder');
const expiration = document.querySelector('#expiration');
const cvv = document.querySelector('#cvv');
const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const passval = document.querySelector('#validate_password');



firstName.addEventListener("input", () => {
    firstName.setCustomValidity('');
    firstName.checkValidity();
});
firstName.addEventListener('invalid', () => {
    firstName.setCustomValidity('Enter your first name!');
});

lastName.addEventListener('input', () => {
    lastName.setCustomValidity('');
    lastName.checkValidity();
});

lastName.addEventListener('invalid', () => {
    lastName.setCustomValidity('Enter your last name!');
});


email.addEventListener('input', () => {
    email.setCustomValidity('');
    email.checkValidity();
});

email.addEventListener('invalid', () => {
    if(email.value === '') {
        email.setCustomValidity('Enter your email!');
    } else {
        email.setCustomValidity('Enter your email correctly!');
    }
});

phoneNum.addEventListener('input', () => {
    phoneNum.setCustomValidity('');
    phoneNum.checkValidity();
});

phoneNum.addEventListener('invalid', () => {
    if(phoneNum.value === '') {
        phoneNum.setCustomValidity('Enter your phone number!');
    } else if(phoneNum.value.toString().length != 10) {
        phoneNum.setCustomValidity('Phone number should have 10 digits!');
    }
});

city.addEventListener('input', () => {
    city.setCustomValidity('');
    city.checkValidity();
});

city.addEventListener('invalid', () => {
    city.setCustomValidity('Enter your city!');
});

zipCode.addEventListener('input', () => {
    zipCode.setCustomValidity('');
    zipCode.checkValidity();
});

zipCode.addEventListener('invalid', () => {
    if(zipCode.value === '') {
        zipCode.setCustomValidity('Enter your zip code!');
    } else {
        zipCode.setCustomValidity('Enter your zip code correctly(5 digits)!');
    }
});

country.addEventListener('input', () => {
    country.setCustomValidity('');
    country.checkValidity();
});

country.addEventListener('invalid', () => {
    country.setCustomValidity('Enter your country!');
});

birthday.addEventListener('input', () => {
    birthday.setCustomValidity('');
    birthday.checkValidity();
});

birthday.addEventListener('invalid', () => {
    birthday.setCustomValidity('Enter your birthday!');
});

gender.addEventListener('input', () => {
    gender.setCustomValidity('');
    gender.checkValidity();
});
gender.addEventListener('invalid', () => {
    gender.setCustomValidity('Enter your gender!');
});


citypd.addEventListener('input', () => {
    citypd.setCustomValidity('');
    citypd.checkValidity();
});
citypd.addEventListener('invalid', () => {
    citypd.setCustomValidity('Enter the city!');
});


zippd.addEventListener('input', () => {
    zippd.setCustomValidity('');
    zippd.checkValidity();
});
zippd.addEventListener('invalid', () => {
    zippd.setCustomValidity('Enter the zipcode!');
});

countrypd.addEventListener('input', () => {
    countrypd.setCustomValidity('');
    countrypd.checkValidity();
});
countrypd.addEventListener('invalid', () => {
    countrypd.setCustomValidity('Enter the country!');
});

payment.addEventListener('input', () => {
    payment.setCustomValidity('');
    payment.checkValidity();
});
payment.addEventListener('invalid', () => {
    payment.setCustomValidity('Enter the payment method!');
});


cn.addEventListener('input', () => {
    cn.setCustomValidity('');
    cn.checkValidity();
});
cn.addEventListener('invalid', () => {
    cn.setCustomValidity('Enter the credit card number!');
});

cardholder.addEventListener('input', () => {
    cardholder.setCustomValidity('');
    cardholder.checkValidity();
});
cardholder.addEventListener('invalid', () => {
    cardholder.setCustomValidity('Enter the credit cardholder!');
});

expiration.addEventListener('input', () => {
    expiration.setCustomValidity('');
    expiration.checkValidity();
});
expiration.addEventListener('invalid', () => {
    expiration.setCustomValidity('Enter the credit card expiration date!');
});

cvv.addEventListener('input', () => {
    cvv.setCustomValidity('');
    cvv.checkValidity();
});
cvv.addEventListener('invalid', () => {
    cvv.setCustomValidity('Enter the credit card cvv number!');
});


username.addEventListener('input', () => {
    username.setCustomValidity('');
    username.checkValidity();
});
username.addEventListener('invalid', () => {
    username.setCustomValidity('Enter your username!');
});


pass.addEventListener('input', () => {
    pass.setCustomValidity('');
    pass.checkValidity();
});

pass.addEventListener('invalid', () => {
    if(pass.value === '') {
        pass.setCustomValidity('Enter your password!');
    } else {
        pass.setCustomValidity('Password should be at least 8 characters!');
    }
});

passval.addEventListener('input', () => {
    passval.setCustomValidity('');
    passval.checkValidity();
});

passval.addEventListener('invalid', () => {
    if(passval.value === '') {
        passval.setCustomValidity('Enter your validate password!');
    } else {
        passval.setCustomValidity('Password should be at least 8 characters!');
    }
});







// SHOW PASSWORD WHEN BOX SELETED
function showPassword() {
    var x = document.getElementById("password")
    var y = document.getElementById("validate_password")
    if (x.type == "password" && y.type == "password") {
        x.type = "text"
        y.type = "text"
    }
    else {
        x.type = "password"
        y.type = "password"
    }
}


// CHECK PASSWORD
function passwordCheck(el, show) {
    let pass = document.getElementById('password');
    let pass_check =  document.getElementById('validate_password');

    if(show) pass_check.style.visibility = 'visible';

    if(pass.value !== el.value){
        if(show) {
            pass_check.innerHTML = 'Not matching passwords';
            pass_check.style.color = 'red';
        }
        return false;
    }

    if(show){
        pass_check.innerHTML = 'Matching passwords';
        pass_check.style.color = 'darkgreen';
        pass.style.color = 'darkgreen';
    }

    return true;
}


//show next questions  


//show credit card details needed when option is credit card    
const el = document.getElementById('payment_details');
const box = document.getElementById('ccn_details');

el.addEventListener('change', function handleChange(event) {
    if (event.target.value == 'creditcard') {
        box.style.display = 'grid';
        cn.required = true;
        cardholder.required = true;
        expiration.required = true;
        cvv.required = true;
    } else if(event.target.value === 'payondelivery') {
        cn.required = false;
        cardholder.required = false;
        expiration.required = false;
        cvv.required = false;
        box.style.display = 'none';
    }
});


function validateEmail() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let user_email = document.getElementById('email');
    if (user_email.value.match(validRegex)) {

        return true;
    } else {

        return false;
    }
}

//CALCULATE AGE AND RETURN IT
function calculateAge() {
    let today = new Date(document.getElementById('birthday').max);
    let birthday = new Date(document.getElementById('birthday').value);


    let utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    let utc2 = Date.UTC(birthday.getFullYear(), birthday.getMonth(), birthday.getDate());

    let oneDay = 24 * 60 * 60 * 1000; //in ms
    let age = Math.floor(Math.floor((utc1 - utc2) / oneDay) / 365);


    return age;
}

//DATA VALIDATION ON SUBMIT
validate = function validateData() {
    let non_valid_data = [];
    if(calculateAge() < 18) non_valid_data.push('You should be at least 18 years old.');
    if(!validateEmail()) non_valid_data.push('Email should be of type @gmail.com, @hotmail.com or @yahoo.com.');
    if(!passwordCheck(document.getElementById('validate_password'), false))  non_valid_data.push('Passwords do not match.');

    //return showRedirect(non_valid_data);
}


function showRedirect(non_valid_data){
    let remove_els = document.getElementsByClassName('Redirect_text');
    while(remove_els[0]){
        remove_els[0].parentNode.removeChild(remove_els[0]);
    }

    let Redirect = document.getElementById('Redirect');
    Redirect.style.display = 'block';
    let Redirect_heading = document.getElementById('Redirect_heading');

    if(non_valid_data.length == 0){
        let close = document.getElementById('close');
        close.style.display = 'none';
        Redirect_heading.innerHTML = 'Sign Up Successful!';
        let node = document.createElement("p");
        node.innerHTML = 'Fetching data...';
        node.classList.add('Redirect_text');
        Redirect.appendChild(node);
        setTimeout(function(){ window.location.href ='index.html'; }, 4500);
        return false;
    }

    Redirect_heading.innerHTML = 'Data is not valid.';
    document.getElementById('sign_up_button').style.backgroundColor = '#56a7a7';
    let x;
    for(x in non_valid_data){
        let node = document.createElement("p");
        node.innerHTML = non_valid_data[x];
        node.classList.add('Redirect_text');
        Redirect.appendChild(node);
    }
    return false;
}


function hideRedirect(){
    document.getElementById('Redirect').style.display = 'none';
}
const id = document.querySelector("#sign_up_form")
