async function fetchWeather() {
  // Współrzędne Tarnowa
  const latitude = 50.0138;
  const longitude = 20.9860;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;


  const weatherCodeMap = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "🌦️",
    55: "🌧️",
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    71: "🌨️",
    73: "🌨️",
    75: "❄️",
    80: "🌦️",
    81: "🌧️",
    82: "🌧️",
    95: "⛈️",
    96: "⛈️",
    99: "⛈️"
  };

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = data.current_weather.temperature;
    const code = data.current_weather.weathercode;
    const emoji = weatherCodeMap[code] || "🌡️";

    document.getElementById('weather').textContent = `Tarnów: ${temp}°C ${emoji}`;
  } catch (error) {
    console.error(error);
    document.getElementById('weather').textContent = 'Nie udało się pobrać pogody';
  }
}

document.addEventListener("DOMContentLoaded", fetchWeather);