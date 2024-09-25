const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let songs = [
  {
    id: 1,
    title: "Song A",
    artist: "Artist A",
    album: "Album A",
    year: 2021,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Song B",
    artist: "Artist B",
    album: "Album B",
    year: 2022,
    image: "https://via.placeholder.com/150",
  },
];

// Get all songs
app.get("/songs", (req, res) => {
  res.json(songs);
});

// Create a new song
app.post("/songs", (req, res) => {
  const newSong = { id: Date.now(), ...req.body };
  songs.push(newSong);
  res.status(201).json(newSong);
});

// Update a song
app.put("/songs/:id", (req, res) => {
  const { id } = req.params;
  const songIndex = songs.findIndex((song) => song.id === parseInt(id));
  if (songIndex === -1)
    return res.status(404).json({ message: "Song not found" });

  songs[songIndex] = { ...songs[songIndex], ...req.body };
  res.json(songs[songIndex]);
});

// Delete a song
app.delete("/songs/:id", (req, res) => {
  const { id } = req.params;
  songs = songs.filter((song) => song.id !== parseInt(id));
  res.status(204).end();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
