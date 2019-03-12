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

//Constructor function for Store
function Stores(name, min_customers, max_customers, avg_cookies, hourly_total, location_total){
  this.name = name;
  this.min_customers = min_customers;
  this.max_customers = max_customers;
  this.avg_cookies = avg_cookies;
  this.hourly_total = hourly_total;
  this.location_total = location_total;
}

Stores.prototype.calculateHourlyCookies = function (){
  for (var i = 0; i < hours.length; i++){
    var customers = getRandomIntInclusive(this.min_customers, this.max_customers);
    var sold_cookies_raw = customers * this.avg_cookies;
    console.log(sold_cookies_raw);
    //Truncation, Cite: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
    var sold_cookies = Math.trunc(sold_cookies_raw);
    this.hourly_total.push(sold_cookies);
    this.location_total = this.location_total + this.hourly_total[i];
  }
};

//Using constructor function for 5 stores
var pike = new Stores('First and Pike', 23, 65, 6.5, [], 0);
var seatac = new Stores('Seatac Airport', 3, 24, 1.2, [], 0);
var seattleC = new Stores('Seattle Center', 11, 38, 3.7, [], 0);
var capitol = new Stores('Capitol Hill', 20, 38, 62.3, [], 0);
var alki = new Stores('Alki', 2, 16, 64.6, [], 0);

//Array with hours, headings, and objects
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Daily Location Total'];
// var html_headings = ['pike', 'seatac', 'seattleC', 'capitol', 'alki'];
var locations = [pike, seatac, seattleC, capitol, alki];

//Make a table
// 1. Get reference to parent // section
// 2. Create an element // p
// 3. Give it content //textContent
// 4. Connect child // parent.appendChild(child)

console.log(pike.calculateHourlyCookies());

//TABLES
var table_el = document.getElementById('cookie-table');

//Creates table header section
var table_head = document.createElement('thead');
//Creates header row
var head_row = document.createElement('tr');

//Creates beginning cell of header row
var head_row_beginning = document.createElement('th');
head_row_beginning.textContent = '';
head_row.appendChild(head_row_beginning);

//Loops to create header cells
for (var i = 0; i < hours.length; i++){
  var head_cells = document.createElement('td');
  head_cells.textContent = hours[i];
  head_row.appendChild(head_cells);
}
table_head.appendChild(head_row);
table_el.appendChild(table_head);

//Creates body section of table
var table_body = document.createElement('tbody');
//Loop to go through different stores
for(var k = 0; k < locations.length;k++){
  //Creates row in body
  var row = document.createElement('tr');

  //Creates beginning cell of row
  var row_beginning = document.createElement('th');
  row_beginning.textContent = locations[k].name;
  row.appendChild(row_beginning);

  //Loops to create cells
  for (var j = 0; j < hours.length; j++){
    var cells = document.createElement('td');
    cells.textContent = pike.hourly_total[j]; //change this to array from objects
    row.appendChild(cells);
  }
  table_body.appendChild(row);
}

table_el.appendChild(table_body);







// //Defines function that generates cookies sold per hour, and pushes it into an array
// function calculateHourlyCookies(){
//   for (var i = 0; i < hours.length; i++){
//     var customers = getRandomIntInclusive(this.min_customers, this.max_customers);
//     var sold_cookies_raw = customers * this.avg_cookies;
//     console.log(sold_cookies_raw);
//     //Truncation, Cite: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
//     var sold_cookies = Math.trunc(sold_cookies_raw);
//     this.hourly_total.push(sold_cookies);
//     this.location_total = this.location_total + this.hourly_total[i];
//   }
// }

// Stores.prototype.renderHourlyTotalToPage = function (oranges){
//   for (var i = 0; i < hours.length; i++){
//     var sold_list = document.getElementById(html_headings[oranges]);
//     var hour_list = document.createElement('li');
//     hour_list.textContent = `${hours[i]}: ${locations[oranges].hourly_total[i]}`;
//     sold_list.appendChild(hour_list);
//   }
// };

// //Defines function to add hourly totals to page
// function renderHourlyTotalToPage(oranges){
//   for (var i = 0; i < hours.length; i++){
//     var sold_list = document.getElementById(html_headings[oranges]);
//     var hour_list = document.createElement('li');
//     hour_list.textContent = `${hours[i]}: ${locations[oranges].hourly_total[i]}`;
//     sold_list.appendChild(hour_list);
//   }
// }

// Stores.prototype.renderTotalToPage = function (apples){
//   var sold_list = document.getElementById(html_headings[apples]);
//   var total = document.createElement('li');
//   total.textContent = 'Total: ' + this.location_total;
//   sold_list.appendChild(total);
// };


//Defines function to add location totals to page
// function renderTotalToPage(apples){
//   var sold_list = document.getElementById(html_headings[apples]);
//   var total = document.createElement('li');
//   total.textContent = 'Total: ' + this.location_total;
//   sold_list.appendChild(total);
// }

//Defines function to loop through locations to calculate all of the above!
// var calculateByLocation = function (){
//   for(var k=0; k < locations.length; k++){
//     //Uses functions for locations in loop
//     locations[k].calculateHourlyCookies = calculateHourlyCookies;
//     locations[k].renderHourlyTotalToPage = renderHourlyTotalToPage;
//     locations[k].renderTotalToPage = renderTotalToPage;

//     //Calls functions using k index
//     locations[k].calculateHourlyCookies();
//     locations[k].renderHourlyTotalToPage(k);
//     locations[k].renderTotalToPage(k);
//   }
// };

//Calls function to loop through locations
// calculateByLocation();

/* Nicholas Code Review Class 7
Not very dry to keep writing <ul> on the html. Eventually we will need a form that will add things to the page. Anything specific to the element will be done by the JS. Put a section on html id="all-stores", then you don't need the ul, make the ul in the JS. 

Do this by adding store name as a property in the store object.
Variable name is not able to be referenced in the object, so we need to declare a name if we want the string to be accessible.

(constructor function?)

Build ul in the render function for the li to live in.

So:
Reference the parent (section)
Create an element ul
Give content
  1. Reference the parent il
  2. Create element li
  3. Give it content (6am etc)
  4. ul.appendChild(li)
Append to the parent - section.appendChild(ul)

*/

//Nick's constructor function demo
//We want a function that builds objects
// var ConstructorName = function(key, prop, anything){
//   //this = {}
//   this.key = key;
//   this.prop =prop;
//   this.double_anything = anything * 2;
//   // return this is built in. Don't need to use return
// };

// // All because of the "new" keyword
// var newConstructedObject = new ConstructorName(1, 'coolio', [1,2,3]);

//This will return: ConstructorName { key: 1, prop: 'coolio', anything: [1,2,3]}


