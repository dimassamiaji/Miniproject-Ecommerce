import React from "react";

function VideoSliderComponent() {
  const videoSrc = "/video1.mp4";

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-2xl">
        <video className="w-full" src={videoSrc} alt="" controls loop />
      </div>
    </div>
  );
}

export default VideoSliderComponent;
