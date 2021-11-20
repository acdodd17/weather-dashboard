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

//refresh and display search history
var refreshHistory = function() {
   cities = JSON.parse(localStorage.getItem('city'));
   for (i=0; i < cities.length; i++) {
       displaySearchHistory(city);
   }
}
//city search form handler
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = citySearchInputEl.value.trim();
    if (city){
        getCityWeather(city);
        // getForcast(city);
        cities.push({city});
        citySearchInputEl.value = "";
        saveSearch();
        displaySearchHistory(city);
    } else {
        alert("Please enter a city name");
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
    console.log(city);
    
    var cityNameEl = document.querySelector("#city-name");
    cityNameEl.textContent= city; 

    var date = new Date().toLocaleDateString();
    currentDateEl.textContent = date;

    var weatherIconEl = document.getElementById("current-weather-icon");
    weatherIconEl.setAttribute("src", "http://openweathermap.org/img/w/" +data.weather[0].icon+ ".png")

    var temp = document.getElementById("temp");
    var wind = document.getElementById("wind");
    var humidity = document.getElementById("humidity");

    temp.textContent= data.main.temp + " °F";
    wind.textContent= data.wind.speed + " MPH";
    humidity.textContent= data.main.humidity + " %"

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

// //get 5 day forcast for searched city 
// var getForcast = function() {

// };
// //display 5 day forcast 
// var displayForcast = function() {

// };

//save search date to cities array 
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

//create buttonEl for search city 
var displaySearchHistory = function(search) {
    var searchEl = document.createElement("button");
    searchEl.textContent = search; 
    searchEl.setAttribute("data-city", search)
    searchEl.setAttribute("type", "submit");
    searchEl.classList = "btn btn-secondary btn-lg my-2 p-2 w-100";

    searchHistory.append(searchEl);
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