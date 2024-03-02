const BASE_URL = "https://musicbrainz.org/ws/2";

const headers = {
  "User-Agent": "Samples API Client kennedyemeruem@gmail.com",
  Accept: "application/json",
};

/**
 * Search for recordings by title and optional artist.
 * @param {string} title - The title of the recording.
 * @param {string} [artist] - The name of the artist.
 * @returns {Promise<Array>} - A promise that resolves to an array of recordings.
 */
export const searchRecordings = async (title, artist = "") => {
  const query = `recording:${title}${artist ? ` AND artist:${artist}` : ""}`;
  const url = `${BASE_URL}/recording?query=${encodeURIComponent(
    query
  )}&fmt=json`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error from MusicBrainz API: ${response.statusText}`);
    }
    const data = await response.json();

    // filter recordings with an isrc code
    const recordings = data.recordings.filter((recording) => recording.isrcs);
    return recordings;
  } catch (error) {
    console.error("Failed to fetch recordings:", error);
    throw error;
  }
};

/**
 * Fetches details for a specific recording by its MusicBrainz ID.
 * @param {string} mbid - The MusicBrainz ID of the recording.
 * @returns {Promise<Object>} - A promise that resolves to the recording details.
 */
export const fetchRecordingDetails = async (recordingMbid) => {
  const url = `${BASE_URL}/recording/${recordingMbid}?fmt=json&inc=artist-credits+releases`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error from MusicBrainz API: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch recording details:", error);
    throw error;
  }
};

/**
 * Searches for recordings by ISRC (International Standard Recording Code).
 * @param {string} isrc - The ISRC code of the recording.
 * @returns {Promise<Object>} - A promise that resolves to the data of the recording.
 * @throws {Error} - If there is an error from the MusicBrainz API or if the fetch operation fails.
 */
export const searchRecordingsByISRC = async (isrc) => {
  const url = `${BASE_URL}/isrc/${isrc}?fmt=json&inc=tags`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error from MusicBrainz API: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch recording details:", error);
    throw error;
  }
};

/**
 * Searches for song relationships in the MusicBrainz API.
 * @param {string} mbid - The MusicBrainz ID of the recording.
 * @returns {Promise<Object>} - A promise that resolves to the data of the recording relationships.
 * @throws {Error} - If there is an error from the MusicBrainz API or if the fetch operation fails.
 */
export const searchSongRelationships = async (mbid) => {
  const url = `${BASE_URL}/recording/${mbid}?fmt=json&inc=recording-rels`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error from MusicBrainz API: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch recording relationships:", error);
    throw error;
  }
};

/**
 * Searches for recordings by MusicBrainz ID.
 * @param {string} mbid - The MusicBrainz ID of the recording.
 * @returns {Promise<Object>} - A promise that resolves to the recording data.
 * @throws {Error} - If there is an error from the MusicBrainz API or during the fetch operation.
 */
export const searchRecordingsByMBID = async (mbid) => {
  const url = `${BASE_URL}/recording/${mbid}?fmt=json&inc=genres+tags`;

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error from MusicBrainz API here: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    ("");
    console.error("Failed to fetch recording details:", error);
    throw error;
  }
};

/**
 * Fetches the genres of an artist from the MusicBrainz API.
 * @param {string} mbid - The MusicBrainz ID of the artist.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of genres.
 * @throws {Error} - If there is an error fetching the artist details or parsing the response.
 */
export const fetchArtistGenres = async (mbid) => {
  const url = `https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json&inc=genres`;
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error fetching artist details: ${response.statusText}`);
    }
    const data = await response.json();
    // Extract genres
    const genres = data.genres ? data.genres.map((genre) => genre.name) : [];
    return genres;
  } catch (error) {
    console.error("Failed to fetch genres for the artist:", error);
    throw error;
  }
};

/**
 * Searches for an artist's MusicBrainz ID (MBID) based on the artist name.
 * @param {string} artistName - The name of the artist to search for.
 * @returns {Promise<string>} - A promise that resolves with the MBID of the first artist in the search results.
 * @throws {Error} - If there is an error fetching the artist or if no artist is found with the given name.
 */
export const searchArtistMBID = async (artistName) => {
  const url = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(
    artistName
  )}&fmt=json&inc=genres`;
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error fetching artist: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.artists && data.artists.length > 0) {
      // First artist in the search results because MusicBrainz API orders by releance score
      const artist = data.artists[0];
      return artist.id; // Returns the MBID of the first artist in the search results
    } else {
      throw new Error("No artist found with the given name.");
    }
  } catch (error) {
    console.error("Failed to search for artist MBID:", error);
    throw error;
  }
};

export const fetchArtistNameAndGenres = async (mbid) => {
  const url = `https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json&inc=genres+tags`;
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error fetching artist details: ${response.statusText}`);
    }
    const data = await response.json();
    // Extract name and genres
    const artistDetails = {
      name: data.name,
      genres: data.genres ? data.genres.map((genre) => genre.name) : [],
      tags: data.tags ? data.tags.map((tag) => tag.name) : [],
    };
    return artistDetails;
  } catch (error) {
    console.error("Failed to fetch artist name and genres:", error);
    throw error;
  }
};

export const fetchArtistGenresFromRecording = async (recordingMbid) => {
  try {
    const recordingDetails = await fetchRecordingDetails(recordingMbid);
    //   console.log(recordingDetails);
    if (
      recordingDetails &&
      recordingDetails["artist-credit"] &&
      recordingDetails["artist-credit"].length > 0
    ) {
      // Assuming the first artist is the primary artist
      const artistMbid = recordingDetails["artist-credit"][0].artist.id;
      console.log(artistMbid);

      const artistDetails = await fetchArtistNameAndGenres(artistMbid);
      return artistDetails;
    } else {
      throw new Error("Artist MBID not found in recording details.");
    }
  } catch (error) {
    console.error("Failed to fetch artist genres from recording:", error);
  }
};
