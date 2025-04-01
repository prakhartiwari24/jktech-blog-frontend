import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Paper } from "@mui/material";
import { API_URL } from "../../config/api";

const PostDetailPage: React.FC = () => {
  const [post, setPost] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Failed to fetch post", err));
  }, [id]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {post?.title}
        </Typography>
        <Typography variant="body1">{post?.body}</Typography>
      </Paper>
    </Container>
  );
};

export default PostDetailPage;
