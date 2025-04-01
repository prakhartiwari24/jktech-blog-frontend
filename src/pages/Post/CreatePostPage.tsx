import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import { API_URL } from "../../config/api";

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .post(
        `${API_URL}/posts`,
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error("Failed to create post", err));
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 5, p: 4 }}>
        <Typography variant="h5" mb={2}>
          Create a New Post
        </Typography>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Body"
          multiline
          rows={5}
          variant="outlined"
          margin="normal"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Box mt={2}>
          <Button variant="contained" onClick={handleCreatePost}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePostPage;
