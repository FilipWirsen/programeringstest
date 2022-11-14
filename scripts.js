const modal = document.getElementById("modal");
var modalContent = document.getElementById("modalCont");
var obj;
async function getData(page, allData = []) {

    // fetch data
    let base = 'https://reqres.in/api/users/';
    let url = `${base}?page=${page}`;
    let response = await fetch(url);
    let data = await response.json();

    allData.push(data); 
  
    // get 'total_pages' and 'page'
    let totalPages = data.total_pages;
    let currentPage = data.page;
    if (currentPage == totalPages) {
      return allData;
    } else {
      // get the next page and repeat
      page++;
      return getData(page, allData);
    }
  }


let page = 1;
getData(page).then((data) => {
    obj = data;
    data.forEach(elem => {
        elem.data.forEach(user => {
            createUser(user);
        });    
    });
    }).catch((error) => {
    console.log(error)
})


function createUser(user){
    const markup = `<div class="card">
                        <h2>${user.first_name}</h2>
                        <button class="button modalBtn" id="${user.id}" onclick='userClick("${user.id}")')>Show info</button>
                    </div>`;
    document.getElementById("userList").innerHTML += markup;
}


function userClick(index){
    if(index <= 6){
        user = obj[0].data[index-1]
    }
    else if(index <= 12){
        user = obj[1].data[index-7]
    }
    modal.style.display = 'block';
    modalContent.innerHTML = `
    <span id="closeBtn">&times;</span>
    <h1 class="modalTitle">Employee: ${user.id}</h1>
    <div class="modalInfo">
        <p class="modalText">Email: <strong>${user.email}</strong></p>
        <p class="modalText">First Name: <strong>${user.first_name}</strong></p>
        <p class="modalText">Last Name: <strong>${user.last_name}</strong></p>
    </div>
    <div class="modalImg">
        <img src="${user.avatar}">
    </div>`;
    var closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", closeModal);
}


function closeModal() {
    // Function to close modal
    modal.style.display = 'none'

}