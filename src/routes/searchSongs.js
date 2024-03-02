import express from "express";
import {
  searchRecordings,
  searchRecordingsByISRC,
  searchSongRelationships,
  searchRecordingsByMBID,
} from "../api/musicBrainzAPI.js";

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
    const recording = await searchRecordingsByISRC(isrc);
    res.json(recording);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/song-related/", async (req, res) => {
  const { title, artist } = req.query;
  try {
    const recordings = await searchRecordings(title, artist);

    if (recordings.length === 0) {
      return res.status(404).json({ error: "No recordings found" });
    }

    const mbids = recordings.map((recording) => recording.id);
    const relationshipsPromises = mbids.map((mbid) => {
      return searchSongRelationships(mbid); // No need for 'await' here
    });
    const songsWithRelationships = await Promise.all(relationshipsPromises);
    // res.json(songsWithRelationships);
    // get only relationships that have 'samples naterial' as type and the dirction is forward (song's that the current song samples from)
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
    const tagsPromises = relationships.map((song) => {
      return searchRecordingsByMBID(song.relationships[0].id);
    });

    const songsWithTags = await Promise.all(tagsPromises);
    songsWithTags.forEach((song, index) => {
      relationships[index].genres = song.tags.map((tag) => tag.name);
    });

    relationships.length === 0
      ? res.status(404).json({ error: "No relationships found" })
      : res.json(relationships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
