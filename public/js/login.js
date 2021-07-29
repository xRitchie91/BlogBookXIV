
// our boy reggie (regex)
function validateUserEmail (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// allows signup if no existing login info.
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
        // email they entered already exists
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
    // no blank usernames
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
    // dont enter a blank password!
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
    // make your pass longer fam!
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

// allows existing users to log in
async function login (event) {
    event.preventDefault();

    const username = document.querySelector('#username_login').value.trim();
    const password = document.querySelector('#password_login').value.trim();

    // opens the door to the club if the credentials are right
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

        // your password is wrong my guy!
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
        // your username is wrong family!
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
    // tells user to enter a username
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
    // tells the user to fix their stuffs to have a valid password
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
    // lets the user know they goobed up! fix it yo!
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

// activates their functions when clicked
$('#login_submit').on('click', login)
$('#signup_submit').on('click', signUpPage)