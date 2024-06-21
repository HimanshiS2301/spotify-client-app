import React from "react";
import { playTrack, pauseTrack } from "../api/spotify";

const Player: React.FC = () => {
  const handlePlay = () => {
    const uris = ["spotify:track:4uLU6hMCjMI75M1A2tKUQC"]; // example track URI
    playTrack(uris);
  };

  const handlePause = () => {
    pauseTrack();
  };

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
};

export default Player;
