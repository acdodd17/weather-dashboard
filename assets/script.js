//array of cities searched 
var cities = [];
//document elements 
var citySearchEl = document.getElementById("city-search-form")
var citySearchInputEl = document.getElementById("city-search");
var citySearchButtonEl = document.getElementById("city-search-button");
var currentWeatherContainerEl = document.getElementById("current-weather");
var cityNameEl = document.getElementById("city-name");
var currentDateEl = document.getElementById("current-date");
var currentWeatherIconEl = document.getElementById("current-weather-icon");
var searchHistory = document.getElementById("search-history");
var forcastContainer = document.getElementById("5-day-container");

//document.addEventListener("DOMContentLoaded", displaySearchHistory);


//city search form handler
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = citySearchInputEl.value.trim(); 
    if (city){
        getCityWeather(city);
        getForecast(city);
        cities.push(city);
        citySearchInputEl.value = "";
        saveSearch();
        addSearchHistory(city);
    } else {
        alert("Please enter a city name");
    }
};

//save search date to cities array 
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

//refresh and display search history --> feels repetative from addSeachHistory funtion below, but nothing is working 
var displaySearchHistory = function() {
    var cities = JSON.parse(localStorage.getItem("cities"));
    for (var i=0; i < cities.length; i++) {
        if (cities) {
             var cityEl = document.createElement("button");
             cityEl.textContent = cities[i]; 
             cityEl.setAttribute("data-city", city)
             cityEl.setAttribute("type", "submit");
             cityEl.classList = "btn btn-secondary btn-lg my-2 p-2 w-100";
             citySearchButtonEl.appendChild(cityEl);
        } 
     }
 };


//get current weather for searched city
var getCityWeather = function(city) {
    var apiURL ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=0cbf47a9b149dfc856f0a307af9b64fe";

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayWeather(data, city);
        });
    });
};
// //display current weather 
var displayWeather = function(data, city) {
    document.getElementById("current-weather").classList.remove("hide");
    
    var cityNameEl = document.querySelector("#city-name");
    cityNameEl.textContent= city; 

    var date = new Date().toLocaleDateString();
    currentDateEl.textContent = date;

    var weatherIconEl = document.getElementById("current-weather-icon");
    weatherIconEl.setAttribute("src", "http://openweathermap.org/img/w/" +data.weather[0].icon+ ".png")

    var currentTemp = document.getElementById("current-temp");
    var currentWind = document.getElementById("current-wind");
    var currentHumidity = document.getElementById("current-humidity");

    currentTemp.textContent= data.main.temp + " °F";
    currentWind.textContent= data.wind.speed + " MPH";
    currentHumidity.textContent= data.main.humidity + " %"

    var getUVIndex = function () {
        var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=0cbf47a9b149dfc856f0a307af9b64fe"
        fetch(apiURL)
        .then(function(response){
            response.json().then(function(data){
                console.log(data);
               
                var uvindex= document.getElementById("uvindex");
                uvindex.textContent= data.current.uvi;
                console.log(data.current.uvi);

                if(data.current.uvi <=2){
                    uvindex.setAttribute("class", "favorable");
                }else if(data.current.uvi >2 && data.current.uvi<=8){
                   uvindex.setAttribute("class", "moderate");
                }
                else if(data.current.uvi >8){
                    uvindex.setAttribute("class", "severe");
                };
            });
        })      
    }

    getUVIndex();
};

//get 5 day forecast for searched city 
var getForecast = function(city) {
    var apiURL ="https://api.openweathermap.org/data/2.5/forecast?q=" + city+ "&units=imperial&appid=0cbf47a9b149dfc856f0a307af9b64fe";

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayForecast(data, city);
        });
    });
};

// //display 5 day forecast 
var displayForecast = function(data) {
    //show forecast cards
    document.getElementById("day-1").classList.remove("hide");
    document.getElementById("day-2").classList.remove("hide");
    document.getElementById("day-3").classList.remove("hide");
    document.getElementById("day-4").classList.remove("hide");
    document.getElementById("day-5").classList.remove("hide");
    document.getElementById("forecast-header").classList.remove("hide");

    //set new date for the next 5 days 
    var dayOne = new Date();
    dayOne.setDate(dayOne.getDate() + 1);
    document.getElementById("day-1-date").textContent = dayOne.toLocaleDateString();

    var dayTwo= new Date();
    dayTwo.setDate(dayTwo.getDate() + 2);
    document.getElementById("day-2-date").textContent = dayTwo.toLocaleDateString();

    var dayThree = new Date();
    dayThree.setDate(dayThree.getDate() + 3);
    document.getElementById("day-3-date").textContent = dayThree.toLocaleDateString();

    var dayFour = new Date();
    dayFour.setDate(dayFour.getDate() + 4);
    document.getElementById("day-4-date").textContent = dayFour.toLocaleDateString();

    var dayFive = new Date();
    dayFive.setDate(dayFive.getDate() + 5);
    document.getElementById("day-5-date").textContent = dayFive.toLocaleDateString();

    //get temp, wind speed, and humidity for day 1
    var forcastIconEl = document.getElementById("day-1-icon");
    forcastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png")

    var day1Temp = document.getElementById("day-1-temp");
    var day1Wind = document.getElementById("day-1-wind");
    var day1Humidity = document.getElementById("day-1-humidity");

    day1Temp.textContent= data.list[0].main.temp + " °F";
    day1Wind.textContent= data.list[0].wind.speed + " MPH";
    day1Humidity.textContent= data.list[0].main.humidity + " %"

    //get temp, wind speed, and humidity for day 2
    var forcastIconEl = document.getElementById("day-2-icon");
    forcastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[1].weather[0].icon + ".png")

    var day2Temp = document.getElementById("day-2-temp");
    var day2Wind = document.getElementById("day-2-wind");
    var day2Humidity = document.getElementById("day-2-humidity");

    day2Temp.textContent= data.list[1].main.temp + " °F";
    day2Wind.textContent= data.list[1].wind.speed + " MPH";
    day2Humidity.textContent= data.list[1].main.humidity + " %"

    //get temp, wind speed, and humidity for day 3
    var forcastIconEl = document.getElementById("day-3-icon");
    forcastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[2].weather[0].icon + ".png")

    var day3Temp = document.getElementById("day-3-temp");
    var day3Wind = document.getElementById("day-3-wind");
    var day3Humidity = document.getElementById("day-3-humidity");

    day3Temp.textContent= data.list[2].main.temp + " °F";
    day3Wind.textContent= data.list[2].wind.speed + " MPH";
    day3Humidity.textContent= data.list[2].main.humidity + " %"

    //get temp, wind speed, and humidity for day 4
    var forcastIconEl = document.getElementById("day-4-icon");
    forcastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png")

    var day4Temp = document.getElementById("day-4-temp");
    var day4Wind = document.getElementById("day-4-wind");
    var day4Humidity = document.getElementById("day-4-humidity");

    day4Temp.textContent= data.list[3].main.temp + " °F";
    day4Wind.textContent= data.list[3].wind.speed + " MPH";
    day4Humidity.textContent= data.list[3].main.humidity + " %"

    //get temp, wind speed, and humidity for day 5
    var forcastIconEl = document.getElementById("day-5-icon");
    forcastIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png")

    var day5Temp = document.getElementById("day-5-temp");
    var day5Wind = document.getElementById("day-5-wind");
    var day5Humidity = document.getElementById("day-5-humidity");

    day5Temp.textContent= data.list[4].main.temp + " °F";
    day5Wind.textContent= data.list[4].wind.speed + " MPH";
    day5Humidity.textContent= data.list[4].main.humidity + " %"
};

//create buttonEl for search city 
var addSearchHistory = function(search) {
    var searchEl = document.createElement("button");
    searchEl.textContent = search; 
    searchEl.setAttribute("data-city", search)
    searchEl.setAttribute("type", "submit");
    searchEl.classList = "btn btn-secondary btn-lg my-2 p-2 w-100";
    searchHistory.append(searchEl);
    cities.push(search);
};

//get weather data for previously searched city 
var getSearchHistoryData = function(event) {
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        //getForcast(city);
    }
};

//listen for city submit button
citySearchEl.addEventListener("submit", formSubmitHandler);
console.log(cities);

//listen for search history click 
searchHistory.addEventListener("click", getSearchHistoryData);