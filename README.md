# Pomni

## Overview

Pomni is an application to learn words using flashcards where users can create, read, edit, and delete flashcards! "Pomni" is a Russian word for "remember".

> **The app is hosted on [Heroku](https://pomni.herokuapp.com/).
You can use the dummy profile below to sign in with.**

- **Email:** simps523@gmail.com
- **Password:** flashcards2021#
- **Fictional Account Name:** Jo Simpson

***You are free to add/edit/delete flashcards**

***Please don't add anything inappropriate**

## Techstack

Languages
- HTML
- CSS
- JavaScript

Frameworks
- React.js
- Express.js
- PostgreSQL
- Node.js

## Installation
To install this app locally, please follow below instructions.

1. Install and start Docker
2. Install postgreSQL through Docker
3. Clone this repo
4. Install dependencies
```sh
npm i
``` 
5. Copy the example environment file. Set the keys.
```sh
cp .env.example .env
``` 
6. Initialize the database
```sh
npm run db:init
``` 
7. Start the development environment
```sh
npm start
``` 
8. The app will be running on `localhost:3000`

## Wireframes and User Stories
More details can be found in the 
[project document](https://docs.google.com/document/d/1J_5NasOWcC0rYkxaLs7ogfaibdnexdLfT3Agjjacz2U/edit?usp=sharing)


## Difficulties/Unsolved Problems
- Limited timeframe was the major constraint, that did not let the developer build functionity beyond the MVP and improve the UI
- It was challenging to mock API calls for testing, so the app has a limited amount of test for now


## Future Development

- Users should be able to choose to display flashcard front or back first
- Add a multiple choice quiz option for learning new words with scoring functionality
- Users should be able to create folders and arrange cards into folders
- Expand dictionary functionality to search for word translations into other languages, listen to pronounciations and see examples of using words in sentences


