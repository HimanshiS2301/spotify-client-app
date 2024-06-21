import axios from "axios";

const SPOTIFY_CLIENT_ID = "9c50e68cba364879bb25bc2e22d0d42a";
const SPOTIFY_CLIENT_SECRET = "fd092930c54441908f3ba24071c1969e";

const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

api.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem("spotify_access_token");
  const tokenExpiry = localStorage.getItem("spotify_token_expiry");

  // Check if token is expired
  if (tokenExpiry && Date.now() > parseInt(tokenExpiry)) {
    accessToken = await refreshAccessToken();
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("spotify_refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const clientId = SPOTIFY_CLIENT_ID;
  const clientSecret = SPOTIFY_CLIENT_SECRET;

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    null,
    {
      params: {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
    }
  );

  const newAccessToken = response.data.access_token;
  const expiresIn = response.data.expires_in;

  localStorage.setItem("spotify_access_token", newAccessToken);
  localStorage.setItem(
    "spotify_token_expiry",
    (Date.now() + expiresIn * 1000).toString()
  );

  return newAccessToken;
};

export const getUserProfile = () => api.get("/me");
export const getUserPlaylists = () => api.get("/me/playlists");

const token = localStorage.getItem("spotify_access_token");

const headers = {
  Authorization: `Bearer ${token}`,
};

export const playTrack = async (uris: string[]) => {
  const url = "https://api.spotify.com/v1/me/player/play";
  try {
    await axios.put(url, { uris }, { headers });
  } catch (error) {
    console.error("Error playing track:", error);
  }
};

export const pauseTrack = async () => {
  const url = "https://api.spotify.com/v1/me/player/pause";
  try {
    await axios.put(url, {}, { headers });
  } catch (error) {
    console.error("Error pausing track:", error);
  }
};
