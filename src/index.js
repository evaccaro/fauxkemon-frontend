document.addEventListener("DOMContentLoaded", function(){

  // App-wide constants
  const TIME_TO_FIRST = 4; // in seconds
  const TIME_TO_SECOND = TIME_TO_FIRST * 2;
  const TIME_TO_THIRD = TIME_TO_SECOND * 2;
  const DEFENSE_DIVISOR = 4;
  const HP_MULTIPLIER = 1.4;
  const XP_MULTIPLIER = 0.5;

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
  let firstPage = document.getElementById('firstPage')

  //Setting the Canvas width and height
  battleCanvas.width = "800"
  battleCanvas.height = "600"

  function hideFirst(){
    gameConsole.style.visibility = "hidden";
  }

  hideFirst()

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


    .then(res => res.json()).then(user => {
      greetUser(user)
      pokeSelector.addEventListener("submit", event => {
        event.preventDefault()
        let pokes = document.getElementById('pokes').value
        let pokeName = document.querySelectorAll('option').innerText
        // debugger;
        fetch(`http://localhost:3000/users/${user.id}`, {method: "PATCH",
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
    })
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

  firstPage.addEventListener("click", event => {
    event.preventDefault()
    fade(firstPage)
    setTimeout(unfade(gameConsole), 100)
  })


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
    var op = 0.01;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.visibility = "visible";
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 100);
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
    fetch(`http://localhost:3000/pokemons/${(Math.floor(Math.random() * 8)) + 1}`)
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

      let currentMyPokemonHp = myPokemon.stat_hp * HP_MULTIPLIER;
      let currentEnemyPokemonHp = enemyPokemon.stat_hp * HP_MULTIPLIER;

      // Elements
      let battleButtonDiv = document.getElementById("battleButtonDiv");
      let battleStatusDisplay = document.getElementById("battleStatusDisplay");

      // Interface
      let attackButton = document.createElement("button");
      attackButton.id = "attackButton";
      attackButton.innerText = "Attack";
      battleButtonDiv.appendChild(attackButton);

      let runButton = document.createElement("button");
      runButton.id = "runButton";
      runButton.innerText = "Run";
      battleButtonDiv.appendChild(runButton);

      let battleStatus = document.createElement("h2");
      battleStatus.id = "battleStatus";
      battleStatus.innerText = "Give me your best shot!"
      battleStatusDisplay.appendChild(battleStatus);
      console.log(battleStatus.innerText)

      let myHpDisplay = document.createElement("h3");
      myHpDisplay.id = "myHp";
      myHpDisplay.innerText = currentMyPokemonHp;
      battleStatusDisplay.appendChild(myHpDisplay);

      let enemyHpDisplay = document.createElement("h3");
      enemyHpDisplay.id = "enemyHp";
      enemyHpDisplay.innerText = currentEnemyPokemonHp;
      battleStatusDisplay.appendChild(enemyHpDisplay);

      // Need to add a run event listener

      // *** below is the battle flow ***

      // Attacking a Pokemon
      console.log("(Starting) Your pokemon hp: ", currentMyPokemonHp);
      console.log("(Starting) Enemy pokemon hp: ", currentEnemyPokemonHp);

      //Test
      // enemyPokemon.stat_speed = 0; ////THIS LINE IS ONLY FOR TESTING PURPOSES!!!!!!!!
      enemyPokemon.stat_speed = 0;
      if (myPokemon.stat_speed >= enemyPokemon.stat_speed) {
        // you go first
        // choose menu options
        console.log("You're faster! Make your move.");
        battleStatus.innerText = "You're faster! Make your move.";
        attackButton.addEventListener("click", attackClosure(myPokemon, enemyPokemon));
        runButton.addEventListener("click", (event) => {
          console.log("Live to fight another day.");
          battleStatus.innerText = "Live to fight another day."
          setTimeout(function () {
            console.log("XP Gained: 0");
            battleStatus.innerText = "XP Gained: 0";
            document.getElementById("battleButtonDiv").innerHTML = "";
            fightAgainButton = document.createElement("button");
            fightAgainButton.id = "fightAgainButton";
            fightAgainButton.innerText = "Fight again?"
            battleButtonDiv.appendChild(fightAgainButton);
            fightAgainButton.addEventListener("click", battleClosure(user))
          }, 1000);
        });


      } else {

        setTimeout(function () {
          console.log("Too slow! Get ready to defend.");
          battleStatus.innerText = "Too slow! Get ready to defend.";
          defend(enemyPokemon, myPokemon);
        }, 1000);
      }

      function attackClosure(attackingPokemon, defendingPokemon) {
        return function attack (event) {
          attackButton.removeEventListener("click", attack);

          let damage = attackingPokemon.stat_attack - defendingPokemon.stat_defense / DEFENSE_DIVISOR;
          currentEnemyPokemonHp -= damage;

          battleStatus.innerText = `You attacked! You dealt ${damage} damage.`;
          myHpDisplay.innerText = currentMyPokemonHp;
          enemyHpDisplay.innerText = currentEnemyPokemonHp;
          console.log(`You attacked! You dealt ${damage} damage.`)
          console.log("Your HP: ", currentMyPokemonHp)
          console.log("Enemy HP: ", currentEnemyPokemonHp)

          if (currentEnemyPokemonHp > 0) {
            defendingPokemonName = defendingPokemon.name;
            defendingPokemonName = defendingPokemonName.charAt(0).toUpperCase() + defendingPokemonName.slice(1);
            defend(defendingPokemon, attackingPokemon);
          } else {
            defendingPokemonName = defendingPokemon.name;
            defendingPokemonName = defendingPokemonName.charAt(0).toUpperCase() + defendingPokemonName.slice(1);
            battleStatus.innerText = `Congratulations! You defeated the ${defendingPokemonName}.`
            setTimeout(function () {
              getExperience(myPokemon, enemyPokemon);
            }, 1000);
          }
        }
      }

      function getExperience(myPokemon, enemyPokemon) {
        debugger;
        xpGained = enemyPokemon.base_experience * XP_MULTIPLIER;
        console.log(`XP Gained: ${xpGained}`);
        battleStatus.innerText = `XP Gained: ${xpGained}`;

      }

      function defend(attackingPokemon, defendingPokemon) {
        setTimeout(() => {
          damage = attackingPokemon.stat_attack - defendingPokemon.stat_defense / DEFENSE_DIVISOR;
          currentMyPokemonHp -= damage;
          battleStatus.innerText = `${defendingPokemonName} attacks and deals ${damage}`;
          myHpDisplay.innerText = currentMyPokemonHp;
          enemyHpDisplay.innerText = currentEnemyPokemonHp;
          console.log(`${defendingPokemonName} attacks and deals ${damage}`)
          console.log("Your HP: ", currentMyPokemonHp)
          console.log("Enemy HP: ", currentEnemyPokemonHp)
          if (currentMyPokemonHp > 0) {
            setTimeout(function () {
              console.log("It's your move.")
              battleStatus.innerText = "It's your move.";
              attackButton.addEventListener("click", attackClosure(defendingPokemon, attackingPokemon))
            }, 2000);
          } else {
            setTimeout(function () {
              console.log("You were defeated. Sorry, but you just weren't good enough.");
              battleStatus.innerText = "You were defeated. Sorry but you just weren't good enough.";
              setTimeout(function () {
                location.reload();
              }, 1500);
            }, 1500);
          }
        }, 3000);
      }



    }

  }
}

});
