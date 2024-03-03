## Simple Sample Playlist API

This is a simple API that allows users to search for recordings, retrieve recording details, and find related songs. It uses the MusicBrainz API to retrieve recording information and relationships between songs.

## API Endpoints

base URL: `http://localhost:3000/song`

**Endpoint: `/search`**

* **Method:** GET
* **Purpose:** Searches for recordings based on song title and artist.
* **Parameters:**
   * `title` (string, required):  Song title.
   * `artist` (string, required): Song artist.
* **Response:**
    * **Success (200):**  Array of recording objects from MusicBrainz, with details like title, artist, release information, and a MusicBrainz ID (MBID).
    * **Error (500):** JSON object with `error` property describing the error.

**Example:**
`/search?title=Imagine&artist=John%20Lennon` 

**Endpoint: `/isrc/:isrc`**

* **Method:** GET
* **Purpose:** Retrieves a specific recording's details based on its ISRC.
* **Parameters:**
   * `isrc` (string, required): The ISRC (International Standard Recording Code) of the desired recording.
* **Response:**
    * **Success (200):** A detailed MusicBrainz recording object.
    * **Error (500):** JSON object with `error` property describing the error.

**Example:**
`/isrc/USXXX9900001`

**Endpoint: `/song-related`**

* **Method:** GET
* **Purpose:** Finds songs that are related to a given song (those that it samples from). Also includes genre information for each related song.
* **Parameters:**
  * `title` (string, required):  Song title.
  * `artist` (string, required): Song artist.
* **Response:**
    * **Success (200):** Array of song relationship objects, containing:
        *  `title`: Title of the original song.
        *  `relationships`: Array of related songs, each with:
            * `title`: Title of the related song.
            * `id`: MBID of the related song.
    * **Error (404):**  `{ error: "No recordings found" }` or  `{ error: "No relationships found" }`
    * **Error (500):** JSON object with `error` property describing the error.

**Example:**
`/song-related?title=Crazy&artist=Gnarls%20Barkley` 

## Getting Started

### Prerequisites

* Node.js
* npm
* Express.js

### Installing

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` or `npm run dev` to start the server
4. The server will be running on `http://localhost:3000`
5. Use the API endpoints to search for recordings, retrieve recording details, and find related songs


## Built With

* [Express.js](https://expressjs.com/) - The web framework used
* [Node.js](https://nodejs.org/) - JavaScript runtime


## Acknowledgments

* This project uses the [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)
