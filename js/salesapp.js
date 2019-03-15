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

1. Get reference to parent // section
2. Create an element // p
3. Give it content //textContent
4. Connect child // parent.appendChild(child)

*/

//Function for randomizing numbers. Cited: MDN website https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

//Array with hours, headings, and objects
var locations = [];

//Using constructor function for 5 stores
var pike = new Stores('First and Pike', 23, 65, 6.5);
var seatac = new Stores('Seatac Airport', 3, 24, 1.2);
var seattleC = new Stores('Seattle Center', 11, 38, 3.7);
var capitol = new Stores('Capitol Hill', 20, 38, 62.3);
var alki = new Stores('Alki', 2, 16, 64.6);

locations.push(pike, seatac, seattleC, capitol, alki);

//Constructor function for Store
function Stores(name, min_customers, max_customers, avg_cookies){
  this.name = name;
  this.min_customers = min_customers;
  this.max_customers = max_customers;
  this.avg_cookies = avg_cookies;
  this.customersByHour = [];
  this.totalCustomers = 0;
  this.sold_cookies_by_hour = [];
  this.location_total = 0;
}

//Function to calclulate customers by hour, stored in an array in object
Stores.prototype.calculateCustomersByHour = function(){
  for(var i in hours){
    var customersThisHour = getRandomIntInclusive(this.min_customers, this.max_customers);
    this.customersByHour.push(customersThisHour);
    this.totalCustomers = this.totalCustomers + this.customersByHour[i];
  }
};

//Function to calculate cookies sold by hour, stored in an array in object
Stores.prototype.calculateCookiesByHour = function(){
  for(var i in hours){
    var sold_cookies_raw = this.customersByHour[i] * this.avg_cookies;
    //Truncation, Cite: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
    var sold_cookies = Math.trunc(sold_cookies_raw);
    this.sold_cookies_by_hour.push(sold_cookies);
    console.log(this.name + ' sold ' + sold_cookies + ' cookies at ' + hours[i]);
  }
};

//Function to calculate total for this location, stored as variable in object
Stores.prototype.calculateLocationTotal = function(){
  for(var i in hours){
    this.location_total = this.location_total + this.sold_cookies_by_hour[i];
  }
};

//Make a table
// 1. Get reference to parent // section
// 2. Create an element // p
// 3. Give it content //textContent
// 4. Connect child // parent.appendChild(child)

var table_el = document.getElementById('cookie-table');

//Function to render Header
function renderHeader(){
  var table_head = document.createElement('thead');
  var head_row = document.createElement('tr');

  //Creates beginning cell of header row
  var head_row_beginning = document.createElement('th');
  head_row.appendChild(head_row_beginning);

  //Loops to create header cells
  for (var i in hours){
    var head_cells = document.createElement('td');
    head_cells.textContent = hours[i];
    head_row.appendChild(head_cells);
  }

  //Creates ending cell of 'Daily Location Total'
  var headEndCell = document.createElement('td');
  headEndCell.textContent = 'Daily Location Total';
  head_row.appendChild(headEndCell);

  table_head.appendChild(head_row);
  table_el.appendChild(table_head);
}

//Function to render rows
Stores.prototype.renderRow = function(){
  var table_body = document.createElement('tbody');
  var row = document.createElement('tr');

  //Creates beginning cell of row
  var row_beginning = document.createElement('th');
  row_beginning.textContent = this.name;
  row.appendChild(row_beginning);

  for (var j in hours){
    var cells = document.createElement('td');
    cells.textContent = this.sold_cookies_by_hour[j];
    row.appendChild(cells);
  }

  //Creates end of row with totals in cells
  var row_totals = document.createElement('td');
  row_totals.textContent = this.location_total;
  row.appendChild(row_totals);
  //Appends each row onto the body
  table_body.appendChild(row);
  table_el.appendChild(table_body);
};

//Function to create table footer
function renderFooter(){
  //Creates table footer section
  var table_foot = document.createElement('tfoot');
  //Creates the footer row
  var foot_row = document.createElement('tr');
  //Creates the beginning of the footer row
  var foot_beginning = document.createElement('th');
  foot_beginning.textContent = 'Totals:';
  foot_row.appendChild(foot_beginning);

  //Creates the cells in footer ==> put this into loop, to loop through time totals
  for(var i in hours){ //For every hour
    var foot_cell = document.createElement('td');
    var hourly_total = 0;

    for(var j in locations){ //Add all the totals
      hourly_total += locations[j]['sold_cookies_by_hour'][i];
      foot_cell.textContent = hourly_total;
    }
    foot_row.appendChild(foot_cell);
  }

  //Creates grand total cell in footer
  var foot_total = document.createElement('td');
  var grand_total = 0;
  for(var m in locations){
    grand_total += locations[m].location_total;
    foot_total.textContent = grand_total;
  }
  foot_row.appendChild(foot_total);

  //Appends row onto foot section
  table_foot.appendChild(foot_row);
  table_el.appendChild(table_foot);
}

//Function to call all the functions here, including instantiating objects
Stores.prototype.render = function(){
  this.calculateCustomersByHour();
  this.calculateCookiesByHour();
  this.calculateLocationTotal();
  this.renderRow();
};

//Function to render everything onto page
function renderAll (){
  renderHeader();
  // renderBody();
  for(var j in locations){
    locations[j].render();
  }
  renderFooter();
}

renderAll();

//PLANNING:
//create event, get element by ID
//function of what we want to do when this even happens
//   I want this to collect the data for the new object
//add event listener
//WHAT I WANT IT TO DO
//Collect information for new instantiated object
//push object to existing location array

//Gets the form by ID
var storesForm = document.getElementById('locationForm');

//Event handler that performs the function
function submitForm(event){
  event.preventDefault();
  var newStoreName = event.target.storeName.value;
  var newMinCust = event.target.minCust.value;
  var newMaxCust = event.target.maxCust.value;
  var newAvg = event.target.avgCookie.value;
  var newStore = new Stores(newStoreName, newMinCust, newMaxCust, newAvg);
  //Runs all the functions necessary for properties in object
  newStore.render();
  //Pushes to existing array of all objects
  locations.push(newStore);
  console.log(locations);
  table_el.innerHTML = '';
  renderAll();
}

//Event Listener
storesForm.addEventListener('submit', submitForm);
