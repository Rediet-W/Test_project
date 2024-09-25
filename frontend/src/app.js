import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongsRequest, deleteSongRequest } from "./redux/songsSlice";
import styled from "@emotion/styled";
import CreateSongForm from "./CreateSongForm";

// Styled components
const SongList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
    .song-info {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .actions {
      display: flex;
      gap: 10px;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const EditButton = styled.button`
  background-color: #f0ad4e;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ec971f;
  }
`;

const DeleteButton = styled.button`
  background-color: #d9534f;
  border: none;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c9302c;
  }
`;

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editSong, setEditSong] = useState(null);
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.list);
  const loading = useSelector((state) => state.songs.loading);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  // Handle delete song
  const handleDelete = (id) => {
    dispatch(deleteSongRequest(id));
  };

  // Handle edit song
  const handleEdit = (song) => {
    setEditSong(song);
    setShowForm(true); // Show the form for editing
  };

  return (
    <div>
      {/* Header section with title and add button */}
      <Header>
        <h1>Songs List</h1>
        <AddButton
          onClick={() => {
            setEditSong(null);
            setShowForm(true);
          }}
        >
          Add Song
        </AddButton>
      </Header>

      {/* Songs list */}
      {loading && <p>Loading...</p>}
      <SongList>
        {songs.map((song) => (
          <li key={song.id}>
            <div className="song-info">
              <img src={song.image} alt={`${song.title} cover`} />
              {song.title} - {song.artist} ({song.year})
            </div>
            <div className="actions">
              <EditButton onClick={() => handleEdit(song)}>Edit</EditButton>
              <DeleteButton onClick={() => handleDelete(song.id)}>
                Delete
              </DeleteButton>
            </div>
          </li>
        ))}
      </SongList>

      {/* Show form for editing or adding new song */}
      {showForm && (
        <CreateSongForm song={editSong} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

export default App;
