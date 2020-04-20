#!/bin/bash

# Install packages
npm install

# Install Mongo
brew tap mongodb/brew
brew install mongodb-community@4.2

# Run Mongo as a service
brew services start mongodb-community@4.2

# Import data into Mongo
mongo bookAPI <booksJson.js
