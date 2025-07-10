// components/VideoPlayer.js
'use client';

import { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiPlay, FiPause, FiVolume2, FiMaximize } from 'react-icons/fi';

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  background: #000;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  cursor: pointer;
`;

const Progress = styled.div`
  height: 100%;
  background: var(--primary);
  border-radius: 2px;
  width: ${props => props.progress}%;
`;

export default function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  return (
    <VideoContainer
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Video
        ref={videoRef}
        src={src}
        poster={poster}
        onTimeUpdate={handleProgress}
        onClick={togglePlay}
      />
      <Controls visible={showControls}>
        <button onClick={togglePlay}>
          {playing ? <FiPause /> : <FiPlay />}
        </button>
        <ProgressBar onClick={handleSeek}>
          <Progress progress={progress} />
        </ProgressBar>
        <FiVolume2 />
        <FiMaximize />
      </Controls>
    </VideoContainer>
  );
}
