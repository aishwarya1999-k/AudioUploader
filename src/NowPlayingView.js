import React from 'react';

function NowPlayingView({ audioFiles, nowPlayingIndex }) {
  if (!audioFiles || audioFiles.length === 0 || nowPlayingIndex === null || nowPlayingIndex >= audioFiles.length) {
    return <div>No audio file selected or playing</div>;
  }

  const currentAudioFile = audioFiles[nowPlayingIndex];
  const audioFileName = currentAudioFile ? currentAudioFile.name : 'Unknown';

  return (
    <div>
      Now Playing: {audioFileName}
    </div>
  );
}

export default NowPlayingView;
