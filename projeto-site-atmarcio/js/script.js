document.addEventListener("DOMContentLoaded", () => {
    const timeElement = document.getElementById("current-time");
    const weatherElement = document.getElementById("weather");

    async function fetchCurrentTime() {
        try {
            const response = await fetch("http://worldtimeapi.org/api/timezone/America/Sao_Paulo");
            const data = await response.json();
            const time = new Date(data.datetime).toLocaleTimeString("pt-BR");
            timeElement.innerHTML = `<h3>Horário Atual</h3><p>${time}</p>`;
        } catch (error) {
            timeElement.innerHTML = `<h3>Horário Atual</h3><p>Erro ao carregar o horário.</p>`;
        }
    }

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
