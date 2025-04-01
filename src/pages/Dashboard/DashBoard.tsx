import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { API_URL } from "../../config/api";

const DashboardPage: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error("Failed to fetch posts", err));
  }, [navigate]);

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Your Posts</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/create")}
          >
            Create Post
          </Button>
        </Box>

        <Grid container spacing={3} mt={2}>
          {posts.length === 0 ? (
            <Typography variant="body1" mt={3}>
              No posts yet. Click "Create Post" to get started!
            </Typography>
          ) : (
            posts.map((post: any) => (
              <Grid key={post._id}>
                <Card
                  onClick={() => navigate(`/post/${post._id}`)}
                  sx={{ cursor: "pointer", height: "100%" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {post.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

export default DashboardPage;
