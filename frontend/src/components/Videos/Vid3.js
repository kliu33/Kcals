import vid3 from "../../imgs/vid3.mp4";
import React, { useRef, useEffect } from "react";

function Vid3() {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.autoplay = true;
    videoRef.current.loop = true;
    videoRef.current.muted = true;
  }, []);

  return (
    <div id="video-container">
      <video ref={videoRef} className="video-right" src={vid3}></video>
    </div>
  );
}

export default Vid3;
