import "./SplashVideo.css";
import splashvideo from "../../imgs/splashvideo.mp4";
import React, { useRef, useEffect } from "react";

function SplashVideo() {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.autoplay = true;
    videoRef.current.loop = true;
    videoRef.current.muted = true;
  }, []);

  return (
    <div id="video-container">
      <video ref={videoRef} className="video" src={splashvideo}></video>
    </div>
  );
}

export default SplashVideo;
