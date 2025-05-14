async function fetchWeather() {
  const city = 'Tarnow';
  const url = `https://wttr.in/${city}?format=j1`;

  const iconMap = {
    "Sunny": "☀️",
    "Clear": "🌙",
    "Partly cloudy": "⛅",
    "Cloudy": "☁️",
    "Overcast": "☁️",
    "Mist": "🌫️",
    "Patchy rain possible": "🌦️",
    "Light rain": "🌧️",
    "Heavy rain": "🌧️",
    "Moderate rain": "🌧️",
    "Patchy snow possible": "🌨️",
    "Snow": "❄️",
    "Thunderstorm": "⛈️"
  };

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = data.current_condition[0].temp_C;
    const desc = data.current_condition[0].weatherDesc[0].value;
    const emoji = iconMap[desc] || "🌡️";

    document.getElementById('weather').textContent = `${city}: ${temp}°C ${emoji}`;
  } catch (error) {
    document.getElementById('weather').textContent = 'Nie udało się pobrać pogody';
  }
}

// Uruchomienie funkcji po załadowaniu strony
document.addEventListener("DOMContentLoaded", fetchWeather);
