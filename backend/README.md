

# Arris TV Backend



## Usage
    
### Start the server

To start the server you must run:
  
  Step 1) Make sure a mongoDB server instance with all the data needed for the backend is running.
		  And the proper server to serve the posters and icons.
		  See http://10.116.73.171:18080/svn/dgpetprojects/clientServerSpike/mocks/mongoDbMock
  
  Step 2) Configure this server with the correct values to point to the servers listed in the step 1.
		  Edit the file config/config.json

  Step 3) Install dependencies.
			npm install

  Step 4) Configure the environment variable NODE_ENV with the proper value: development or production.
      If the variable is not set in your system, the default environment will be development.

  Step 5) Start application.
			npm start

## Tools
  
### NodeJS modules to install
  
  Mocha : npm install -g mocha
  Grunt : npm install -g grunt
  Grunt : npm install -g grunt-cli

