REM Drop existing database (arrisTvDatabase)
mongo dropArrisTvDb.js

REM Import channels packages and channels
mongoimport --db arrisTvDatabase --collection channelsPackages --jsonArray --file mockData\channelsPackages.json
mongoimport --db arrisTvDatabase --collection channels --jsonArray --file mockData\channels.json

REM Add channels' ids to channels packages
mongo mockData\addChannelsToChannelsPackages.js

REM Generate programs for all channels
mongo mockData\generateProgramsForChannels.js
