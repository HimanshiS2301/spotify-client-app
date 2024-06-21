import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../css/login.css";
import spotifyLogo from "../images/spotifyImage.png";

const SPOTIFY_CLIENT_ID = "9c50e68cba364879bb25bc2e22d0d42a";
const SPOTIFY_CLIENT_SECRET = "fd092930c54441908f3ba24071c1969e";
const SPOTIFY_REDIRECT_URI = "http://localhost:3000/callback";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (code) {
      fetchTokens(code);
    }
  }, [location, navigate]);

  const fetchTokens = async (code: string) => {
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", SPOTIFY_REDIRECT_URI);
      params.append("client_id", SPOTIFY_CLIENT_ID);
      params.append("client_secret", SPOTIFY_CLIENT_SECRET);

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token, expires_in } = response.data;
      console.log("res", response);

      localStorage.setItem("spotify_access_token", access_token);
      localStorage.setItem("spotify_refresh_token", refresh_token);
      localStorage.setItem(
        "spotify_token_expiry",
        (Date.now() + expires_in * 1000).toString()
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  const redirectToSpotify = () => {
    const clientId = SPOTIFY_CLIENT_ID;
    const redirectUri = SPOTIFY_REDIRECT_URI;
    const scope =
      "user-read-private user-read-email user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private";
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${encodeURIComponent(
      clientId!
    )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
      redirectUri!
    )}`;

    window.location.href = authUrl;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="login-page d-flex justify-content-center">
            <div className="row ">
              <div className="col-md-12">
                <img src={spotifyLogo} className="spotify-logo" />
                <h1 className="login-text">Login To Start Listening</h1>
                <button className="btn-btn-block" onClick={redirectToSpotify}>
                  Login in here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
