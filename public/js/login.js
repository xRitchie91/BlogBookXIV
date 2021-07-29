function isValidEmail (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function signUp (event) {
  event.preventDefault();

  const username = document.querySelector('#username_signup').value.trim();
  const email = document.querySelector('#email_signup').value.trim()
  const validEmail = isValidEmail(email);
  const password = document.querySelector('#password_signup').value.trim();


  if(username && validEmail && password){
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
      if(res.status === 500){
          $('#signup_alert_container').html('')
          $('#signup_alert_container').append(`
          <div>
              <strong>
                  Email address already exists.
              </strong>
          </div>
          `)
      }
  }
  if(!validEmail){
      $('#signup_alert_container').html('')
      $('#signup_alert_container').append(`
      <div>
          <strong>
              Enter a valid email adress.
          </strong>
      </div>
      `)
  }
  if(!username){
      $('#signup_alert_container').html('')
      $('#signup_alert_container').append(`
      <div>
          <strong>
              Username is required.
          </strong>
      </div>
      `)
  }
  if(!password){
      $('#signup_alert_container').html('')
      $('#signup_alert_container').append(`
      <div>
          <strong>
              Password is required.
          </strong>
      </div>
      `)
  }
  if(password.length < 8){
      $('#signup_alert_container').html('')
      $('#signup_alert_container').append(`
      <div>
          <strong>
              Password must be at least 8 characters.
          </strong>
      </div>
      `)
  }
  if(!email && !username && !password){
      $('#signup_alert_container').html('')
      $('#signup_alert_container').append(`
      <div>
          <strong>
              Please fill out all fields.
          </strong>
      </div>
      `)
  }
}
async function login (event) {
  event.preventDefault();

  const username = document.querySelector('#username_login').value.trim();
  const password = document.querySelector('#password_login').value.trim();

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

      if(res.status === 400){
          $('#login_alert_container').html('')
          $('#login_alert_container').append(`
          <div>
              <strong>
                  Incorrect password.
              </strong>
          </div>
          `)
      }
      if(res.status === 404){
          $('#login_alert_container').html('')
          $('#login_alert_container').append(`
          <div>
              <strong>
                  Incorrect username.
              </strong>
          </div>
          `)
      }
  }
  if(!username){
      $('#login_alert_container').html('')
      $('#login_alert_container').append(`
      <div>
          <strong>
              Username is required.
          </strong>
      </div>
      `)
  }
  if(!password){
      $('#login_alert_container').html('')
      $('#login_alert_container').append(`
      <div>
          <strong>
              Password is required.
          </strong>
      </div>
      `)
  }
  if(!username && !password){
      $('#login_alert_container').html('')
      $('#login_alert_container').append(`
      <div>
          <strong>
              Username and password are required.
          </strong>
      </div>
      `)
  }
}

$('#login_submit').on('click', login)
$('#signup_submit').on('click', signUp)