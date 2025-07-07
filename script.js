document.getElementById("getWeather").addEventListener("click", () => {
  const location = document.getElementById("locationInput").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");
  
    if (!location) {   //the input is empty, it shows an error message and stops the code from continuing.
      resultDiv.innerHTML = `<p style="color:red;">Please enter a location.</p>`;
      return;
    }
  
    const apiKey = "7eb2df9bd4584b5ea4d214905250505";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;
    resultDiv.innerHTML = `<p>Loading…</p>`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Location not found");
        }
        return response.json();
      })
      .then(data => {
        resultDiv.innerHTML = `
          <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
          <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
          <p><strong>Condition:</strong> ${data.current.condition.text}</p>
          <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
        `;
      })
      .catch(error => {
        resultDiv.innerHTML = `<p style="color:red;">Oops! ${error.message}. Please check the city name.</p>`;
        console.error(error);
      });
  });
  