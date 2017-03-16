# Capstone, Pear Programming, Parrot, Pear-it

## Getting started:

1. clone
2. cd to directory
3. ```yarn``` or ```npm install```

## Running the local server:

1. ```npm run start-server```

*This will be removed after we get Heroku running our Norway server*

## Running Electron:

In separate windows:

1. ```npm run hot-server```
  - runs a webpack that should reload in real time
2. ```npm run start-hot```
  - opens up a new app window after a second

## Development Notes:
- The app folder is where all of our react and redux components will be added.
- There are a bunch of test scripts already setup, we would just need to fill them out
- 'Backend' is where we have our temporary sockets server setup, set to port 1337
- The linter is crazy right now, I want to see if I can get our fullstack linter loaded
- I have no idea what the following things are doing and haven't looked them up yet:
  - flow and .flowconfig etc
  - .nvmrc
  - .tern-project
  - .travis.yml
  - appveyor.yml
  - mocks file
  - flow-typed file
  - .vscode/settings.json
- there are a bunch of warnings that come up on the webpack, but I don't know where they are coming from yet
  - but it still works
