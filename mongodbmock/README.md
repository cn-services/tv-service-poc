

# MongoDB Mock Data - TV Backend


## Usage
    
### Start the server

  Step 1) Install MongoDB for your system.
  
  Step 2) Start the server by runng the command. Edit mongodbConfig.conf to change MongoDB server configuration.
			mongod --config config/mongodbConfig.conf
			
  Step 3) On other console, generate the mock data for  TV database (TvDatabase) by running the script
			generateTestData.bat
		  In the case you want to delete all data in the  TV (TvDatabase)
			mongo dropTvDb.js
			
  Step 4) Install dependencies.
			npm install
	
  Step 4) Start the node.js server to grant access to posters and icons.
			npm start

## Tools
  

