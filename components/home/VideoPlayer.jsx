'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================
   VIDEO PLAYER
   ============================================================ */
function VideoPlayer() {
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const video = videoRef.current;
    if (!overlay || !video) return;

    const play = () => {
      overlay.classList.add('is-hidden');
      video.play?.().catch(() => {});
    };

    overlay.addEventListener('click', play);
    video.addEventListener('play', () => overlay.classList.add('is-hidden'));
    video.addEventListener('pause', () => {
      if (video.currentTime === 0 || video.ended) overlay.classList.remove('is-hidden');
    });

    return () => { overlay.removeEventListener('click', play); };
  }, []);

  return (
    <div className="pg card reveal in" id="videoCard">
      <div className="video-container">
        <video
          id="muxVideo"
          ref={videoRef}
          className="mux-player"
          src="https://stream.mux.com/2sPGgzMKybrDMiRRCQVYUDyUbuFNNx4DTOgUAR4b001Q.m3u8"
          poster="/posters/demo-poster.webp"
          playsInline
          controls
        />
        <div className="video-overlay" id="videoOverlay" ref={overlayRef}>
          <button className="play-btn" id="playBtn" aria-label="Play video demo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
