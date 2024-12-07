const apiKey = config.apiKey;

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message || 'City not found'}`);
        }

        const data = await response.json();
        console.log('Weather data:', data);
        displayWeather(data);
    } catch (error) {
        console.error('Full error:', error);
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherDisplay = document.querySelector('.weather-display');
    const temp = document.getElementById('temp');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const weatherIcon = document.getElementById('weatherIcon');

    weatherDisplay.classList.add('active');
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    weatherIcon.src = `http://openweathermap.org/img/wn/11d@2x.png`;
}

// Add event listener for Enter key
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}); 