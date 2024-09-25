import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { createSongRequest, updateSongRequest } from "./redux/songsSlice";
const defaultImage = "https://via.placeholder.com/150";
// Styled components for the form in a modal
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const SubmitButton = styled.button`
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

const CancelButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 1rem;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c9302c;
  }
`;

function CreateSongForm({ song, onClose }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  // Prefill the form if editing a song
  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setArtist(song.artist);
      setAlbum(song.album);
      setYear(song.year);
      setImage(song.image);
    }
  }, [song]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const songImage = image || defaultImage;

    if (song) {
      // Editing existing song
      dispatch(
        updateSongRequest({
          id: song.id,
          title,
          artist,
          album,
          year,
          image: songImage,
        })
      );
    } else {
      // Adding new song
      dispatch(
        createSongRequest({
          title,
          artist,
          album,
          year,
          image: songImage,
        })
      );
    }

    // Clear the form and close the modal
    setTitle("");
    setArtist("");
    setAlbum("");
    setYear("");
    setImage("");
    onClose();
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Album"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <SubmitButton type="submit">
        {song ? "Update Song" : "Add Song"}
      </SubmitButton>
      <CancelButton type="button" onClick={onClose}>
        Cancel
      </CancelButton>
    </FormWrapper>
  );
}

export default CreateSongForm;
