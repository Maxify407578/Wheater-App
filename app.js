const apiKey = 'f416954cd3284911a26205815242912';  // Ihr API-Schlüssel
const locationInput = document.getElementById('location');
const weatherButton = document.getElementById('get-weather');
const weatherInfo = document.getElementById('weather-info');

weatherButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=de`)
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Loggt die API-Antwort zur Fehlerbehebung

                if (data.error) {
                    weatherInfo.innerHTML = `<p>Fehler: ${data.error.message}</p>`;
                } else {
                    const { location, current } = data;
                    const weatherIconUrl = `https:${current.condition.icon}`;
                    let sunrise = "Daten nicht verfügbar";
                    let sunset = "Daten nicht verfügbar";

                    // Überprüfen, ob die astro-Daten existieren
                    if (current.astro) {
                        sunrise = new Date(current.astro.sunrise).toLocaleTimeString();
                        sunset = new Date(current.astro.sunset).toLocaleTimeString();
                    }

                    // Wetterinformationen anzeigen
                    weatherInfo.innerHTML = `
                        <h2>Wetter in ${location.name}</h2>
                        <img src="${weatherIconUrl}" alt="Wetter Icon" class="weather-icon">
                        <p>Temperatur: ${current.temp_c}°C</p>
                        <p>Wetter: ${current.condition.text}</p>
                        <p>Luftfeuchtigkeit: ${current.humidity}%</p>
                        <p>Windgeschwindigkeit: ${current.wind_kph} km/h</p>
                        <p>Druck: ${current.pressure_mb} hPa</p>
                        <p>Gefühlte Temperatur: ${current.feelslike_c}°C</p>
                        <p>Sonnenaufgang: ${sunrise}</p>
                        <p>Sonnenuntergang: ${sunset}</p>
                    `;
                }
            })
            .catch(error => {
                weatherInfo.innerHTML = `<p>Fehler: ${error.message}</p>`;
            });
    } else {
        weatherInfo.innerHTML = `<p>Bitte geben Sie eine Stadt ein.</p>`;
    }
});
