# Pair-it
A GitHub-enabled remote pair programming application.

This repository only has our front-end, client-facing desktop app. The server repository is on GitHub [here](https://github.com/cdillon85/pair-app). And it is hosted remotely on Heroku at [pair-it.herokuapp.com](http://pair-it.herokuapp.com) where you can download the current version of our app.

To run the code locally follow the next steps.

### Authors:
 [James Deehan](https://github.com/jjdeehan), [Christine Dillon](https://github.com/cdillon85), [Terry O'Toole](https://github.com/otooleterrence), [Mike Peritz](https://github.com/mperitz)

## Getting started:

1. clone
2. cd to directory
3. ```yarn``` or ```npm install```

## Running The Development Environment:

You'll need to run the electron hot server in development mode.

In separate windows:

1. ```npm run hot-server```
  - runs a webpack that reloads in real time
2. ```npm run start-hot```
  - opens up a new app window after a second

## Packaging to macOS Desktop app:

- ```npm run package```
