/* global Mongo */

print();
print('Dropping Arris TV database (arrisTvDatabase)');
print();

var initialDate = new Date();

var connection = new Mongo('localhost:27017');
var db = db.getSiblingDB('arrisTvDatabase');
db.dropDatabase();

var endDate = new Date();
var duration = endDate - initialDate;
var minutes = parseInt(duration / 1000 / 60, 10);
var seconds = duration / 1000 % 60;
var str = 'The execution took ' + minutes + ' minutes and ' + seconds.toFixed(3) + ' seconds';
print(str);
