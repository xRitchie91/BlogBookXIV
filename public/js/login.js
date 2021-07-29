
// function uses regex to validate if user input a valid email format
function validateUserEmail (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// function that allows user to sign up if they have no existing login info.
async function signUpPage (event) {
    event.preventDefault();

    const validatedEmail = validateUserEmail(email);
    const email = document.querySelector('#email_signup').value.trim()
    const username = document.querySelector('#username_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();

    // allow access if all fields are filled and valid
    if(username && validatedEmail && password){
        const res = await fetch('api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
    
        if(res.ok){
            document.location.replace('/dashboard/')
        }
        // update signup alert to inform the user that the email they entered already exists
        if(res.status === 500){
            $('#signup_alert_container').html('')
            $('#signup_alert_container').append(`
            <div>
                <strong>
                    ERROR: this email address already exists.
                </strong>
            </div>
            `)
        }
    }
    // update signup alert to inform user that the email the entered is an invalid format
    if(!validatedEmail){
        $('#signup_alert_container').html('')
        $('#signup_alert_container').append(`
        <div>
            <strong>
                ERROR: Please enter a valid email address.
            </strong>
        </div>
        `)
    }
    // alerts user that they cannot leave username field blank
    if(!username){
        $('#signup_alert_container').html('')
        $('#signup_alert_container').append(`
        <div>
            <strong>
                ERROR: You must enter a username.
            </strong>
        </div>
        `)
    }
    // alerts user that they cannot leave the password field blank
    if(!password){
        $('#signup_alert_container').html('')
        $('#signup_alert_container').append(`
        <div>
            <strong>
                ERROR: You must enter a password.
            </strong>
        </div>
        `)
    }
    // alert user if their password is not long enough
    if(password.length < 8){
        $('#signup_alert_container').html('')
        $('#signup_alert_container').append(`
        <div>
            <strong>
                ERROR: Your password must be at least 8 characters long.
            </strong>
        </div>
        `)
    }
    // alerts user if nothing is filled in
    if(!email && !username && !password){
        $('#signup_alert_container').html('')
        $('#signup_alert_container').append(`
        <div>
            <strong>
                ERROR: You must fill out all fields.
            </strong>
        </div>
        `)
    }
}

// function that allows user to login if they have signed up before./
async function login (event) {
    event.preventDefault();

    const username = document.querySelector('#username_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();

    // allows access if the username/password are valid
    if(username && password){
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(res.ok){
            document.location.replace('/dashboard');
        }

        // alerts user that the password they entered was incorrect
        if(res.status === 400){
            $('#login_alert_container').html('')
            $('#login_alert_container').append(`
            <div>
                <strong>
                    ERROR: This password is incorrect.
                </strong>
            </div>
            `)
        }
        // alerts user that the username they entered is incorrect
        if(res.status === 404){
            $('#login_alert_container').html('')
            $('#login_alert_container').append(`
            <div>
                <strong>
                    ERROR: This username is incorrect.
                </strong>
            </div>
            `)
        }
    }
    // alerts user not to leave the username field blank
    if(!username){
        $('#login_alert_container').html('')
        $('#login_alert_container').append(`
        <div>
            <strong>
                ERROR: Cannot leave this field blank. You must enter a username.
            </strong>
        </div>
        `)
    }
    // alerts user that they cannot leave the password field blank
    if(!password){
        $('#login_alert_container').html('')
        $('#login_alert_container').append(`
        <div>
            <strong>
                ERROR: Cannot leave this field blank. You must enter a password.
            </strong>
        </div>
        `)
    }
    // alerts the user that both fields cannot be blank
    if(!username && !password){
        $('#login_alert_container').html('')
        $('#login_alert_container').append(`
        <div>
            <strong>
                ERROR: You cannot leave these fields blank. You must enter a username and password.
            </strong>
        </div>
        `)
    }
}

// buttons that activate appropriate functions when clicked
$('#login_submit').on('click', login)
$('#signup_submit').on('click', signUpPage)