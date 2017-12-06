document.addEventListener("DOMContentLoaded", function(){

  let username = document.getElementById('username').value
  let usernameForm = document.getElementById('submituser')
  let welcomeContainer = document.getElementById('welcome')
  let pokemon = document.getElementById('pokemonList')
  let pokemons = document.getElementById('pokes')
  let pokeSelector = document.getElementById('pokeSelector')
  let pokeContainer = document.getElementById('pokeContainer')



  function hidePoke(){
    pokemon.style.visibility = "hidden";
  }

  hidePoke()

  function showObject(allPoke){
    allPoke.forEach(poke => {
      if(poke.evolution_level === 1) {
        let newOp = document.createElement("option")
        newOp.value = poke.id
        newOp.innerText = poke.name
        pokemons.appendChild(newOp)
      }
    }

    )
  }

  function createPokeOptions(){
    fetch("http://localhost:3000/pokemons")
    .then(res => res.json())
    .then(object => showObject(object))
  }

  createPokeOptions()

  function greetUser(username){
    usernameForm.style.visibility = "hidden";
    let newUl = document.createElement('ul')
    newUl.innerText = `Welcome to Fauxkemon, ${username.name}`
    welcomeContainer.appendChild(newUl)
    pokemon.style.visibility = "visible"
  }

  function showPoke(json, pokeName){
    pokeSelector.style.visibility = "hidden";
    welcomeContainer.style.visibility = "hidden";
    let newP = document.createElement('p')
    newP.innerText = `Great choice, ${json.name}! Get ready to train ${pokeName}`
    pokeContainer.appendChild(newP)
  }

  let userId

  usernameForm.addEventListener("submit", event => {
    event.preventDefault()
    let username = document.getElementById('username').value
    fetch("http://localhost:3000/users", {method: "post",
                                       headers: {'Accept': 'application/json',
                                       'Content-Type': 'application/json'},
                                       body: JSON.stringify({user:{name: username, pokemon_id: null}})})
                                       .then(res => res.json()).then(json => {greetUser(json)
                                       userId = json.id})});

  pokeSelector.addEventListener("submit", event => {
    event.preventDefault()
    let pokemon = document.getElementById('pokes').value
    let pokeName = document.querySelectorAll('option').innerText
    fetch(`http://localhost:3000/users/${userId}`, {method: "PATCH",
                                       headers: {'Accept': 'application/json',
                                       'Content-Type': 'application/json'},
                                       body: JSON.stringify({user:{pokemon_id: pokemon}})})
                                       .then(res => res.json()).then(json => {showPoke(json, pokeName)
                                        });
  });


})
