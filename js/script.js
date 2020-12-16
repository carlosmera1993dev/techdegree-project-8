//VARIABLES
const cardContainer = document.querySelector('.cardContainer');
const smallCards = cardContainer.children;
//fetched data stored in an array
let employeesInfo = [];
let employeeNumber;
//Overlay
const overlayLayer = document.querySelector('#overlay');
const overlayCard = document.querySelector('.displayCard');
const closeButton = document.querySelector('#closeButton');
const backArrow = document.querySelector('#back');
const forwardArrow = document.querySelector('#forward');

//FETCH FUNCTIONS

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('Looks like there was a problem: ', error));
}


//FETCH HELPER FUNCTIONS

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(responseText));
    }
}

//PAGE CONSTRUCTORS

//add individual cards function 
function addCard(array, number) {    
    const fullArray = array.results[0];
    const image = fullArray.picture.large;
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

//generate each employee card
function generate12() {
    for(let i = 0; i < 12; i++) {
        fetchData('https://randomuser.me/api/')
            .then(array => {
                addCard(array, i);
                employeesInfo.push(array);
    })
    //add event listener
    .finally (()=> {
        //If all cards have loaded, add event listeners
        // if (smallCards.length === 12) {
            for(let i = 0; i < 12; i++ ) {
                smallCards[i].addEventListener('click', (event) => {
                    console.log(smallCards[i].classList[1]);
                    popUpCard(i);       
                    //Store which employee is being displayed for switching
                    employeeNumber = i;         
                })
            }
        // }
    })    
    }
}

//Create the pop up card
function popUpCard(employeeNumber) {    
    const currentEmployee = employeesInfo[employeeNumber].results[0];
    const image = currentEmployee.picture.large;
    const name = currentEmployee.name.first + ' ' + currentEmployee.name.last;
    const email = currentEmployee.email;
    const city = currentEmployee.location.city;
    const phone = currentEmployee.phone;
    const zip = currentEmployee.location.state + ' ' + currentEmployee.location.postcode;
    const street = currentEmployee.location.street.number + ' ' + currentEmployee.location.street.name;
    const address = street + ' | ' + zip;
    const day = currentEmployee.dob.date.slice(8,10);
    const month = currentEmployee.dob.date.slice(5,7);
    const year = currentEmployee.dob.date.slice(2,4);
    const birthday = day + '/' + month + '/' + year;
    const html = `
        <img src="images/close.png" id="closeButton" onclick="closeDisplay()">
        <img src="${image}" alt="">
        <h3 class="cardName">${name}</h3>        
        <h4 class="cardEmail">${email}</h4>
        <h4 class="cardCity">${city}</h4>
        <h4 class="cardPhone">${phone}</h4>
        <h4 class="cardAddress">${address}</h4>
        <h4 class="cardBirthday">${birthday}</h4>
    `;
    overlayCard.innerHTML = html;
    showDisplay();
}

//hide the pop up

function showDisplay() {
    overlayCard.style.opacity = 1;  
    overlayLayer.style.display = 'block';         
    overlayLayer.style.opacity = 1; 
}

function closeDisplay() {
    overlayCard.style.opacity = 0;
    overlayLayer.style.display = 'none';    
    overlayLayer.style.opacity = 0;
}

generate12();

//Switch between employees
backArrow.addEventListener('click', switchBack);
forwardArrow.addEventListener('click', switchForward);

function switchBack() {
    if(employeeNumber === 0) {
        employeeNumber = 11;
    } else {
        employeeNumber -= 1;
    }
    popUpCard(employeeNumber);
}

function switchForward() {
    if(employeeNumber === 11) {
        employeeNumber = 0;
    } else {
        employeeNumber += 1;
    }    
    popUpCard(employeeNumber);
}
