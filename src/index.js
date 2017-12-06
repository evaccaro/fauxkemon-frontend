document.addEventListener("DOMContentLoaded", function(){

  let username = document.getElementById('username').value
  let usernameForm = document.getElementById('submituser')
  let welcomeContainer = document.getElementById('welcome')
  let pokemon = document.getElementById('pokemon')


  function greetUser(username){
    usernameForm.style.visibility = "hidden";
    let newUl = document.createElement('ul')
    newUl.innerText = `Welcome to Fauxkemon, ${username.name}`
    welcomeContainer.appendChild(newUl)
  }


  usernameForm.addEventListener("submit", event => {
    event.preventDefault()
    let username = document.getElementById('username').value
    fetch("http://localhost:3000/users", {method: "post",
                                       headers: {'Accept': 'application/json',
                                       'Content-Type': 'application/json'},
                                       body: JSON.stringify({user:{name: username, pokemon_id: null}})})
                                       .then(res => res.json()).then(json => greetUser(json))});

  const leftside = document.querySelector('#leftside')
  const ctxL = leftside.getContext('2d')

  function draw(){
    ctxL.beginPath();
    ctxL.fillRect(5, 5, 100, 100)
    ctxL.fillStyle = "#0095DD";
    ctxL.closePath();
  }
  draw()
})
