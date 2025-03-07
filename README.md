# Overiew

The purpose of this project is to demonstrate UI capabilities using React, Typescript, react-redux and related technologies through a front-end application that manages GitHub Gist access.

### Frameworks and Libraries

The project uses React, Typescript and react-redux for optimizing the user experience and reliability. \
In addition, prettier and lint are used to ensure clean code.

# Project Structure

The Project structure includes the following:

### components

There are the highest level functional components of the application for displaying lists of Gists by \
user (GistViewer.tsx), displaying list of Gist files(GistDetails.tsx), viewing file content (FileContent.tsx) \
and finally displaying and managing Favorites for each file (Favorites.tsx).

### context

This contains the code for managing User Context throughout the application.

### data

This contains code for managing the asyncnronous requesting and loading of data from the 2 remote APIs for GitHub \
gists provided for the project.

### store

This contains the code for managing react-redux elements for state management, specifically gists, giles and favorites.

### types

This contains the code for managing Typescript types related to gist, file and favorite types.

### ui

This contains reusable UI elements for higher-level components.

### utils

This contains code used for utility functions used elsewhere in the application including validation and error handling.

### assets

These contains icons used in the application.

# State Management

State is managed through 3 mechanisms:

### 1. react-redux

    Data that is reused in different components

### 2. User Context

    User names that are re-used in different components

### 3. useState

    Local state that is specific to individua components.

# Coding Tools

### Prettier

`npm run format` runs prettier to apply consistent rules to code formatting

### Lint

`npm run lint` runs lint to check for isses related to type compatibility and other build errors.

# Building and Running the Application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
