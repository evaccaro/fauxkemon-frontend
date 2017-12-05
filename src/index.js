document.addEventListener("DOMContentLoaded", function(){

  // App-wide constants
  const TIME_TO_FIRST = 4; // in seconds
  const TIME_TO_SECOND = TIME_TO_FIRST * 2;
  const TIME_TO_THIRD = TIME_TO_SECOND * 2;

  // Global variables
  let currentTime = 0;

  // let username = document.getElementById('username').value
  // let usernameForm = document.getElementById('submituser')

  // function greetUser(username){
  //   alert(`Welcome, ${username}`)
  // }
  //
  //
  // usernameForm.addEventListener("submit", event => {
  //   event.preventDefault()
  //   let username = document.getElementById('username').value
  //   fetch('http://localhost:3000/users', {method: "post",
  //                                       headers: {'Accept': 'application/json',
  //                                       'Content-Type': 'application/json'},
  //                                       body: JSON.stringify({user:{name: username, pokemon_id: null}})})
  //                                       });

  function startGame() {
    let everySecond = setInterval(() => {
      if (currentTime < TIME_TO_THIRD){
        currentTime += 1;
        console.log(currentTime);
        if (currentTime < TIME_TO_FIRST) {
          console.log("this is the first pokemon");
          // code to change pokemon

        } else {
          console.log("this is the second pokemon")
          // code to change pokemon
        }
      }
      else {
        clearInterval(everySecond);
        console.log("Game Over")
      }
    }, 1000 );

  }

  startGame();

  function doesThisWork() {
    console.log('yes?')
  }

    let testButton = document.getElementById("test")
    testButton.addEventListener("click", () => currentTime += 5)

});
