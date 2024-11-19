document.addEventListener("DOMContentLoaded", () => {
    var timeDisplay = document.getElementById("time");
    const weatherElement = document.getElementById("weather");

   function refreshTime() {
    const optionsDate = {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'America/Sao_Paulo'
    };

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit', 
        second: '2-digit',
        timeZone: 'America/Sao_Paulo',
    };

    const date = new Date();
    
    const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);
    
    const formattedString = formattedDate.toLocaleLowerCase() + ' - ' + formattedTime
    
    timeDisplay.innerHTML = formattedString;
}

refreshTime()
setInterval(refreshTime, 1000);

    async function fetchWeather() {
        try {
            const response = await fetch("https://api.weatherapi.com/v1/current.json?key=demo&q=Sao%20Paulo&lang=pt");
            const data = await response.json();
            weatherElement.innerHTML = `
                <h3>Clima Atual</h3>
                <p>${data.location.name}: ${data.current.condition.text}, ${data.current.temp_c}°C</p>
                <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
            `;
        } catch (error) {
            weatherElement.innerHTML = `<h3>Clima Atual</h3><p>Erro ao carregar o clima.</p>`;
        }
    }

    fetchCurrentTime();
    fetchWeather();

    setInterval(fetchCurrentTime, 1000);
});

document.getElementById("request-button").addEventListener("click", () => {
    alert("Tudo certo, projeto solicitado!");
});
