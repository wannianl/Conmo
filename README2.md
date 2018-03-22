
# React App

## Installation

### Step 1 - Clone the repo

`git init`
`git clone https://github.com/wannianl/Conmo.git`

### Step 2 - Run the project
`cd app`
`npm install`
`npm run dev`

## Deploy
`npm run build`
`git remote add heroku https://git.heroku.com/react-conmo.git`
`git add .`
`git commit -m "new commit"`
`git push heroku master`

## General Info

### App Structure

- server.js
This is the Node.js backend that will be used to run the final version of the app and to integrate React with Twilio.
It's not being used yet.

- src/index.js
Holds the ReactDOM configuration.

- src/App.js
Holds the front-end routes for the app as well as the states and functions shared by most components in the app.
The database information is stored here.

- src/Profile
Holds most of the app structure

- src/Profile/index.js
Holds the structure for the Profile page.

-src/helpers/ParseHelper
Helper file holding functions to retrieve / add information to the database