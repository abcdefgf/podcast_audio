import React, { useState, useRef } from "react";
import "./Audio.css";

export function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

export default function Audio({ source }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [progBarWidth, setProgBarWidth] = useState(0);
  const [volume, setVolume] = useState(10);

  const audio = useRef(null);

  const onPlay = e => {
    e.preventDefault();
    const { current: aud } = audio;

    if (isPlaying) {
      aud.pause();
    } else {
      aud.play();
    }

    setIsPlaying(!isPlaying);
  };

  const onMute = e => {
    e.preventDefault();

    setIsMuted(!isMuted);
  };

  const onLoadMetaData = () => {
    const { current: aud } = audio;
    setDuration(aud.duration);
  };

  const onTimeUpdate = () => {
    const { current: aud } = audio;

    setCurTime(aud.currentTime);
    setProgBarWidth(Math.floor((aud.currentTime / duration) * 100));
  };

  const onVolumeChange = e => {
    const { current: aud } = audio;
    const val = e.target.value;
    aud.volume = val / 10;

    setVolume(val);
  };

  const onSkipAhead = e => {
    const { current: aud } = audio;
    const progress = e.target;

    const pos = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
    aud.currentTime = pos * aud.duration;
  };

  const onEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="audio-container">
      <audio
        onLoadedMetadata={onLoadMetaData}
        onTimeUpdate={onTimeUpdate}
        ref={audio}
        controls={false}
        preload="metadata"
        muted={isMuted}
        onEnded={onEnded}
      >
        <source src={source} type="audio/mp3" />
      </audio>
      <div className="audio">
        <div className="player">
          <button onClick={onPlay} className="audio-btn" type="button">
            {!isPlaying ? "▶" : "⏹"}
          </button>
          <span className="time">
            {formatTime(curTime)} / {formatTime(duration)}
          </span>
        </div>

        <progress
          className="progress"
          value={curTime}
          max={duration}
          onClick={onSkipAhead}
        >
          <span
            style={{ width: progBarWidth + "%" }}
            className="progress-bar"
          />
        </progress>
        <div className="volume">
          <button onClick={onMute} className="audio-btn" type="button">
            {!isMuted ? (
              <span aria-label="volume" role="img">
                &#128266;
              </span>
            ) : (
              <span aria-label="volume" role="img">
                🔇
              </span>
            )}
          </button>
          <input
            onChange={onVolumeChange}
            className="slider"
            type="range"
            min={1}
            max={10}
            value={isMuted ? 0 : volume}
          />
        </div>
      </div>
    </div>
  );
}
