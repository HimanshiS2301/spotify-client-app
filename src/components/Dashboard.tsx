import React, { useEffect, useState } from "react";
import { getUserProfile, getUserPlaylists } from "../api/spotify";
import playButtonImage from "../images/playButton.png";
import PlayButton from "./PlayButton";
import "../css/dashboard.css";

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedPlaylistUri, setSelectedPlaylistUri] = useState<string | null>(
    null
  );

  useEffect(() => {
    getUserProfile().then((response) => setProfile(response.data));
    getUserPlaylists().then((response) => setPlaylists(response.data.items));
  }, []);

  const handleSelectPlaylist = (uri: string) => {
    setSelectedPlaylistUri(uri);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row content">
          <div className="col-sm-2 sidenav hidden-xs p-0 m-0">
            <ul className="nav nav-pills nav-stacked">
              <li className="active">
                <a href="#section1">Home</a>
              </li>
              <li>
                <a href="#section2">Search</a>
              </li>
            </ul>
            <br />

            <h5 className="playlist-label">Playlists</h5>
            <ul className="nav nav-pills nav-stacked playlists-display">
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  <img
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                    width={50}
                  />
                  &nbsp;&nbsp;<span>{playlist.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div className="col-sm-10 dashboard-page">
            <div className="well profile-section">
              <h5>Profile</h5>
              <p>{profile?.display_name}</p>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h3>&nbsp;&nbsp;&nbsp;Public Playlists</h3>
                <br />
                <div className="playlists-cards">
                  {playlists.map((playlist) => (
                    <div className="col-md-2">
                      <div className="card" style={{ width: "18rem" }}>
                        <img
                          className="card-img-top"
                          src={playlist.images[0]?.url}
                          alt="Card image cap"
                          width="100%"
                        />
                        <div className="card-body">
                          <p className="card-text">{playlist.name}</p>
                          <img
                            src={playButtonImage}
                            className="play-btn"
                            onClick={() => handleSelectPlaylist(playlist.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedPlaylistUri && (
              <div className="row">
                <div className="col-md-12">
                  <h3>&nbsp;&nbsp;&nbsp;Now Playing</h3>
                  <PlayButton uri={selectedPlaylistUri} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
