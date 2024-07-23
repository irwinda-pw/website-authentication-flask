const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password-retype');

//Show or Hide password characters
function togglePassword(event) {
   const trigger = event.target;
   trigger.classList.toggle("fa-eye");
   trigger.classList.toggle("fa-eye-slash");

   const input = trigger.parentNode.parentNode.querySelector('input')
   if (input.type === "password") {
      input.type = "text";
   } else {
      input.type = "password";
   }
   // another way to express if-else above >> 
   // input.type = input.type === "password" ? "text" : "password"
}

//Show error messages of input field
function showError(input, message) {
   input.className = 'form-control border-danger';
   const errormsg = input.parentElement.parentElement.querySelector('.invalid-feedback');
   errormsg.innerText = message;
   errormsg.classList.add('show-message');
}

//Show success color
function showSuccess(input) {
   input.className = 'form-control border-success';
}

//Check if email is valid
function checkEmail(input) {
   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(re.test(input.value.trim())) {
      showSuccess(input)
   }else {
      showError(input, 'Email is not valid.');
   }
}

//Check input length
function checkLength(input, min, max) {
   if(input.value.length < min) {
      showError(input, `${getFieldName(input)} must be at least ${min} characters`);
   }else if(input.value.length > max) {
      showError(input, `${getFieldName(input)} must be less than ${min} characters`);
   }else {
      showSuccess(input);
   }
}

//get fieldName
function getFieldName(input) {
   return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check password match
function checkPasswordMatch(input1, input2) {
   if(input1.value !== input2.value) {
      showError(input2, 'Passwords do not match.');
   }else {
      showSuccess(input2);
   }
}

//Event Listener when the form is submitted
form.addEventListener('submit', function(e){
   // e.preventDefault();

   checkLength(username, 3, 15);
   checkLength(password, 6, 25);
   checkEmail(email);
   checkPasswordMatch(password, password2);
})

function deleteNote(noteId) {
   fetch("/delete-note", {
      method: "POST",
      body: JSON.stringify({ noteId: noteId }),
   }).then((_res) => {
      window.location.href = "/";
   });
}