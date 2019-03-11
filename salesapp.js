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

//Function for randomizing numbers
function getRandomIntInclusive(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

var hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

//Define object
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

//Function that generates cookies sold per hour, and pushes it into an array
pike.calculate_hourly_cookies = function(){
  for (var i = 0; i < hours.length; i++){
    var customers = getRandomIntInclusive(this.min_customers, this.max_customers);
    var sold_cookies = customers * this.avg_cookies;
    console.log(sold_cookies);
    this.hourly_total.push(sold_cookies);
    this.location_total = this.location_total + this.hourly_total[i];
  }
};

//Create li for each hour, include totals from above
pike.add_hourly_total_to_page = function(){
  for (var i = 0; i < hours.length; i++){
    var pike_list = document.getElementById('pike');
    var pike_hour_list = document.createElement('li');
    pike_hour_list.textContent = `${hours[i]}: ${pike.hourly_total[i]}`;
    pike_list.appendChild(pike_hour_list);
  }
}
//Function to add total to
pike.add_total_to_page = function(){
  var pike_list = document.getElementById('pike');
  var pike_total = document.createElement('li');
  pike_total.textContent = 'Total: ' + this.location_total;
  pike_list.appendChild(pike_total);
}

pike.calculate_hourly_cookies()
pike.add_hourly_total_to_page();
pike.add_total_to_page();

