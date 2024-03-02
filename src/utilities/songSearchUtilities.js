import { searchRecordingsByMBID } from "../api/musicBrainzAPI.js";

/**
 * Enhances an array of songs with genres by searching for recording details based on the relationships of each song.
 * @param {Array} songs - The array of songs to enhance with genres.
 * @returns {Promise<Array>} - A promise that resolves array of songs.
 */
export const enhanceSongsWithGenres = async (songs) => {
  for (let song of songs) {
    if (song.relationships && song.relationships.length > 0) {
      for (let relationship of song.relationships) {
        const recordingDetails = await searchRecordingsByMBID(relationship.id);
        relationship.genres = recordingDetails.genres.map(
          (genre) => genre.name
        );
      }
    }
  }
  return songs;
};
