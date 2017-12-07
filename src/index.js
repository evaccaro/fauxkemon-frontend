document.addEventListener("DOMContentLoaded", function(){

  // App-wide constants
  const TIME_TO_FIRST = 4; // in seconds
  const TIME_TO_SECOND = TIME_TO_FIRST * 2;
  const TIME_TO_THIRD = TIME_TO_SECOND * 2;
  const DEFENSE_MULTIPLIER = 4;
  const HP_MULTIPLIER = 1.4;

  // Global variables
  let currentTime = 0;
  // let user;
  let pokemon;

  // Element tags
  let gameCenter = document.getElementById('gameCenter')
  let username = document.getElementById('username').value
  let usernameForm = document.getElementById('submituser')
  let welcomeContainer = document.getElementById('welcome')
  let header = document.getElementById('Header')
  let pokemonList = document.getElementById('pokemonList')
  let pokemons = document.getElementById('pokes')
  let pokeSelector = document.getElementById('pokeSelector')
  let pokeContainer = document.getElementById('pokeContainer')
  let pokemonTag = document.getElementById('pokemon')
  let gameConsole = document.getElementById('gameConsole')
  let battleCanvas =document.createElement('canvas')

  //Setting the Canvas width and height
  battleCanvas.width = "800"
  battleCanvas.height = "600"

  function hidePoke(){
    pokemonList.style.visibility = "hidden";

  }
  hidePoke()

  const user = usernameForm.addEventListener("submit", event => {
    event.preventDefault()
    let username = document.getElementById('username').value
    fetch("http://localhost:3000/users", {method: "post",
                                          headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                                          body: JSON.stringify({user:{name: username, pokemon_id: null}})})
        .then(res => res.json()).then(json => greetUser(json))
    });


    function greetUser(username){
      if (username.name !== ""){
        welcomeContainer.innerText = ""
        fade(usernameForm)
        let newUl = document.createElement('ul')
        newUl.innerText = `Welcome to Fauxkemon, ${username.name}`
        welcomeContainer.appendChild(newUl)
        unfade(holder)
        unfade(pokemonList)
      } else {
        let newUl = document.createElement('ul')
        newUl.innerText = `Please choose a username before continuing.`
        welcomeContainer.appendChild(newUl)
      }
    }

  // function findPokemonById(id){
  //   fetch(`http://localhost:3000/pokemons/${id}`)
  //   .then(res => res.json())
  //   .then(console.log)
  // }


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



  pokeSelector.addEventListener("submit", event => {
    event.preventDefault()
    let pokes = document.getElementById('pokes').value
    let pokeName = document.querySelectorAll('option').innerText
    // debugger;
    fetch(`http://localhost:3000/users/${pokes}`, {method: "PATCH",
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'},
    body: JSON.stringify({user:{pokemon_id: pokes}})})
    .then(res => res.json()).then(json => {pokemon = json.pokemon
      showPoke(json, pokemon)
      // battleButton = document.createElement('button');
      // battleButton.id = "battleButton"
      // battleButton.innerText = "Battle!"
      // document.getElementById("battleButtonDiv").appendChild(battleButton);
      // battleButton.addEventListener("click", battleClosure(json));
    });
  });
  function showPoke(json, pokemon){
    //debugger;
    fade(pokeSelector)
    fade(welcomeContainer)
    let newImg = document.createElement('img');
    newImg.src = "https://www.spriters-resource.com/resources/sheet_icons/4/3701.png"
    console.log(json)
    let newP = document.createElement('p')
    let trainButton = document.createElement('button')
    trainButton.innerHTML = 'Train!'
    trainButton.id = 'Train'
    newP.innerText = `Great choice, ${json.name}! Get ready to train ${pokemon.name}`
    pokeContainer.appendChild(newImg);
    pokeContainer.appendChild(newP)
    pokeContainer.appendChild(trainButton)
      // trainButton.addEventListener('click', event => {
      //   event.preventDefault();
      //   fade(header)
      //   fade(pokeContainer)
      //   gameConsole.style.background = 'none';
      //   gameCenter.append(battleCanvas)
      // })
      trainButton.addEventListener("click", battleClosure(json));
  }



  // function startGame() {
  //   let everySecond = setInterval(() => {
  //     if (currentTime < TIME_TO_THIRD){
  //       currentTime += 1;
  //       // console.log(currentTime);
  //       if (currentTime < TIME_TO_FIRST) {
  //         // console.log("this is the first pokemon");
  //         // code to change pokemon
  //
  //       } else {
  //         // console.log("this is the second pokemon")
  //         // code to change pokemon
  //       }
  //     }
  //     else {
  //       clearInterval(everySecond);
  //       // console.log("Game Over")
  //     }
  //   }, 1000 );
  // }
  //
  // startGame();






  function fade(element) {
      var op = 1;  // initial opacity
      var timer = setInterval(function () {
          if (op <= 0.1){
              clearInterval(timer);
              element.style.display = 'none';
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op -= op * 0.1;
      }, 50);
  }

  function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.visibility = "visible";
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}


  let ctx = battleCanvas.getContext('2d')

  // function draw(){
  //   // debugger;
  //   ctx.beginPath();
  //   ctx.fillRect(50, 450, 100, 10)
  //   ctx.fillStyle = "#0095DD";
  //   ctx.fillRect(650, 150, 100, 10)
  //   ctx.fillStyle = "#0095DD";
  //   ctx.closePath();
  // }
  // draw();

  function showMySprite(pokemon){
    let sprite = new Image()
    sprite.src = pokemon.sprite_back
    sprite.onload = function(){
      ctx.drawImage(sprite, 0, 200, 450, 450)
    }
  }

  function showEnemySprite(pokemon){
    let sprite = new Image()
    sprite.src = pokemon.sprite_front
    sprite.onload = function(){
      ctx.drawImage(sprite, 600, 0, 200, 200)
    }
  }

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
  let myPokemon = user.pokemon
   return function (event) {
     event.preventDefault();
     fade(header)
     fade(pokeContainer)
     gameConsole.style.background = 'none';
     gameCenter.append(battleCanvas)
    // what's the users pokemon?
    console.log('second scope')
    // generate random pokemon to fight
    fetch(`http://localhost:3000/pokemons/${(Math.floor(Math.random() * 9)) + 1}`)
    .then(res => res.json())
    .then(enemyPokemon => {
      battle(myPokemon, enemyPokemon)
    })

    // show enemy pokemon
    // show user pokemon
    // show battle interface

    function battle(myPokemon, enemyPokemon) {
      showEnemySprite(enemyPokemon)
      showMySprite(myPokemon);
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
