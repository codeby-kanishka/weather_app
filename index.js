//Weather app
const weatherForm = document.getElementById("weatherData");
const cityInput = document.getElementById("inputbox");
const card = document.getElementById("card");
const apiKey ="84970962d39583a53320d837566c9318";


weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
       
        try{
            const weatherdata = await getWeatherData(city);
            displayWeather(weatherdata);
        }
        catch(error){
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
 })


async function getWeatherData(city){

   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error("Couldn't fetch the details.Please try again");
    }
    return response.json();

}
function displayWeather(weatherdata){
   const {name : city,main:{temp,humidity},weather : [{description,id}]} = weatherdata;

   card.textContent="";
   card.style.display = "flex";

   const cityDisplay = document.createElement("p");
   const tempDisplay = document.createElement("p");
   const humidityDisplay = document.createElement("p");
   const weatherDesc = document.createElement("p");
   const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay")
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp-273.15).toFixed(2)}°C`;
    tempDisplay.classList.add("tempdisplay");
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity : ${humidity}`;
    humidityDisplay.classList.add("humiditydisplay")
    card.appendChild(humidityDisplay);


    weatherDesc.textContent = description;
    weatherDesc.classList.add("weatherdesc")
    card.appendChild(weatherDesc);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatheremoji")
    card.appendChild(weatherEmoji);

}
function getWeatherEmoji(id){
    switch (true){
        case (id>=200 && id<300) :
            return "⛈️";

        case (id>=300 && id<400) :
            return "🌦️";

        case (id>=500 && id<600) :
            return "🌧️";

        case (id>=600 && id<700) :
             return "🌨️";

             case (id>=700 && id<800) :
                return "💨";

            case (id==800) :
                return "☀️";

                case (id>800 && id<900):
                    return "🌥️"

    }

}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    errorDisplay.classList.add("errorDisplay");
 
    card.textContent="";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}