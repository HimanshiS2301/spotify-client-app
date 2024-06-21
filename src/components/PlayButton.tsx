import React from "react";

interface PlayButtonProps {
  uri: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ uri }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/playlist/${uri}`}
      width="300"
      height="380"
      frameBorder="0"
      allowTransparency={true}
      allow="encrypted-media"
    ></iframe>
  );
};

export default PlayButton;
