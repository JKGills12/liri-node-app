# liri-node-app

## What LIRI does
The Liri Bot acts like the personal assistant, Siri on our iPhones. Liri will take in commands and return data back to the user with the closest results it can find to match it. If the user is in search of a song, this will take in the user's inputs to find a song with the title, artist name, and provides a preview link of the song from Spotify and which album it is from. For those searching for concerts in town, their search results will pull up the name of the venue for that artist, location, and date of the event. Liri can also search for movies and provide the Movie Title, Year it came out, IMDB rating, Rotten Tomato rating, Country where it was produced, language, the plot, and the actors in the film.


## How To Run the App
To run the app, the user must follow these steps:
* clone the the repo and enter their own Spotify API keys to the .env 
* in the liri.js file, the user can pick either of these options to search:
  * __spotify-this-song__ -- to search for song info
    * enter in the terminal: __*node liri.js spotify-this 'song title'*__
  * __concert-this__ -- to search for bands in town info
    * enter in the terminal: __*node liri.js concert-this 'artist name'*__
  * __movie-this__ -- to search for movie info
    * enter in the terminal: __*node liri.js movie-this 'movie title'*__
  * __do-what-it-says__ -- will pull data of whatever is in the random.txt
    * enter in the terminal: __*node liri.js do-what-it-says*__ 
* All successful search results will be logged in the log.txt file.

## Technology Used
axios - used to retrieve data from OMDB API

fs - used to retrieve text from random.txt using the do-what-it-says command

dotenv - used to securely protect the API keys

Moment.js - used to format display the event dates and times correctly

Spotify API - used to pull song data from Spotify Database


[Screencast Demo] (https://drive.google.com/file/d/1w6TFY9GwN9T88FwbR7KeoGFiZ-lAgH5q/view)

[GitHub] (https://github.com/JKGills12/liri-node-app.git)
