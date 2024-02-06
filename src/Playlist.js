import React from 'react';

function Playlist({ audioFiles, onPlay }) {
  return (
    <ul>
      {audioFiles && audioFiles.length > 0 && audioFiles.map((file, index) => (
        <li key={index}>
          <button onClick={() => onPlay(index)}>Play</button>
          {file.name}
        </li>
      ))}
    </ul>
  );
}

export default Playlist;
