const apiKey = 'HaYNx8tSzFfmYncSjYeOiVdTe6mrfmGqALsNlrgK'; // Replace with your NASA API key
const apiUrl = 'https://api.nasa.gov/planetary/apod';


const displayDate = document.querySelector('.displayDate');
displayDate.textContent = new Date().toISOString().split("T")[0]


document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
});



document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const date = document.getElementById('search-input').value;
    if (date) {
        displayDate.textContent = date
        getImageOfTheDay(date);
    }
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetch(`${apiUrl}?date=${currentDate}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayImage(data);
    })
        .catch(error => {
            console.error('Error fetching the current image:', error);
        });
    }
    
function getImageOfTheDay(date) {
    fetch(`${apiUrl}?date=${date}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        displayImage(data);
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.error('Error fetching the image of the day:', error);
        });
}

function displayImage(data) {
    document.getElementById('current-image').src = data.url;
    document.getElementById('current-description').textContent = data.explanation;
    document.getElementById('current-title').textContent = data.title;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (date != undefined && !searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
    
    return searches;
}


function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = ''; // Clear the existing list
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    console.log('called', searches);
    searches.forEach(date => {
        if(date != null){
            const li = document.createElement('li');
            li.textContent = date;
            li.addEventListener('click', () => getImageOfTheDay(date));
            searchHistory.appendChild(li);
        }
    });
    
}
