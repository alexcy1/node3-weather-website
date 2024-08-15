document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('form');
    const searchInput = document.querySelector('input');
    const weatherLocation = document.getElementById('weather-location');
    const weatherForecast = document.getElementById('weather-forecast');
    const weatherResult = document.getElementById('weather-result');
    const loadingSpinner = document.getElementById('loading-spinner');

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = searchInput.value;

        weatherResult.style.display = 'block';
        weatherLocation.textContent = 'Loading weather...';
        weatherForecast.textContent = '';
        loadingSpinner.style.display = 'block'; // Show the spinner

        fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                loadingSpinner.style.display = 'none'; // Hide the spinner
                if (data.error) {
                    const errorMessage = data.error.replace(/^Error:\s*/, '');
                    weatherLocation.textContent = errorMessage;
                    weatherForecast.textContent = '';
                } else {
                    weatherLocation.textContent = `Location: ${data.location}`;
                    weatherForecast.textContent = `Forecast: ${data.forecast}`;
                }
            })
            .catch((error) => {
                loadingSpinner.style.display = 'none'; // Hide the spinner
                weatherLocation.textContent = `Fetch error: ${error.message}`;
                weatherForecast.textContent = '';
            });
    });
});




// CURRENT DATE AND TIME
document.addEventListener("DOMContentLoaded", function() {
    const currentDateElement = document.getElementById("current-date");
    if (currentDateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }
});




// HANDBURGER MENU
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });
});




// Refresh the input button
document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('refresh-button');
    const searchInput = document.getElementById('location');

    refreshButton.addEventListener('click', () => {
        searchInput.value = '';  // Clear the input field
        searchInput.focus();     // Focus back on the input field
    });
});

