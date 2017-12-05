document.addEventListener("DOMContentLoaded", function(){

  let username = document.getElementById('username').value
  let usernameForm = document.getElementById('submituser')

  function greetUser(username){
    alert(`Welcome, ${username}`)
  }


  usernameForm.addEventListener("submit", event => {
    event.preventDefault()
    let username = document.getElementById('username').value
    fetch('http://localhost:3000/users', {method: "post",
                                        headers: {'Accept': 'application/json',
                                        'Content-Type': 'application/json'},
                                        body: JSON.stringify({user:{name: username, pokemon_id: null}})})
                                        .then(res => res.json()).then(console.log)});

})
