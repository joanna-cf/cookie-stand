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

//Potential problem: what if there is one store with different hours? Could take a slice out of an array (take a slice out of a portion of the array). Array.slice(), putting in a start and an end. Would put in 12am-11pm, and then have property on each index of start and end index, so each object would have  particular slice
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Daily Location Total'];

//TABLES SECTION
//TODO: Could I make this any more dry? How could I get these to be looping.......?
var table_el = document.getElementById('cookie-table');

function renderHeader(){
  //Creates table header section
  var table_head = document.createElement('thead');
  //Creates header row
  var head_row = document.createElement('tr');

  //Creates beginning cell of header row
  var head_row_beginning = document.createElement('th');
  head_row_beginning.textContent = ''; //might be optional, by default, all elements have empty content
  head_row.appendChild(head_row_beginning);

  //Loops to create header cells
  for (var i = 0; i < hours.length; i++){
    var head_cells = document.createElement('td');
    head_cells.textContent = hours[i];
    head_row.appendChild(head_cells);
  }
  //Instead of having Daily total in array, can just create another cell here
  table_head.appendChild(head_row);
  table_el.appendChild(table_head);
}

//Constructor function for Store
function Stores(name, min_customers, max_customers, avg_cookies, sold_cookies_by_hour, location_total){
  this.name = name;
  this.min_customers = min_customers;
  this.max_customers = max_customers;
  this.avg_cookies = avg_cookies;
  this.sold_cookies_by_hour = sold_cookies_by_hour;
  this.location_total = location_total;
}

//Function calcaulates cookies AND location total --> should separate concerns and have the functions separate, and then have one function at the end to list everything based on what you've calculated
//Need sales per hour function, number of customers per hour function, so you can build a more detailed table later. Don't lose code readability.
Stores.prototype.calculateHourlyCookies = function (){
  for (var i = 0; i < hours.length; i++){
    var customers = getRandomIntInclusive(this.min_customers, this.max_customers);
    var sold_cookies_raw = customers * this.avg_cookies;
    console.log(sold_cookies_raw);
    //Truncation, Cite: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
    var sold_cookies = Math.trunc(sold_cookies_raw);
    this.sold_cookies_by_hour.push(sold_cookies);
    this.location_total = this.location_total + this.sold_cookies_by_hour[i];
  }
};

//Using constructor function for 5 stores
var pike = new Stores('First and Pike', 23, 65, 6.5, [], 0);
var seatac = new Stores('Seatac Airport', 3, 24, 1.2, [], 0);
var seattleC = new Stores('Seattle Center', 11, 38, 3.7, [], 0);
var capitol = new Stores('Capitol Hill', 20, 38, 62.3, [], 0);
var alki = new Stores('Alki', 2, 16, 64.6, [], 0);

//Array with hours, headings, and objects
//Make this an empty array, and once we instantiate a new object, push it into this array!
var locations = [pike, seatac, seattleC, capitol, alki];

//Make a table
// 1. Get reference to parent // section
// 2. Create an element // p
// 3. Give it content //textContent
// 4. Connect child // parent.appendChild(child)

console.log(pike.calculateHourlyCookies());
console.log(seatac.calculateHourlyCookies());
console.log(seattleC.calculateHourlyCookies());
console.log(capitol.calculateHourlyCookies());
console.log(alki.calculateHourlyCookies());

Stores.prototype.renderRow = function(){
  var row = document.createElement('tr');

  //Creates beginning cell of row
  var row_beginning = document.createElement('th');
  row_beginning.textContent = this.name;
  row.appendChild(row_beginning);

  //Loops to create cells
  //Take the final cell out of the array, so we don't have to do hour.length. Make the last cell out of the for loop with a different name. that way we can push more hours into the array if needed.
  for (var j = 0; j < (hours.length - 1); j++){
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
};

//Creates body section of table
var table_body = document.createElement('tbody');

//Appends body onto table element
table_el.appendChild(table_body);

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

  for(var n = 0; n < (hours.length - 1); n++){ //For every hour
    var foot_cell = document.createElement('td');
    var hourly_total = 0;

    for(var o = 0; o < locations.length; o++){ //Add all the totals
      hourly_total += locations[o]['sold_cookies_by_hour'][n];
      foot_cell.textContent = hourly_total;
    }
    foot_row.appendChild(foot_cell);
  }

  //Creates grand total cell in footer
  var foot_total = document.createElement('td');
  var grand_total = 0;
  for(var p = 0; p < locations.length; p++){
    grand_total += locations[p].location_total;
    foot_total.textContent = grand_total;
  }
  foot_row.appendChild(foot_total);

  //Appends row onto foot section
  table_foot.appendChild(foot_row);
  table_el.appendChild(table_foot);
}

//Calls all the functions here, including instantiating objects
renderHeader();
//Use for loop to call each store according to array
pike.renderRow();
seatac.renderRow();
seattleC.renderRow();
capitol.renderRow();
alki.renderRow();
renderFooter();

//for(var i in storesArray) === for (var i = 0; i <storesArray.length; i++) !!!!!

var first_div = document.getElementById('first');
var eventHandler = function(formSubmit){
  formSubmit.preventDefault();
  console.log(formSubmit);
};
first_div.addEventListener('click', eventHandler);

var username = formSubmit.target.username.value;
