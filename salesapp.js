'use strict';

/*
Create 5 objects for stores
Objects should have functions
  Min no customers
  Max no customers
  Av no of cookies
  Method for randomizing customer no

Results of each location in separate array
Display values as <ul>
Calculate sum of hourly totals

*/

//Function for randomizing numbers. Cited: MDN website https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

//Define the 5 stores as objects
var pike = {
  min_customers: 23,
  max_customers: 65,
  avg_cookies: 6.5,
  hourly_total: [],
  location_total: 0
};

var seatac = {
  min_customers: 3,
  max_customers: 24,
  avg_cookies: 1.2,
  hourly_total: [],
  location_total: 0
};

var seattleC = {
  min_customers: 11,
  max_customers: 38,
  avg_cookies: 3.7,
  hourly_total: [],
  location_total: 0
};

var capitol = {
  min_customers: 20,
  max_customers: 38,
  avg_cookies: 62.3,
  hourly_total: [],
  location_total: 0
};

var alki = {
  min_customers: 2,
  max_customers: 16,
  avg_cookies: 64.6,
  hourly_total: [],
  location_total: 0
};

//Array with hours, headings, and objects
var hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var html_headings = ['pike', 'seatac', 'seattleC', 'capitol', 'alki'];
var locations = [pike, seatac, seattleC, capitol, alki];

//Defines function that generates cookies sold per hour, and pushes it into an array
function calculate_hourly_cookies(){
  for (var i = 0; i < hours.length; i++){
    var customers = getRandomIntInclusive(this.min_customers, this.max_customers);
    var sold_cookies_raw = customers * this.avg_cookies;
    console.log(sold_cookies);
    //Truncation, Cite: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
    var sold_cookies = Math.trunc(sold_cookies_raw);
    this.hourly_total.push(sold_cookies);
    this.location_total = this.location_total + this.hourly_total[i];
  }
};

//Defines function to add hourly totals to page 
function add_hourly_total_to_page(oranges){
  for (var i = 0; i < hours.length; i++){
    var sold_list = document.getElementById(html_headings[oranges]);
    var hour_list = document.createElement('li');
    hour_list.textContent = `${hours[i]}: ${locations[oranges].hourly_total[i]}`;
    sold_list.appendChild(hour_list);
  }
};

//Defines function to add location totals to page
function add_total_to_page(apples){
  var sold_list = document.getElementById(html_headings[apples]);
  var total = document.createElement('li');
  total.textContent = 'Total: ' + this.location_total;
  sold_list.appendChild(total);
};

//Defines function to loop through locations to calculate all of the above!
var calculate_by_location = function (){
  for(var k=0; k < locations.length; k++){
    //Uses functions for locations in loop
    locations[k].calculate_hourly_cookies = calculate_hourly_cookies;
    locations[k].add_hourly_total_to_page = add_hourly_total_to_page;
    locations[k].add_total_to_page = add_total_to_page;

    //Calls functions using k index
    locations[k].calculate_hourly_cookies();
    locations[k].add_hourly_total_to_page(k);
    locations[k].add_total_to_page(k);
  }
}

//Calls function to loop through locations
calculate_by_location();
