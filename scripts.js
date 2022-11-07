var modal = document.getElementById("modal");
var closeBtn = document.getElementById("closeBtn");
var modalBtn = document.getElementsByClassName("modalBtn");
var userId = document.getElementById("userId");
var userEmail = document.getElementById("userEmail");
var userFirstName = document.getElementById("userFirstName")
var userLastName = document.getElementById("userLastName")
var userImage = document.getElementById("userImage")
var obj;
const apiUrl = 'https://reqres.in/api/users/';

// assign function on closeBtn 
closeBtn.addEventListener("click", closeModal);

// Get data from api 
fetch('https://reqres.in/api/users/').then((response) => {
    return response.json()
}).then(data => {
    obj = data;
    data.data.forEach(elem => {
        createUser(elem);
    });
});



function createUser(user){
    // Create li for each user and place inside ul
    const markup = `<li>${user.first_name} <button class="button modalBtn" onclick='userClick("${user.id}")')>Show info</button></li>`;
    document.getElementById("userList").innerHTML += markup;
}


function userClick(id){
    // Edit modal to represent specific user
    user = obj.data[id-1];
    modal.style.display = 'block';
    userId.innerHTML =`Id: ${user.id}`;
    userEmail.innerHTML = `Email: ${user.email}`;
    userFirstName.innerHTML = `First Name: ${user.first_name}`;
    userLastName.innerHTML = `Last Name: ${user.last_name}`;
    userImage.setAttribute("src", user.avatar);
    console.log(obj.data[id-1].id);
}

function closeModal() {
    // Function to close modal
    modal.style.display = 'none'

}