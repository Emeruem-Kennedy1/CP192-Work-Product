import express from "express";
import {
  searchRecordings,
  searchRecordingsByISRC,
  searchSongRelationships,
  searchRecordingsByMBID,
} from "../api/musicBrainzAPI.js";

import { enhanceSongsWithGenres } from "../utilities/songSearchUtilities.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const { title, artist } = req.query;
  try {
    const recordings = await searchRecordings(title, artist);
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/isrc/:isrc", async (req, res) => {
  const { isrc } = req.params;
  try {
    const recording = await searchRecordingsByMBID(isrc);
    res.json(recording);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/song-related/", async (req, res) => {
  const { title, artist } = req.query;
  try {
    let recordings = await searchRecordings(title, artist);

    //filter recordings where the score is greater than 90
    recordings = recordings.filter((recording) => recording.score > 70);

    if (recordings.length === 0) {
      return res.status(404).json({ error: "No recordings found" });
    }

    const mbids = recordings.map((recording) => recording.id);
    const relationshipsPromises = mbids.map((mbid) => {
      return searchSongRelationships(mbid); 
    });
    const songsWithRelationships = await Promise.all(relationshipsPromises);
    // get only relationships that have 'samples material' as type and the dirction is forward (song's that the current song samples from)
    const relationships = songsWithRelationships
      .map((song, index) => {
        return {
          title: recordings[index].title,
          relationships: song.relations.filter(
            (relation) =>
              relation.type === "samples material" &&
              relation.direction === "forward"
          ),
        };
      })
      .filter((song) => song.relationships.length > 0)
      .map((song) => {
        return {
          title: song.title,
          relationships: song.relationships.map((relation) => {
            return {
              title: relation.recording.title,
              id: relation.recording.id,
            };
          }),
        };
      });

    // for every song, get the tags of the song and add them to the existing relationships object
    const songsWithGenres = await enhanceSongsWithGenres(relationships);

    songsWithGenres.length > 0
      ? res.json(songsWithGenres)
      : res.status(404).json({ error: "No relationships found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
