#!/usr/bin/env bash

#MongoDB Installation (http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
MONGODB_VERSION=2.6.0
# Import the public key used by the package management system.
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
# Create a list file for MongoDB.
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
# Reload local package database.
sudo apt-get -y update
# Install the MongoDB packages. Install a specific release of MongoDB Enterprise.
sudo apt-get install -y mongodb-org=$MONGODB_VERSION mongodb-org-server=$MONGODB_VERSION mongodb-org-shell=$MONGODB_VERSION mongodb-org-mongos=$MONGODB_VERSION mongodb-org-tools=$MONGODB_VERSION
# Pin a specific version of MongoDB Enterprise to avoid undesired updates
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

# Start MongoDB.
cd /vagrant
sudo service mongod start --config db/mongodbConfig.conf

# Node.js Installation
sudo apt-get --purge remove -y node
sudo apt-get --purge remove -y nodejs
sudo apt-get install -y software-properties-common
sudo apt-get install -y python-software-properties
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update -y
sudo apt-get install -y python-software-properties python g++ make nodejs

# Start app
cd /vagrant
sudo npm install
npm start
