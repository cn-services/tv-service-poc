REM Drop existing database (TvDatabase)
mongo dropTvDb.js

REM Import channels packages and channels
mongoimport --db tvDatabase --collection channelsPackages --jsonArray --file mockData\channelsPackages.json
mongoimport --db tvDatabase --collection channels --jsonArray --file mockData\channels.json

REM Add channels' ids to channels packages
mongo mockData\addChannelsToChannelsPackages.js

REM Generate programs for all channels
mongo mockData\generateProgramsForChannels.js
