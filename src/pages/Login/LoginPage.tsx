import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { API_URL } from "../../config/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("API_URL", API_URL);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const storedToken = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/");
      navigate("/dashboard");
    } else if (storedToken) {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>
          JKTech
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Blog App
        </Typography>
        {isLoggedIn ? (
          <Button variant="outlined" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoogleLogin}
              sx={{ mt: 3, mb: 2, padding: "10px 20px", fontSize: "1rem" }}
            >
              Login with Google
            </Button>

            <FacebookLogin
              appId="1366778557685162"
              autoLoad={false}
              fields="name,email,picture"
              callback={(response: any) => {
                if (response.accessToken) {
                  axios
                    .post(`${API_URL}/auth/facebook/callback`, {
                      token: response.accessToken,
                    })
                    .then((res) => {
                      localStorage.setItem("token", res.data.access_token);
                      navigate("/dashboard");
                    })
                    .catch((err) =>
                      console.error("Facebook login failed", err)
                    );
                }
              }}
              render={(renderProps: any) => (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={renderProps.onClick}
                  sx={{ padding: "10px 20px", fontSize: "1rem" }}
                >
                  Login with Facebook
                </Button>
              )}
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
