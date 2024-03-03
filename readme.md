## Simple Sample Playlist API


## API Endpoints

Absolutely! Here's the documentation breakdown for your endpoints, tailored for the README:

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

**Endpoint: `/songs-related`**

* **Method:** GET
* **Purpose:** Finds related songs (sampled songs) for a list of input songs. Also includes genre information.
* **Parameters:**
  * `songs`: (array, required):  An array of song objects, where each song object must have:
      * `title`: Song title.
      * `artist` :Song artist.
* **Response:**
    * **Success (200):**  An array where each element represents the relationships for one input song (same format as `/song-related`).
    * **Error (500):** JSON object with `error` property describing the error.

**Example:** 
```
`/songs-related?songs=[{"title": "One More Time", "artist": "Daft Punk"}, {"title": "Rapper's Delight", "artist": "Sugarhill Gang"}]`
```

**Important Notes:**

* These endpoints tap into the MusicBrainz API to provide rich information about recordings and their relationships. 
* Consider adding rate-limiting or authentication if you plan to use this in a production environment.

Let me know if you'd like any of the explanations modified or want me to expand on specific details! 


## Built With

* [Express.js](https://expressjs.com/) - The web framework used
* [Node.js](https://nodejs.org/) - JavaScript runtime


## Acknowledgments

* This project uses the [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)
