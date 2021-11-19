# TrackerMan
This is my SWEN325 
Welcome to my app Tackerman. It tracks routes which the user has walked on and can display stats about previous walks or specific ones on a map.

## Getting Started
There are the following steps before further development on this app can be continutes.

### Ensuring you have everything installed.
This project uses npm as its package manager. Before progressing further ensure you have `nodejs` installed on your device.

### Setting up the project
You can download this project using git and cloning the repo.

When in this directory in cmd or terminal install the required packages using:

```bash
npm install
```

This will install `Capacitor` as well as all dependancies required to run this app. The app can then be started with:

```bash
ionic capacitor run android
```

This will open and install the app on the attached android device.

### Development environment
I used Visual Studio Code to develop this application.

## What to know about the code and firebase
This app used firebase, but it is no longer running, so alternative steps must be taken

All code methods, classes and functions have their own javadoc style code comments. As well as the larger more complex methods have their own inline comments.

## Project architecture
This project has been split up into an MVP (Model View Presenter) architecture, any code contributions should match how the existing codebase represents this architecture.

#### View layer 
- All page.html files
  - EG: src/app/home/home.page.html

#### Presenter layer 
- All page.ts files
  - EG: src/app/home/home.page.ts

#### Model layer
- src/app/model.ts
