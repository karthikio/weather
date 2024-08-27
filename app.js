//javascript

document.addEventListener('DOMContentLoaded', () => {
    const location = document.querySelector('#location');
    const name = document.querySelector('#name');
    const icon = document.querySelector('#icon');
    const pressure = document.querySelector('#pressure');
    const temp = document.querySelector('#temp');
    const humidity = document.querySelector('#humidity');
    const speed = document.querySelector('#speed');
    const btn = document.querySelector('#btn');
    const output = document.querySelector('.output');

    const apiId = "YOUR_API_KEY";

    let temperature = 0;
    let locationInput = "";
    let weatherIcon = "";


    //input location
   location.addEventListener('input', (e) => {
    locationInput = e.target.value;
   })

   //on button click
   btn.addEventListener('click', (e) => {
    e.preventDefault();

    if(locationInput){
        const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiId}`;

        fetch(weatherApi)
        .then(res => res.json())
        .then(data => {
            output.style.display = "flex"

            //kelvin to celcius formula
            // round - to remove decimal point
            temperature = Math.round(data.main.temp - 273.15)

            temp.innerHTML = `${temperature}°C`
            name.innerHTML = data.name
            humidity.innerHTML = `Humidity 💧 ${data.main.humidity}%`
            speed.innerHTML = `Wind Speed 💨 ${data.wind.speed} Km/H`
            pressure.innerHTML = `Pressure: ${data.main.pressure} hPa`

            // link for weather icon
            weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            icon.innerHTML = `<p>${data.weather[0].main}</p> <img height="40px" width="40px" id="icon" src=${weatherIcon}>`

            // to empty input field
            location.value = ""
        })
        //to catch error
        .catch(error => console.log(error))
    }else{
        console.log("Enter location name.")
    }
   })

})
