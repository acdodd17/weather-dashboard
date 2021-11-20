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

//city search form handler
var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = citySearchInputEl.value.trim();
    if (city){
        getCityWeather(city);
        getForcast(city);
        cities.push({city});
        citySearchInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }

    saveSearch();
    displaySearchHistory(city);
};

var getCityWeather = function(city) {

};

var displayWeather = function() {

};

var getForcast = function() {

};

var displayForcast = function() {

};

var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var displaySearchHistory = function() {

};

var getSearchHistoryData = function() {

};

//listen for city submit button
citySearchEl.addEventListener("submit", formSubmitHandler);
//listen for search history click 
searchHistory.addEventListener("click", getSearchHistoryData);