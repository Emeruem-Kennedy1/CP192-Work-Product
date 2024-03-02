import express from "express";
import searchSongs from "./routes/searchSongs.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/songs", searchSongs);

app.get("/", (req, res) => {
  res.send("Welcome to the Song Sample Search API!");
});

export default app;

// Modify the listen function for testing
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
