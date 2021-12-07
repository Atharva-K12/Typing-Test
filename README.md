# Readme

A Typing Speed Test application developed using MERN Stack.

## Requirements
Application is developed using MERN Stack:
* [ReactJs](https://reactjs.org/)
* [MongoDB](https://https://www.mongodb.com/try/download/community)
* [NodeJs](https://https://nodejs.org/en/)
* [Express](https://expressjs.com/)


#### Node Libraries Required
* for frontend
    * react
    * react-countdown-circle-timer
    * typewriter-effect
    * font-awesome
* for backend
    * express
    * cors
    * mongoose
    * mongoose-simple-random

## Usage

1. In the Typing_Test directory, use command
    `npm i`
    to install backend node dependancies.
2. Change Directory to frontend directory.
    `cd frontend`
3. Install the required Frontend node dependacies using
    `npm i`.

## Run

* To start frontend; Open a terminal in frontend directory and Run the command  
    `npm start`
* To start Backend; On another terminal open the Typing_Test directory and Run the Command:
    `node server.js`


## Description

* ###  Front Page
    ![](https://i.imgur.com/Y5uELRU.png)
    * `Start Now` button to start the typing test.
    * Typerwriter effect implemented using `typewriter-effect` module.
* ###  Social Media Panels
    * Floating icon buttons which link to GitHub and LinkedIn profiles on click.
    * Hovering effect added.
    * This will be displayed throughout the application lifetime.
    
    ![](https://i.imgur.com/bJo7EbA.png)

* ###  Typing Test
    ![](https://i.imgur.com/HSEtmDi.jpg)
    * AutoFocus attribute of HTML used in the input box.
    * Real-time measure of words per minute, characters per minute, correct words.
    * Timer with changing styling to keep track of time.
    * Current word is underlined.
    * Word(/letter) highlighted with green if matched correctly or red if incorrect. Entire word is marked wrong if any character is misspelt.
    
    ![](https://i.imgur.com/ZPeBNOD.jpg)
    * If space is pressed, cursor will shift to the next word irrespective of whether word entered before was completed or not. Text box is also cleared.
    * Use of backspace is allowed.
    
* ###  WPM, CPM and Accuracy Calculations
    * Words per minute is calculated for every word completed i.e. whenever a space is hit. Here we assume average letter count of word to be 6 to remove any bais.
    * Correct words are stored by making letter by letter comparison. This is also displayed in realtime.
    * Characters per minute is calculated by updating character count for every character other than space (For all calculations and input, space is the delimiter).
    * Accuracy is calculated from the ratio of correct words and total words typed and expressed as percentage.
 
* ###  Results and Leaderboard
    * The test ends if the paragraph(/text) provided is completed or the timer stops i.e after 60 seconds.
    * The results will display the calculated word per minute and also the accuracy of typing the text.
    
    ![](https://i.imgur.com/WJxU6a0.jpg)
    * User can start the test again by clicking on ``Play Again``.
    * Scores can be stored by entering `UserName` in the provided text box. These results are stored in the database and displayed on the leaderboard.
        ![](https://i.imgur.com/3EZmdzK.jpg)


    
* ###  Backend
    Database has been used for-
    1. Leaderboard entries-
    * New entry will be added if user presses the `Add to LeaderBoard` button on the result page.    
    * The entries are fetched from the `leaderboard` collection and displayed in realtime.
    2. Text during typing speed test-    
    * Different texts have already been stored in the collection `texts` using the MongoDB Compass.
    * The text to be fetched for display is selected at **random** from the collection.      

## Workflow

![](https://i.imgur.com/y8AG0y1.png)

## Contributors
* [Atharva Kathale](https://github.com/Atharva-K12)
* [Kalyani Sainis](https://github.com/Kals-13)
