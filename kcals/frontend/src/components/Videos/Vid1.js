import vid1 from '../../imgs/vid1.mp4'
import React, { useRef, useEffect } from "react";

function Vid1() {
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
        src={vid1}
      ></video>
    </div>
  );
}

export default Vid1;
