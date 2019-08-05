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
        // logResults(data);
    });
} 
// Function to search Bands in Town API
function getBandsInTown(artist) {

    var artist = userSearch;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandQueryURL).then(
        function (response) {
            // add line results for clarity of results
            console.log("===================================="+ "\r\n");
            console.log("Name of the Venue: " + response.data[0].venue.name + "\r\n");
            console.log("Venue Location: " + response.data[0].venue.city + "\r\n");
            console.log("Date of event: " + moment(response.data[0].datatime).format("MM-DD-YYYY") + "\r\n");

            // Append data into log.txt
            var logConcert = "======Begin Concert Log Entry=====" + "\nName of artist: " + artist + "\nName of Venue: " + response.data[0].venue.name + "\nVenue location: " + response.data[0].venue.city + "\nDate of Event: " + moment(response.data[0].datatime).format("MM-DD-YYYY") + "\n======End of Concert Log Entry======" +"\n";

            fs.appendFile("log.txt", logConcert, function (err) {
              if (err) throw err;  
            });
            // logResults(response)
        }
    );
}

// Function to search OMDB API
function getOMDB(movie) {
    // console.log("Movie: " +movie);
    // If the user doesn't input a movie, Liri will output data for 'Mr. Nobody'.

    if (!movie) {
        movie = "Mr. Nobody";
    }

    var movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    // console.log(movieQueryURL);

    axios.request(movieQueryURL).then(
        function (response) {
            console.log(response.data);
            // add line breaks for clarity of search results
            console.log("====================================");
            console.log("* Title: " + response.data.Title + "\r\n");
            console.log("* Year Released: " + response.data.Year + "\r\n");
            console.log("* IMDB Rating: " + response.data.imdbRating + "\r\n");
            console.log("* Rotten Tomato Rating: " + response.data.Ratings[1].Value + "\r\n");
            console.log("* Country Where Produced: " + response.data.Country + "\r\n");
            console.log("* Language: " + response.data.Language + "\r\n");
            console.log("* Plot: " + response.data.Plot + "\r\n");
            console.log("* Actors: " + response.data.Actors + "\r\n");

            // logResults(response);
            var logMovie = "======Begin Movie Log Entry======" + "\nMovie Title: " + response.data.Title + "\nYear Released: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry Where Produced: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n=======End Movie Log Entry=======" + "\n";

            fs.appendFile("log.txt", logMovie, function (err) {
                if (err) throw err;
            });
        }
    );
}

// Function takes do-what-it-says from random.txt
function getRandom() {
    fs.readFile("random.txt", "utf8", function (error, data ) {
        if (error) {
            return console.log(error);

        } else {
            console.log(data);

            var randomData = data.split(",");
            runLiri(randomData[0], randomData[1]);
        }
    });
}

// Function to log results from other functions
function logResults(data) {
    fs.appendFile("log.txt", data, function (err) {
        if (err) throw err;
    });
}



// run liri command
runLiri(command, userSearch);


