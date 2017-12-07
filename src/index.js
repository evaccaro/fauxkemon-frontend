document.addEventListener("DOMContentLoaded", function(){

  // App-wide constants
  const TIME_TO_FIRST = 4; // in seconds
  const TIME_TO_SECOND = TIME_TO_FIRST * 2;
  const TIME_TO_THIRD = TIME_TO_SECOND * 2;
  const DEFENSE_MULTIPLIER = 4;
  const HP_MULTIPLIER = 1.4;

  // Global variables
  let currentTime = 0;
  let user;
  let pokemon;

  // Element tags
  let username = document.getElementById('username').value;
  let usernameForm = document.getElementById('submituser');
  let welcomeContainer = document.getElementById('welcome');
  let pokemonList = document.getElementById('pokemonList');
  let pokemons = document.getElementById('pokes');
  let pokeSelector = document.getElementById('pokeSelector');
  let pokeContainer = document.getElementById('pokeContainer');
  let pokemonTag = document.getElementById('pokemon');
  // let battleButton = document.getElementById('battleButton');

  // Event handlers
  // battleButton.addEventListener("click", battle);

  function hidePoke(){
    pokemonList.style.visibility = "hidden";
  }

  hidePoke()

  function findPokemonById(id){
    fetch(`http://localhost:3000/pokemons/${id}`)
    .then(res => res.json())
    .then(json => json)
  }

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
    pokemonList.style.visibility = "visible"
  }

  function showPoke(json, pokemon){
    pokeSelector.style.visibility = "hidden";
    welcomeContainer.style.visibility = "hidden";
    let newImg = document.createElement('img');
    newImg.src = "https://www.spriters-resource.com/resources/sheet_icons/4/3701.png"
    let newP = document.createElement('p')
    newP.innerText = `Great choice, ${json.name}! Get ready to train ${pokemon.name}`
    pokeContainer.appendChild(newImg);
    pokeContainer.appendChild(newP)
  }




  function startGame() {
    let everySecond = setInterval(() => {
      if (currentTime < TIME_TO_THIRD){
        currentTime += 1;
        // console.log(currentTime);
        if (currentTime < TIME_TO_FIRST) {
          // console.log("this is the first pokemon");
          // code to change pokemon

        } else {
          // console.log("this is the second pokemon")
          // code to change pokemon
        }
      }
      else {
        clearInterval(everySecond);
        // console.log("Game Over")
      }
    }, 1000 );
  }

  startGame();




  usernameForm.addEventListener("submit", event => {
    event.preventDefault()
    let username = document.getElementById('username').value
    fetch("http://localhost:3000/users", {method: "post",
                                       headers: {'Accept': 'application/json',
                                       'Content-Type': 'application/json'},
                                       body: JSON.stringify({user:{name: username, pokemon_id: null}})})
                                       .then(res => res.json()).then(json => {greetUser(json)
                                       user = json})});

  pokeSelector.addEventListener("submit", event => {
    event.preventDefault()
    let pokes = document.getElementById('pokes').value
    let pokeName = document.querySelectorAll('option').innerText
    fetch(`http://localhost:3000/users/${user.id}`, {method: "PATCH",
                                       headers: {'Accept': 'application/json',
                                       'Content-Type': 'application/json'},
                                       body: JSON.stringify({user:{pokemon_id: pokes}})})
                                       .then(res => res.json()).then(json => {pokemon = json.pokemon
                                         showPoke(json, pokemon)
                                         battleButton = document.createElement('button');
                                          battleButton.id = "battleButton"
                                          battleButton.innerText = "Battle!"
                                          document.getElementById("battleButtonDiv").appendChild(battleButton);
                                          battleButton.addEventListener("click", battleClosure(json));
                                        });
  });



  // const leftside = document.querySelector('#leftside')
  // const ctxL = leftside.getContext('2d')
  //
  // function draw(){
  //   ctxL.beginPath();
  //   ctxL.fillRect(5, 5, 100, 100)
  //   ctxL.fillStyle = "#0095DD";
  //   ctxL.closePath();
  // }
  // draw()
function battleClosure(user) {
   return function (event) {
    // what's the users pokemon?

    // generate random pokemon to fight
    fetch(`http://localhost:3000/pokemons/${Math.floor(Math.random() * 10)}`)
    .then(res => res.json())
    .then(enemyPokemon => {
      battle(user.pokemon, enemyPokemon)
    })

    // show enemy pokemon
    // show user pokemon
    // show battle interface

    function battle(userPokemon, enemyPokemon) {
      
    }
    // one turn
    // ---> choose option
    // ---> choose do action
    // ---> check if dead
    // -----------> if opponent dead, generate win actions
    // -----------> if you're dead, generate lose actions
    // -----------> else, do another turn

  }
}

});
