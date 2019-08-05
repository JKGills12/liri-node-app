require("dotenv").config();
// required npm modules
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");

//Variables for user entered arguments
var command = process.argv[2];
console.log("command: " + command);

// Var for userSearch, using splice to account for user's search start with index 3.
var userSearch = process.argv.slice(3).join(" ");

// Switch statements to run the code appropriately for each command
function runLiri(command, userSearch) {
    switch (command) {
        case "spotify-this-song":
            getSpotify(userSearch);
            break;

        case "concert-this":
            getBandsInTown(userSearch);
            break;

        case "movie-this":
            getOMDB(userSearch);
            break;

        case "do-what-it-says":
            getRandom();
            break;

        default:
            console.log("Please enter one of the following commands: 'spotify-this-song', 'concert-this', 'movie-this', 'do-what-it-says' in order to proceed with the search");
    }
       
}

// Function to search Spotify API
function getSpotify(songTitle) {
    // variable for secret IDs for spotify
    var spotify = new Spotify(keys.spotify);
    // console.log("Spotify key: " + spotify);

    if (!songTitle) {
        songTitle = "The Sign";
    }
    // console.log("songTitle if not a song title: " + songTitle);

    spotify.search({type: 'track', query: songTitle }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log("Data for searched song: " + data.tracks.items[0]);

        console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
        // return the Song Title
        console.log("Song Title: " + data.tracks.items[0].name + "\r\n");
        // return a preview link of the song from Spotify
        console.log("Song Preview Link: " + data.tracks.items[0].href + "\r\n");
        // return the album name
        console.log("Album: " + data.tracks.items[0].album.name + "\r\n");

        // Append text into log.txt file
        var logData = "=======Begin Spotify Log Entry=======" + "\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong Title: " + data.tracks.items[0].name + "\n Preview Link: " + data.tracks.items[0].href + "\nAlbum Name: " + data.tracks.items[0].album.name + "\n=====End Spotify Log Entry=====" + "\n";
        
        fs.appendFile("log.txt", logData, function (err) {
            if (err) throw err;
        });
        // logResults(data)
    });
} 
// Liri takes in concert-this commands



// Liri takes spotify-this-song commands


// Liri takes movie-this commands


// Liri take do-what-it-says commands



// run liri command
runLiri(command, userSearch);


