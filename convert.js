let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let resultBtn = document.querySelector(".result");
let selects = document.querySelectorAll(".option select");
let sel1 = document.getElementById("select1");
let sel2 = document.getElementById("select2");
let inputs = document.querySelectorAll(".input input");
let inpt1 = document.querySelector(".input1");
let inpt2 = document.querySelector(".input2");
let username

/*resultBtn.addEventListener("click", () => {
  let fromCurr = sel1.value;
  let fromVal = parseFloat(inpt1.value);
  let toCurr = sel2.value;

});*/

selects.forEach(s=>s.addEventListener("change", displayRate));


// inverser les deux valeur
document.querySelector(".swap").addEventListener("click", ()=>{
  console.log(inpt1.value)
  let in1 = inpt1.value;
  let in2 = inpt2.value;
  let op1 = sel1.value;
  let op2 = sel2.value;

  inpt2.value = in1;
  inpt1.value = in2;

  sel2.value = op1;
  sel1.value = op2;

  displayRate();
});


//plus d'info convertion
document.querySelector("#result").addEventListener("click",function() {
  let input1 = parseFloat(document.getElementById("input1")?.value);
  if (!isNaN(input1)) {
    document.querySelector("#box2").classList.toggle("show");
  } else {

  }
});

//ouvrir modal
$(document).ready(function(){
  $("#button").click(function(){
    $("#modal").modal();
  });
});

//close modal
document.querySelector("#form").addEventListener("submit", function (event){
  event.preventDefault()
  username = event.target[0].value
  displayValue(username)
  $("#modal").modal('hide');
})


//login sur la page
function displayValue(username) {
  document.querySelector("#pseudo").textContent = username
}

//condition password et login
$(document).ready(function(){
  function checkForm() {
    var username = $("#username").val();
    var password = $("#psw").val();
    if (username.length > 0 && password.length >= 8) {
      $("#login").prop('disabled', false);
    } else {
      $("#login").prop('disabled', true);
    }
  }
  $("#username").on('input', function(){
    checkForm();
  });
  $("#psw").on('input', function(){
    checkForm();
  });
});

// calcule euro --> livre
function result() {
  let input1 = parseFloat(document.getElementById("input1")?.value);
  let input2 = parseFloat(document.getElementById("input2")?.value);
  console.log(input1)
  console.log(input2)
  if (!isNaN(input1)) {
    document.getElementById("input2").value = (input1 * 0.87).toString(10) ;
  } else {
    alert("Veuillez remplir le montant a comparer");
  }
}
