/* global Mongo */

var initialDate = new Date();
var connection = new Mongo('localhost:27017');
var db = db.getSiblingDB('arrisTvDatabase');

/*
 * Channels
 */
var numberOfChannels = db.channels.count();
var channelsCursor = db.channels.find();
var channel;

/*
 *  Title
 */
print();
print('Generating 3 weeks of 1/2 hour programs for each channel');
print('Execution should last less than 4 minutes to write 162288 programs (1008 for each of the ' + numberOfChannels + ' channels)');
print();

/*
 *  Programs
 */
var numberOfProgramsPerChannel = 1008; //Three weeks of 1/2 hour program
var programToAdd;
var indexPrograms = 0;
var currentTime;

while ( channelsCursor.hasNext() ) {
  channel = channelsCursor.next();
  indexPrograms = 0;
  currentTime = Date.now();
  for (indexPrograms = numberOfProgramsPerChannel; indexPrograms >= 1; indexPrograms--) {
    var newStartTime = currentTime + indexPrograms * 30;
    var newEndTime = currentTime + (indexPrograms + 1) * 30;
    var newDuration = newEndTime - newStartTime;
    programToAdd = {
      id: indexPrograms,
      name: channel.name + '-' + 'Program' + indexPrograms,
      channelId: channel.id,
      startTime: newStartTime,
      endTime:  newEndTime,
      duration: newDuration,
      ratingSymbol: 'G',
      secRatingSymbol: 'PG',
      actors: ['String', 'String'],
      directors: ['String', 'String']
    };
    db.programs.insert(programToAdd);
  }
}

var endDate = new Date();
var duration = endDate - initialDate;
var minutes = parseInt(duration / 1000 / 60, 10);
var seconds = duration / 1000 % 60;

var numberOfPrograms = db.programs.count();

print();
print();
print();
print(numberOfChannels + ' channels were written in the database');
print(numberOfPrograms + ' programs were written in the database');
print('The execution took ' + minutes + ':' + seconds.toFixed(3));
