const modal = document.getElementById("modal");
var modalContent = document.getElementById("modalCont");
const userList = document.getElementById("userList");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentPageText = document.getElementById("currentPage");
prevButton.addEventListener("click", prevPage);
nextButton.addEventListener("click", nextPage);
var userData = [];
var page = 1;
var totalPages;


async function showUsers(page){
    await getData(page);
    //Create HTML
    userList.innerHTML = "";
    for(let i = 0; i < userData.length; i++){
        const markup = 
            `<div class="card">
                <h2>${userData[i].first_name}</h2>
                <button class="button modalBtn" id="${userData[i].id}" onclick='userClick("${userData[i].id}")'>Show info</button>
            </div>`;
    userList.innerHTML += markup;
    // Logic for next and prev button
    if(page == 1){
        prevButton.disabled = true;
        nextButton.disabled = false;
    }
    else if(page == totalPages){
        nextButton.disabled = true;
        prevButton.disabled = false;
    }
    }
}

showUsers();

function nextPage(){
    // Function to load next page
    page++;
    currentPageText.innerHTML = `${page}`;
    showUsers(page);
}

function prevPage(){
    // Function to load previous page
    page--;
    currentPageText.innerHTML = `${page}`;
    showUsers(page);
}

async function getData(page) {
    // fetch data
    let base = 'https://reqres.in/api/users/';
    let url = `${base}?page=${page}`;
    let response = await fetch(url);
    let data = await response.json();
    totalPages = data.total_pages;
    userData = data.data;
}



function userClick(index){
    // Function to show modal with specific user info
    let user = userData.filter(obj => {
        return obj.id === parseInt(index);
    })

    // Create modal HTML content
    modal.style.display = 'block';
    modalContent.innerHTML = `
    <span id="closeBtn">&times;</span>
    <h1 class="modalTitle">Employee: ${user[0].id}</h1>
    <div class="modalInfo">
        <p class="modalText">Email: <strong>${user[0].email}</strong></p>
        <p class="modalText">First Name: <strong>${user[0].first_name}</strong></p>
        <p class="modalText">Last Name: <strong>${user[0].last_name}</strong></p>
    </div>
    <div class="modalImg">
        <img src="${user[0].avatar}">
    </div>`;
    
    // Add click listener to close modal
    document.getElementById("closeBtn").addEventListener("click", closeModal);
}


function closeModal() {
    // Function to close modal
    modal.style.display = 'none'

}