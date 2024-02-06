import React, { useState, useEffect, useRef } from 'react';
import Playlist from './Playlist';
import NowPlayingView from './NowPlayingView';
import './AudioUploader.css';

function AudioUploader() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(null);
  const audioElementRef = useRef(null);

  useEffect(() => {
    // Retrieve last playing index and playback position from localStorage
    const lastPlayingIndex = localStorage.getItem('lastPlayingIndex');
    const lastPlaybackPosition = localStorage.getItem('lastPlaybackPosition');

    if (lastPlayingIndex !== null && lastPlaybackPosition !== null) {
      const index = parseInt(lastPlayingIndex, 10);
      const position = parseFloat(lastPlaybackPosition);

      setNowPlayingIndex(index);
      audioElementRef.current.currentTime = position;
    }
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    // Load and play the audio file when nowPlayingIndex changes
    if (nowPlayingIndex !== null && audioFiles[nowPlayingIndex]) {
      const audio = audioElementRef.current;
      audio.src = URL.createObjectURL(audioFiles[nowPlayingIndex]);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }, [nowPlayingIndex, audioFiles]);

  useEffect(() => {
    // Save the current playing index and playback position to localStorage
    const audio = audioElementRef.current;
    if (audio) {
      audio.onended = () => {
        if (nowPlayingIndex !== null && nowPlayingIndex + 1 < audioFiles.length) {
          setNowPlayingIndex(nowPlayingIndex + 1);
        } else {
          setNowPlayingIndex(null);
        }
      };

      // Only save playback position if audio is currently playing
      if (audio.paused === false) {
        localStorage.setItem('lastPlaybackPosition', audio.currentTime);
      }
    }
  }, [nowPlayingIndex, audioFiles]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files);
    setAudioFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handlePlay = (index) => {
    setNowPlayingIndex(index);
  };

  const handleStop = () => {
    const audio = audioElementRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setNowPlayingIndex(null);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} multiple />
      <Playlist audioFiles={audioFiles} onPlay={handlePlay} />
      <NowPlayingView audioFiles={audioFiles} nowPlayingIndex={nowPlayingIndex} />
      {nowPlayingIndex !== null && (
        <button onClick={handleStop}>Stop</button>
      )}
      <audio ref={audioElementRef} />
    </div>
  );
}

export default AudioUploader;
