import { searchRecordingsByMBID } from "../api/musicBrainzAPI.js";

export const enhanceSongsWithGenres = async (songs) => {
  for (let song of songs) {
    if (song.relationships && song.relationships.length > 0) {
      for (let relationship of song.relationships) {
        const recordingDetails = await searchRecordingsByMBID(relationship.id);
        relationship.genres = recordingDetails.genres.map((genre) => genre.name);
      }
    }
  }
  return songs;
};
