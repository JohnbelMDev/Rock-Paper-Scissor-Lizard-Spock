// work with house cass Ibrahim, Carolin, Rahma, Shawn

let buttons = document.querySelectorAll("button")
let submit = document.getElementById('submit')
let h2 = document.getElementById('h1')
buttons.forEach(x => x.addEventListener('click', myFunction))


function myFunction(e) {
  // console.log(e.target.value)
  let  chosenButton = e.target.value
  console.log(chosenButton)
  fetch(`/api?choices=${chosenButton}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector('h1').innerHTML = data.answer;
    })



}
