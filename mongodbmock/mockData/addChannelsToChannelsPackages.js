/* global Mongo */

var connection = new Mongo('localhost:27017');
var db = db.getSiblingDB('tvDatabase');

var channelsPackage;
var channelsPackageName;
var channelsCursor;
var channel;
var tempArray = [];
var channelsPackagesCursor = db.channelsPackages.find();
while ( channelsPackagesCursor.hasNext() ) {
  channelsPackage = channelsPackagesCursor.next();
  channelsPackageName = channelsPackage.name;
  tempArray = [];
  channelsCursor = db.channels.find({ 'channelPackages' : channelsPackageName});

  while ( channelsCursor.hasNext() ) {
    channel = channelsCursor.next();
    tempArray.push(channel.id);
  }

  db.channelsPackages.update(
    {name:channelsPackage.name},
    {$set: {channels:tempArray}}
  );
}
