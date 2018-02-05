const currentWeekNumber = require('current-week-number');
require("date-utils");


let dt = new Date();
let d = dt.toFormat("M")
let now = dt.toFormat("YYYY-MM-DD HH24:MI:SS")

console.log(d)
console.log(now)
 
// june 27, 2014 
console.log(currentWeekNumber());
//=> 26 
 
console.log(currentWeekNumber('March 24, 2015'));
//=> 13 
 
currentWeekNumber(new Date('March 24, 2015'));
//=> 13 
 
currentWeekNumber('03/24/2016');
//=> 12, cuz' year is leap 
 
currentWeekNumber('August 07, 2015');
//=> 32 
 
currentWeekNumber(new Date('August 07, 2016'));
//=> 31 
 
currentWeekNumber('02/16/2015');
//=> 8 
 
currentWeekNumber('September 15, 2126');
//=> 37 
 
currentWeekNumber('02/17/2012');
//=> 7 
