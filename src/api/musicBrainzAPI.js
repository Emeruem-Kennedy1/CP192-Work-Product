const BASE_URL = "https://musicbrainz.org/ws/2";

const headers = {
  "User-Agent": "Samples API Client kennedyemeruem@uni.minerva.edu",
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
export const fetchRecordingDetails = async (mbid) => {
  const url = `${BASE_URL}/recording/${mbid}?fmt=json&inc=artist-credits+releases`;

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
  const url = `${BASE_URL}/isrc/${isrc}?fmt=json`;

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

export const searchRecordingsByMBID = async (mbid) => {
  const url = `${BASE_URL}/recording/${mbid}?fmt=json&inc=tags`;

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