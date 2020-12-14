//VARIABLES
const cardContainer = document.querySelector('.cardContainer');
const smallCards = cardContainer.children;
    //Overlay
    const overlayLayer = document.querySelector('#overlay');
    const overlayCard = document.querySelector('.displayCard');

//FETCH FUNCTIONS

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('Looks like there was a problem: ', error));
}

// let array;
// const testFetch = fetchData('https://randomuser.me/api/')
// .then(data => array = data.results[0]);
// const testFetch = fetchData('https://randomuser.me/api/')
    // .then(array => addCard(array));


//FETCH HELPER FUNCTIONS

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(responseText));
    }
}

//PAGE CONSTRUCTORS

// function addCard(array) {
//     const fullArray = array.results[0];
//     const image = fullArray.picture.medium;
//     const name = fullArray.name.first + ' ' + fullArray.name.last;
//     const email = fullArray.email;
//     const city = fullArray.location.city;
//     const html = `
//         <div class="employeeCard">
//         <img src="${image}" alt="employee photo">
//         <h2>${name}</h2>
//         <h4 class="email">${email}</h4>
//         <h4 class="city">${city}</h4>
//         </div>
//     `;
//     cardContainer.innerHTML += html;
// }

// function generate12(array) {
//     for(let i = 0; i < 12; i++) {
//         fetchData('https://randomuser.me/api/')
//     .then(array => addCard(array));
//     }
// }

// generate12();

function addCard(array, number) {    
    const fullArray = array.results[0];
    const image = fullArray.picture.medium;
    const name = fullArray.name.first + ' ' + fullArray.name.last;
    const email = fullArray.email;
    const city = fullArray.location.city;
    const html = `
        <div class="employeeCard ${number}">
        <img src="${image}" alt="employee photo">
        <h2>${name}</h2>
        <h4 class="email">${email}</h4>
        <h4 class="city">${city}</h4>
        </div>
    `;
    cardContainer.innerHTML += html;
}

let employeesInfo = [];

function generate12() {
    for(let i = 0; i < 12; i++) {
        fetchData('https://randomuser.me/api/')
    .then(array => {
        addCard(array, i);
        employeesInfo.push(array);
    })
    }
}

generate12();


// employeesInfo[0].results[0].