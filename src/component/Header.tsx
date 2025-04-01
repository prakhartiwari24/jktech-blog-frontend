import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";
import { API_URL } from "../config/api";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", fontWeight: "bold" }}
        >
          JKTech Blog
        </Typography>

        <Box>
          {isLoggedIn ? (
            <Button color="secondary" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                color="primary"
                variant="contained"
                onClick={handleLogin}
                sx={{ mr: 2 }}
              >
                Login with Google
              </Button>

              <FacebookLogin
                appId="1366778557685162"
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
                    color="secondary"
                    variant="contained"
                    onClick={renderProps.onClick}
                  >
                    Login with Facebook
                  </Button>
                )}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
