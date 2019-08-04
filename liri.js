// Liri takes in the following commands
// concert-this
// spotify-this-song 
// movie-this
// do-what-it-says

// required npm modules
require("dotenv").config();
var inquirer = require("inquirer")
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");


// API Keys stored here
var omb
    // access spotify keys info
var spotify = new spotify(keys.spotify);

// Build Liri commands and have defaulted values
var commands = process.argv[2];
var commandParam = "";
var defaulted = {
    song: "The Sign",
    artist: "Ace of Base",
    movie: "Mr. Nobody",
    task: ""
}

var commands = ["spotify-this-song", "movie-this", "concert-this", "do-what-it-says", "Never Mind"]

// Liri takes in concert-this commands



// Liri takes spotify-this-song commands


// Liri takes movie-this commands


// Liri take do-what-it-says commands


