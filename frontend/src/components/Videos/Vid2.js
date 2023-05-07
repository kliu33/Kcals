import vid2 from '../../imgs/vid2.mp4'
import React, { useRef, useEffect } from "react";

function Vid2() {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.autoplay = true;
    videoRef.current.loop = true;
    videoRef.current.muted = true;
  }, []);

  return (
    <div id="video-container">
      <video
        ref={videoRef}
        className="video-left"
        src={vid2}
      ></video>
    </div>
  );
}

export default Vid2;
